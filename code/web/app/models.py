from django.contrib import auth
from django.conf import settings
from django.db import models, transaction
from django.contrib.sessions.models import Session
from django.contrib.sessions.backends.db import SessionStore
from django.contrib.auth.models import PermissionsMixin, Group, User
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.core.exceptions import ValidationError
from django.core.validators import validate_email, EmailValidator, FileExtensionValidator, MaxValueValidator, MinValueValidator, RegexValidator
from django.contrib.auth.validators import ASCIIUsernameValidator
from django.core.mail import send_mail

import os
import re
from datetime import datetime

from django.contrib.auth.signals import user_logged_in, user_logged_out
from django.dispatch import receiver

from django.core.management.base import BaseCommand

SILENCED_SYSTEM_CHECKS = ["auth.W004"]

class UserManager(BaseUserManager):

    use_in_migrations = True

    def _create_user(self, username, email, password, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')

        # username_validator = ASCIIUsernameValidator()
        # username = self.model.normalize_username(username, required=False, validators=[username_validator])
        # email = self.normalize_email(email, required=True)

        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, username=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, email, password, **extra_fields)

    def create_superuser(self, username, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(username, email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):

    id = models.AutoField(primary_key=True)
    username = models.CharField(_('username'), max_length=150, unique=True)
    password = models.CharField(u"パスワード", max_length=150)
    email = models.EmailField(u'メールアドレス', unique=True)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=150, blank=True)

    is_mail = models.BooleanField(
        _('mail status'),
        default=False,
    )

    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )

    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)
    message = models.TextField(u"メッセージ", blank=True)
    image = models.CharField(u'プロフィール画像', max_length=150)
    # image = CloudinaryField('image', blank=True, null=True)

    objects = UserManager()

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
        db_table = 'app_user'

    def get_full_name(self):
        """Return the first_name plus the last_name, with a space in
        between."""
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        """Return the short name for the user."""
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)

class AttendanceRecord(models.Model):

    # user = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='ユーザー', on_delete=models.PROTECT)
    user = models.ForeignKey("User", verbose_name='ユーザー', on_delete=models.PROTECT)
    session_key = models.CharField(_('session key'), max_length=45)
    login_time = models.DateTimeField('ログイン時刻', blank=True, null=True)
    logout_time = models.DateTimeField('ログアウト時刻', blank=True, null=True)
    class Meta:
        db_table = 'attendance'

    def __str__(self):
        login_dt = timezone.localtime(self.login_time)
        return '{0} - {1.year}/{1.month}/{1.day} {1.hour}:{1.minute}:{1.second} - {2}'.format(
            self.user.username, login_dt, self.get_diff_time()
        )

    def get_diff_time(self):
        """ログアウト時間ーログイン時間"""
        if not self.logout_time:
            pass
        else:
            td = self.logout_time - self.login_time
            return '{0}時間{1}分'.format(
                td.seconds // 3600, (td.seconds // 60) % 60)

@receiver(user_logged_in)
def user_logged_in_callback(sender, request, user, **kwargs):
    """ログインした際に呼ばれる"""

    tmp_list = []
    session = Session.objects.filter(expire_date__lt=datetime.now())
    for x in session:
        if AttendanceRecord.objects.filter(session_key = x.session_key).first():
            AttendanceRecord.objects.filter(session_key = x.session_key).update(
                session_key=None,
            )
    session.delete()

    for x in Session.objects.all():
        tmp_list.append(x)

    tmp_list = list(set(tmp_list))

    if os.name == "nt" or os.name == "posix":
        pass
    else:
        if AttendanceRecord.objects.filter(user=user, session_key__in = tmp_list , logout_time=None).first():
            AttendanceRecord.objects.filter(user=user, session_key__in = tmp_list , logout_time=None).delete()

    AttendanceRecord.objects.create(user=user, login_time=timezone.now())

@receiver(user_logged_out)
def user_logged_out_callback(sender, request, user, **kwargs):
    """ログアウトした際に呼ばれる"""
    records = AttendanceRecord.objects.filter(user=user, logout_time__isnull=True)
    if records:
        record = records.latest('pk')
        record.logout_time = timezone.now()
        record.save()

    AttendanceRecord.objects.filter(session_key = request.session.session_key).update(
        session_key=None,
    )
    Session.objects.filter(expire_date__lt=datetime.now()).delete()
    Session.objects.filter(session_key = request.session.session_key).delete()

class Todo(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.IntegerField(_('user id'), blank=True , null=True)
    message = models.TextField()
    created_at = models.DateTimeField(_('created at'), default=timezone.now)

    class Meta:
        verbose_name = _('todo')
        verbose_name_plural = _('todos')
        db_table = 'todo'

    def __str__(self):
        return self.message