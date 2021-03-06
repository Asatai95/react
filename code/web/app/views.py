import os
from PIL import Image
from django import *
from django.conf import settings
from django.http import HttpResponse, HttpRequest, HttpResponseRedirect, JsonResponse
from rest_framework.parsers import JSONParser
from django.views.generic import CreateView, ListView, TemplateView
from django.contrib.auth import login, authenticate
from django.shortcuts import redirect, render, resolve_url, render_to_response, get_object_or_404
from django.views.generic.edit import UpdateView
from django.views import View, generic
from django.urls import reverse
from django.core.mail import send_mail
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.hashers import make_password
import hashlib
import hmac
import secrets
import random
from django.utils.encoding import force_bytes
from django.contrib.sessions.backends.db import SessionStore

from multiprocessing import Process
import time

from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.auth.views import (
    LoginView, LogoutView, PasswordChangeView, PasswordChangeDoneView,
    PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, PasswordResetCompleteView
)

from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.contrib import messages

from django.db import models, transaction
from django.db.models import Q, Count, Max, Min
from .models import (
    Todo, User,
)

# rest_framework
# from rest_framework.authtoken.views import ObtainAuthToken
from .config.view_auth import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework import routers, viewsets, generics, serializers, authentication, permissions, status
from rest_framework import filters as rest_filters
from .config.auth import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import (
    TodoSerializer, UserSerializer, CreateUserSerializer, UserFilter, AccountSerializer, UserAuthentication, UserUpdateSerializer,
    UserUpdateImage, UserUpdatePassword, PasswordResetSerializer, MyUserSerializer
)
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
import json

from django_rest_passwordreset.serializers import PasswordTokenSerializer, TokenSerializer
from django_rest_passwordreset.models import ResetPasswordToken, clear_expired, get_password_reset_token_expiry_time, \
    get_password_reset_lookup_field
from django.views.decorators.csrf import csrf_exempt
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.exceptions import AuthenticationFailed
from rest_social_auth.views import BaseSocialAuthView
from rest_social_auth.serializers import TokenSerializer as tokenSerializer, UserTokenSerializer
from rest_framework.authentication import TokenAuthentication
from social_django.views import _do_login as social_auth_login
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from rest_framework_social_oauth2.authentication import SocialAuthentication
from rest_framework_social_oauth2.views import TokenView, ConvertTokenView
from rest_framework_social_oauth2.oauth2_backends import KeepRequestCore
from rest_framework_social_oauth2.oauth2_endpoints import SocialTokenServer
from oauth2_provider.settings import oauth2_settings
from oauth2_provider.views.mixins import OAuthLibMixin
from facebook_auth.urls import redirect_uri

from django.contrib.sessions.models import Session
from django.contrib.auth import get_user_model
from django.contrib.sites.shortcuts import get_current_site
from django.core.signing import BadSignature, SignatureExpired, loads, dumps
from django.http import Http404, HttpResponseBadRequest
from django.template.loader import get_template
from django.core.mail import EmailMessage
from django.urls import reverse_lazy
from django.contrib.auth import logout

# from .forms import (

# )

import operator
from functools import reduce

from datetime import datetime, timedelta

import requests
import re
import numpy as np
import regex

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from pure_pagination.mixins import PaginationMixin

# from .views_config.create_user_config import *
# from .views_config.password_reset import *

from django.views.decorators.csrf import csrf_exempt

"""
Settingファイル
"""
from config.settings import *
# from .library import *

# 404エラー
def error_404(request):

    contexts = {
        'request_path': request.path,
    }

    return render(request, '404.html', contexts, status=404)

# usersession
def UserSessionStore():
    s = SessionStore()
    s["username"] = data["username"]
    s.create()
    username = s.session_key
    s["password"] = data["password"]
    s.create()
    password = s.session_key
    s["email"] = data["email"]
    s.create()
    email = s.session_key
    s.save()
    d = {
        "username": username,
        "email": email,
        "password": password
    }
    return d

class UserInfo(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    authtication_classes = (JSONWebTokenAuthentication, )
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer

    def get(self, request, format=None):

        if request.user.first_name == "":
            print("passsss")
            request.user.first_name = "user"
        if request.user.last_name == "":
            request.user.last_name = "name"

        return Response(data={
            'username': request.user.username,
            'email': request.user.email,
            'image': request.user.image,
            'firstname': request.user.first_name,
            'lastname': request.user.last_name,
            'id': request.user.id,
        },
        status=201)

def passwordChecker(data):
    if data["password"] != data["password_check"]:
        return False
    if not len(data["password_check"]) < 8 and len(data["password_check"]) > 16:
        return False
    return True

def ErrorFlag(data):
    try:
        if data["label"] == "check":
            return False
    except:
        return True

@csrf_exempt
def testAPI(request):
    if request.method == "POST":
        data = JSONParser().parse(request)
        if ErrorFlag(data) is True:
            user = request.user
            serializer = TodoSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=201)
            return JsonResponse(data = {"status": False, "message": serializer.errors}, status=500)
        else:
            user = User.objects.filter(is_active = True)
            print(data)
            for key, value in data.items():
                if key == "name":
                    if user.filter(username = data["name"]).first():
                        return JsonResponse(data = {"status": False, "label": "username_error", "message": "このユーザー名はすでに使用されています"}, status=500)
                elif key == "email":
                    if user.filter(email = data["email"]).first():
                        return JsonResponse(data = {"status": False, "label" : "email_error", "message": "このメールアドレスはすでに使用されています"}, status=500)
                    pattern = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
                    if not re.match(pattern, data["email"]):
                        print("error")
                        return JsonResponse(data = {"status": False, "label" : "email_error", "message": "正しいメールアドレスを入力してください"}, status=500)

            return JsonResponse(data = {"status": True}, status=201)

@csrf_exempt
def UserCreatAuth(request):
    tmp_list = []
    if request.method == "POST":
        data = JSONParser().parse(request)
        if ErrorFlag(data) is True:
            pattern = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
            if not re.match(pattern, data["email"]):
                return JsonResponse(data = {"status": False, "label" : "email_error", "message": "正しいメールアドレスを入力してください"}, status=500)
            tmp_list = []
            dic = UserSessionStore()
            d = {
                "username": dic["username"],
                "password": dic["password"],
                "email": dic["email"]
            }
            return JsonResponse(data = d, status=201)
    elif request.method == "GET":
        username = SessionStore(session_key=request.GET.get("username"))["username"]
        password = SessionStore(session_key=request.GET.get("password"))["password"]
        email = SessionStore(session_key=request.GET.get("email"))["email"]
        d = {
            "username": username,
            "password": password,
            "email": email
        }
        return JsonResponse(data = d, status=201)

class SearchGETAPI(generics.ListAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    filter_backends = [rest_filters.SearchFilter, DjangoFilterBackend]

    def get_queryset(self):
        label = self.request.query_params.get("label")
        value = self.request.query_params.get("search")
        other_value = self.request.query_params.get("search_other")
        other_value_1 = self.request.query_params.get("search_other_value")

        table = Todo.objects.all()
        if label == "search":
            if value == "":
                table = table.filter(created_at__gte=other_value, created_at__lte=other_value_1)
            else:
                table = table.filter(title__icontains=value, created_at__gte=other_value, created_at__lte=other_value_1)
        elif label == "start":
            datetimeitem = datetime.datetime.strptime(value, '%Y-%m-%d')
            datetimeitem_other = datetime.datetime.strptime(other_value, '%Y-%m-%d')
            if other_value_1 :
                table = table.filter(created_at__gte=datetimeitem, created_at__lte=datetimeitem_other, title__icontains=other_value_1)
            else:
                table = table.filter(created_at__gte=datetimeitem, created_at__lte=datetimeitem_other)
        elif label == "end":
            datetimeitem = datetime.datetime.strptime(value, '%Y-%m-%d')
            datetimeitem_other = datetime.datetime.strptime(other_value, '%Y-%m-%d')
            if other_value_1 != "":
                table = table.filter(created_at__gte=datetimeitem_other, created_at__lte=datetimeitem, title__icontains=other_value_1)
            else:
                table = table.filter(created_at__gte=datetimeitem_other, created_at__lte=datetimeitem)

        return table

class Test(generic.ListView):
    template_name = "apps/test.html"

    def get(self, request, *args, **kwargs):
        return render(self.request, self.template_name)

class TestAPI(generics.ListAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class TestGETAPI(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    authtication_classes = (JSONWebTokenAuthentication, )
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, format=None):
        user = request.user
        queryset = Todo.objects.filter(user_id = user.id)
        tmp_list = []
        if queryset.first():
            for x in queryset:
                d = {
                    "id": x.id,
                    "title": x.title,
                    "username": user.username,
                    "message": x.message,
                    "date_joined": x.created_at
                }
                tmp_list.append(d)
        return Response({"status": True, "users": tmp_list}, status=201)

class Login(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})

        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            self.request.session["password"] = request.data["password"]
            return Response({
                "status": True,
                'token': token.key,
                'user_id': user.pk,
                'email': user.email,
                "password": request.data["password"]
            }, status=201)
        return Response(data = {"status": False, "message": serializer.errors}, status=500 )

class Logout(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, format=None):
        user_id = request.user.id
        token = Token.objects.filter(user_id = user_id)
        if user_id is None or token.first() is None:
            return Response(data = {"status": False}, status=500)
        token.delete()
        return Response(data = {"status": True}, status=201)

class UserRegister(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer

    @transaction.atomic
    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            table = User.objects.filter(id=int(serializer.data["id"])).first()
            table.password = make_password(table.password)
            table.image = "https://res.cloudinary.com/db5nsevmi/xgw83qinukoywqafefqm"
            table.is_active = False
            table.save()

            user = User.objects.get(id = int(serializer.data["id"]))
            current_site = get_current_site(self.request)
            domain = current_site.domain
            context = {
                'protocol': self.request.scheme,
                'domain': domain,
                'token': dumps(user.id),
                'user': user,
            }

            subject = 'MYAPPアカウントの確認'
            template = get_template('mail/register/message.txt')
            message = template.render(context)

            user.email_user(subject, message)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=500)

class UserUpdatePasswordInfo(generics.RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    authtication_classes = (JSONWebTokenAuthentication, )
    queryset = User.objects.all()
    serializer_class = UserUpdatePassword

    def get_object(self):
        queryset = self.get_queryset()
        pk = queryset.get(pk=self.request.user.pk)
        self.check_object_permissions(self.request, pk)
        return pk

    def put(self, request, *args, **kwargs):
        passowrd = self.request.data["password"]
        passowrd_checker = self.request.data["password_check"]
        count = re.findall("[ぁ-んァ-ン一-龥]", passowrd)
        count_other = re.findall("[ぁ-んァ-ン一-龥]", passowrd_checker)
        if ( len(count) > 0 or len(count_other) > 0) :
            return Response(data = {"status": False, "message": "日本語は使用できません"}, status=500)

        if passowrd != passowrd_checker:
            return Response(data = {"status": False, "message": "パスワード値が異なります"}, status=500)
        user = User.objects.filter(id=self.request.user.id).first()
        dist = self.request.data.pop("password_check")
        serializer = UserUpdatePassword(user, {"password": dist})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.error, status=500)

class UserUpdateInfo(generics.RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    authtication_classes = (JSONWebTokenAuthentication, )
    queryset = User.objects.all()
    # serializer_class = UserUpdateSerializer

    def get_object(self):
        queryset = self.get_queryset()
        pk = queryset.get(pk=self.request.user.pk)
        self.check_object_permissions(self.request, pk)
        return pk

    def put(self, request, *args, **kwargs):
        # user = User.objects.filter(id = self.request.user.id)
        # serializer = UserUpdateSerializer().update(instance=user.first(), validated_data=request.data)
        print(self.request.data)
        user = User.objects.get(email=self.request.user.email)
        try :
            image = self.request.data["image"]
            serializer = UserUpdateImage(user, self.request.data)
        except :
            serializer = UserUpdateSerializer(user, self.request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.error, status=500)

class UserRegisterChecker(generic.ListView):
    timeout_seconds = getattr(settings, 'ACTIVATION_TIMEOUT_SECONDS', 60*60*24)

    def get(self, request, **kwargs):

        token = kwargs.get('token')

        try:
            user_pk = loads(token, max_age=self.timeout_seconds)

        except SignatureExpired:
            return HttpResponseBadRequest()

        except BadSignature:
            return HttpResponseBadRequest()

        try:
            user = User.objects.get(pk=user_pk)
        except User.DoesNotExist:
            return HttpResponseBadRequest()

        if not user.is_active:
            user.is_active = True
            user.save()
            value = hashlib.sha256(str(user.pk).encode('utf-8')).hexdigest()
            return HttpResponseRedirect(redirect_to='http://localhost:3000/login?auth='+value+'')
        else:
            return HttpResponseBadRequest()

class UserResetPasswordInfo(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = PasswordResetSerializer

    def post(self, request):
        data = request.data
        user = User.objects.filter(email = data["email"])
        if user.first():
            serializer = self.get_serializer(data=data)
            if serializer.is_valid():
                print(serializer.data)
                serializer.save()
                return Response(serializer.data, status=200)
        return Response(data={"status": False, "detail": "登録しているメールアドレスを入力してください"}, status=400)

class ResetPasswordValidateToken(generics.GenericAPIView):
    throttle_classes = ()
    permission_classes = ()
    serializer_class = TokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data['token']
        print("token")
        print(token)
        password_reset_token_validation_time = get_password_reset_token_expiry_time()

        reset_password_token = ResetPasswordToken.objects.filter(key=token).first()
        print(reset_password_token)
        if reset_password_token is None:
            return Response({'status': 'notfound'}, status=status.HTTP_404_NOT_FOUND)

        expiry_date = reset_password_token.created_at + timedelta(hours=password_reset_token_validation_time)

        if timezone.now() > expiry_date:
            reset_password_token.delete()
            return Response({'status': 'expired'}, status=status.HTTP_404_NOT_FOUND)

        return Response(data={'status': True}, status=200)

class ResetPasswordConfirm(generics.GenericAPIView):
    throttle_classes = ()
    permission_classes = ()
    serializer_class = PasswordTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        password = serializer.validated_data['password']
        token = serializer.validated_data['token']

        password_reset_token_validation_time = get_password_reset_token_expiry_time()

        reset_password_token = ResetPasswordToken.objects.filter(key=token).first()

        if reset_password_token is None:
            return Response({'status': 'notfound'}, status=status.HTTP_404_NOT_FOUND)

        expiry_date = reset_password_token.created_at + timedelta(hours=password_reset_token_validation_time)

        if timezone.now() > expiry_date:
            reset_password_token.delete()
            return Response({'status': 'expired'}, status=status.HTTP_404_NOT_FOUND)

        if reset_password_token.user.eligible_for_reset():
            pre_password_reset.send(sender=self.__class__, user=reset_password_token.user)
            try:
                validate_password(
                    password,
                    user=reset_password_token.user,
                    password_validators=get_password_validators(settings.AUTH_PASSWORD_VALIDATORS)
                )
            except ValidationError as e:
                raise exceptions.ValidationError({
                    'password': e.messages
                })

            reset_password_token.user.set_password(password)
            reset_password_token.user.save()
            post_password_reset.send(sender=self.__class__, user=reset_password_token.user)

        ResetPasswordToken.objects.filter(user=reset_password_token.user).delete()

        return Response(data = {'status': True})

class CsrfExemptMixin(object):

    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super(CsrfExemptMixin, self).dispatch(*args, **kwargs)

def FacebookAuth(request):
    if request.method == "GET":
        d = {
            'redirect_uri': redirect_uri('/login/success', '/login/fail'),
            'client_id': settings.FACEBOOK_APP_ID,
            'scope': 'email'
        }
        return JsonResponse(data = d, status=201)

class SocialSessionFacebook(CsrfExemptMixin, OAuthLibMixin, APIView):
    server_class = SocialTokenServer
    permission_classes = (permissions.AllowAny,)
    validator_class = oauth2_settings.OAUTH2_VALIDATOR_CLASS
    oauthlib_backend_class = KeepRequestCore
    serializer_class = SocialAuthentication

    @csrf_exempt
    def post(self, request, format=None):
        mutable_data = request.data.copy()
        request._request.POST = request._request.POST.copy()

        print(mutable_data.items())
        for key, value in mutable_data.items():
            request._request.POST[key] = value

        url, headers, body, status = self.create_token_response(request._request)
        print(request._request)
        response = Response(data=json.loads(body), status=status)
        print("response")
        print(response)
        for k, v in headers.items():
            response[k] = v
        print(response)
        return response