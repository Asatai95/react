from config import *

import os
import sys

from django import *
from django.contrib.messages import *
from django.contrib import *

from django.db import models

from django.db.backends.mysql.base import DatabaseWrapper
# from datetime import datetime, timedelta
import datetime

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = 'sjob9ux92^0zve)awaz@z3j-^!ijr^11blvvdgsup47ui-(uht'

DEBUG = True

ALLOWED_HOSTS = ["*"]

INSTALLED_APPS = [
    # 'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'app.apps.WebappConfig',
    'app.templatetags',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'django_rest_passwordreset',
    'social_django',
    'rest_social_auth',
    'rest_auth',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'rest_auth.registration',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.facebook',
]

MIDDLEWARE = [
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, "templates")],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.static',
                'app.templatetags.context_processors.common',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'react_sample',
        'USER': 'root',
        'PASSWORD': 'react1156',
        'HOST': 'mysql',
        'PORT': '3306',
        'OPTIONS': {
            'charset': 'utf8mb4',
        },
    }
}

EMAIL_HOST = 'smtp.muumuu-mail.com'
DEFAULT_FROM_EMAIL = 'myapp@awapoke.okinawa'
EMAIL_HOST_USER = 'myapp@awapoke.okinawa'
EMAIL_HOST_PASSWORD = '4WkOD4Vhqnwfdk3Mwz'
EMAIL_PORT = 587
EMAIL_USE_TLS = False
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.db.DatabaseCache',
        'LOCATION': 'my_cache_table',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

TIME_ZONE = 'Asia/Tokyo'
LANGUAGE_CODE = 'ja'
USE_I18N = True
USE_L10N = True
USE_TZ = True

"""
rest_frameworkで/static/rest_frameworkの404エラーが発生した場合は、python3 manage.py collectstaticを実行し、
１つの場所に集める
"""
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

# mediaフォルダを用意した場合に使用
# MEDIA_URL = '/media/'
# MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

AUTH_USER_MODEL = 'app.User'
CSRF_COOKIE_NAME = "myapptodo"
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True

SESSION_SAVE_EVERY_REQUEST = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SESSION_ENGINE = 'django.contrib.sessions.backends.db'
SESSION_COOKIE_AGE = 3600 * 24 * 30 * 365

CORS_ORIGIN_WHITELIST = (
        'http://localhost:3000',
        'http://127.0.0.1:3000',
)

SOCIAL_AUTH_FACEBOOK_KEY = '159779238790256'
SOCIAL_AUTH_FACEBOOK_SECRET = '12bf3a9fb1ac4a08bceaae1156aa3884'
SOCIAL_AUTH_FACEBOOK_PROFILE_EXTRA_PARAMS = {'fields': 'id, name, email' }
SOCIAL_AUTH_FACEBOOK_SCOPE = ['email', ]
FACEBOOK_EXTENDED_PERMISSIONS = ['email']
SOCIAL_AUTH_ADMIN_USER_SEARCH_FIELDS = ['username', 'first_name', 'email']
SOCIAL_AUTH_USERNAME_IS_FULL_EMAIL = True
REST_SOCIAL_OAUTH_REDIRECT_URI = "/"
REST_SOCIAL_DOMAIN_FROM_ORIGIN = True

AUTHENTICATION_BACKENDS = (
    'social_core.backends.facebook.FacebookOAuth2',
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
)

CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
    "http://127.0.0.1:3000"
)

JWT_AUTH = {
    'AUTH_HEADER_TYPES': "JWT",
    'JWT_VERIFY_EXPIRATION': False,
    'JWT_ALLOW_REFRESH': True,
    'ROTATE_REFRESH_TOKENS': True,
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=7),
    'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=28),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
}

REST_AUTH_SERIALIZERS = {
    'PASSWORD_RESET_SERIALIZER': 'app.serializers.PasswordResetSerializer',
}

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
        'rest_framework.permissions.IsAuthenticated',
    ),
    "DEFAULT_AUTHENTICATION_CLASSES": (
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
    ),
    'NON_FIELD_ERRORS_KEY': 'detail',
    'TEST_REQUEST_DEFAULT_FORMAT': 'json'
}