
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
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

app_name = 'web.app'
register_converter(FourDigitYearConverter, "pk")

urlpatterns = [
    # path("", views.renderTOP, name="top"),
    path('test/', views.Test.as_view(), name='test'),
    path("test_api/", cache_page(60*60*24)(views.TestAPI.as_view()), name="test_api"),
    path("test_api/profile/", views.testAPI, name="post_api"),
    path("test_api/profile/list/", views.TestGETAPI.as_view(), name="get_api"),
    path('test_api/profile/list/search/', views.SearchGETAPI.as_view()),
    path('test_api/profile/list/search/<str:params>', views.SearchGETAPI.as_view()),
    path("error/", views.error_404, name="error404"),
    path("userauth/", obtain_jwt_token),
    path('userauth/refresh/', refresh_jwt_token),
    path('api/token/refresh/', refresh_jwt_token),
    path("user/info/session/", views.UserCreatAuth),
    path("userinfo/", views.UserInfo.as_view()),
    path("todoinfo/", views.TestAPI.as_view()),
    # path("userinfo/<str:pk>/", views.UserInfo.as_view()),
    path("login/", views.Login.as_view(), name='login'),
    path("login/api/", views.Login.as_view()),
    path("logout/", views.Logout.as_view(), name='logout'),
    path("user/create/", views.UserRegister.as_view(), name='create'),
    path("user/create/auth/<token>/", views.UserRegisterChecker.as_view(), name='checker'),
    path("user/update/", views.UserUpdateInfo.as_view(), name="update_user")
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# router = routers.DefaultRouter()
# router.register(r"testapi", views.TestAPI)
# urlpatterns = router.urls