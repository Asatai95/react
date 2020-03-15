
import os
import sys

from django.urls import path, include, re_path, register_converter
from django.conf.urls import url
from . import views

from django.conf import settings
from django.conf.urls.static import static
from .url_config.url_config import *

from rest_framework import routers

app_name = 'web.app'
register_converter(FourDigitYearConverter, "pk")

urlpatterns = [
    path('test/', views.Test.as_view(), name='test'),
    path("test_api/", views.TestAPI.as_view(), name="test_api")
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# router = routers.DefaultRouter()
# router.register(r"testapi", views.TestAPI)
# urlpatterns = router.urls