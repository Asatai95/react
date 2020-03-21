
import os
import sys

from django.urls import path, include, re_path, register_converter
from django.conf.urls import url
from . import views

from django.conf import settings
from django.conf.urls.static import static
from .url_config.url_config import *

from rest_framework import routers
from django.views.decorators.cache import cache_page

app_name = 'web.app'
register_converter(FourDigitYearConverter, "pk")

urlpatterns = [
    # path("", views.renderTOP, name="top"),
    path('test/', views.Test.as_view(), name='test'),
    path("test_api/", cache_page(60*60*24)(views.TestAPI.as_view()), name="test_api"),
    path("test_api/profile/", views.testAPI, name="post_api"),
    path("test_api/profile/list/", views.TestGETAPI.as_view(), name="get_api"),
    path("error/", views.error_404, name="error404")
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# router = routers.DefaultRouter()
# router.register(r"testapi", views.TestAPI)
# urlpatterns = router.urls