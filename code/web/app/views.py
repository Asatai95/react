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
from rest_framework import routers, viewsets, generics, serializers, filters, authentication, permissions
from .config.auth import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import (
    TodoSerializer, UserSerializer, CreateUserSerializer, UserFilter, AccountSerializer, UserAuthentication
)
from django.views.decorators.csrf import csrf_exempt
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.exceptions import AuthenticationFailed

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

# class UserInfo(APIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

#     def get(self, request):
#         user = self.request.user
#         print(user.id)
#         return Response(data={
#             "status": True,
#             'username': user.username,
#             "item": "logout"
#         },
#         status=201)

class UserInfo(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JSONWebTokenAuthentication,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, format=None):
        print("self.request")
        print(self.request.user.id)
        return Response(data={
            "status": True,
            'username': request.user.username,
            "item": "logout"
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
            checker = passwordChecker(data)
            if not checker :
                return JsonResponse(serializer.errors, status=400)
            data.pop("password")
            data["password"] = data.pop("password_check")
            serializer = CreateUserSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=201)
            return JsonResponse(data = {"status": False, "message": serializer.errors}, status=500)
        else:
            user = User.objects.filter(is_active = True)
            for key, value in data.items():
                if key == "name":
                    if user.filter(username = data["name"]).first():
                        return JsonResponse(data = {"status": False, "label": "username_error", "message": "このユーザー名はすでに使用されています"}, status=500)
                elif key == "email":
                    if user.filter(email = data["email"]).first():
                        return JsonResponse(data = {"status": False, "label" : "email_error", "message": "このメールアドレスはすでに使用されています"}, status=500)

            return JsonResponse(data = {"status": True}, status=201)

@csrf_exempt
def UserCreatAuth(request):
    print(request.method)
    tmp_list = []
    if request.method == "POST":
        data = JSONParser().parse(request)
        if ErrorFlag(data) is True:
            print(data)
            tmp_list = []
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
                "password": password,
                "email": email
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
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]

    def get_queryset(self):
        label = self.request.query_params.get("label")
        value = self.request.query_params.get("search")
        other_value = self.request.query_params.get("search_other")
        other_value_1 = self.request.query_params.get("search_other_value")

        table = User.objects.all()
        if label == "username":
            table = table.filter(username__contains=value, username__icontains=value, date_joined__gte=other_value, date_joined__lte=other_value_1)
        elif label == "start":
            datetimeitem = datetime.strptime(value, '%Y-%m-%d')
            datetimeitem_other = datetime.strptime(other_value, '%Y-%m-%d')
            if other_value_1 :
                table = table.filter(date_joined__gte=datetimeitem, date_joined__lte=datetimeitem_other, username__icontains=other_value_1)
            else:
                table = table.filter(date_joined__gte=datetimeitem, date_joined__lte=datetimeitem_other)
        elif label == "end":
            datetimeitem = datetime.strptime(value, '%Y-%m-%d')
            datetimeitem_other = datetime.strptime(other_value, '%Y-%m-%d')
            if other_value_1 != "":
                table = table.filter(date_joined__gte=datetimeitem_other, date_joined__lte=datetimeitem, username__icontains=other_value_1)
            else:
                table = table.filter(date_joined__gte=datetimeitem_other, date_joined__lte=datetimeitem)

        return table

class Test(generic.ListView):
    template_name = "apps/test.html"

    def get(self, request, *args, **kwargs):
        return render(self.request, self.template_name)

class TestAPI(generics.ListAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class TestGETAPI(generics.ListAPIView):
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

class Login(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        print(serializer.is_valid())
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            # login(self.request, user)

            return Response({
                "status": True,
                'token': token.key,
                'user_id': user.pk,
                'email': user.email,
                "password": request.data["password"]
            }, status=201)

        return Response(data = {"status": False, "message": serializer.errors}, status=500 )

class Logout(APIView):
    def get(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

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
            user = Get_user.objects.get(pk=user_pk)
        except Get_user.DoesNotExist:
            return HttpResponseBadRequest()

        if not user.is_active:
            user.is_active = True
            user.save()
            messages.success(self.request, user.username + " さん本登録が完了いたしました")
            return redirect("apps:login")
        else:
            return HttpResponseBadRequest()