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

from django.db import models
from django.db.models import Q, Count, Max, Min
from .models import (
    Todo, User,
)

# rest_framework
from rest_framework import routers, viewsets, generics
from rest_framework.response import Response
from .serializers import TodoSerializer, UserSerializer, CreateUserSerializer
from django.views.decorators.csrf import csrf_exempt

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

def passwordChecker(self, data):
    if data["password"] != data["password_check"]:
        return False
    if not len(data["password_check"]) < 8 and len(data["password_check"]) > 16:
        return False

    return True

@csrf_exempt
def testAPI(self, request):
    print(request.method)
    if request.method == "POST":
        data = JSONParser().parse(request)
        print("data")
        print(data)
        checker = passwordChecker(self, data)
        if not checker :
            return JsonResponse(serializer.errors, status=400)
        data.pop("password")
        print(data)
        serializer = CreateUserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    # elif request.

class Test(generic.ListView):
    template_name = "apps/test.html"

    def get(self, request, *args, **kwargs):
        return render(self.request, self.template_name)

class TestAPI(generics.ListAPIView):

    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class TestGETAPI(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
