from django.conf.urls import url
from django.contrib.auth import views, urls
from django.urls import  path, include
import sys
import os
sys.path.append(os.getcwd())
import app.views

from django.conf import settings
from django.conf.urls.static import static

from django.views.static import serve

urlpatterns = [
    path('', include('app.urls')),
    path('', include('app.urls', namespace="apps")),
    # url(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    url(r'^static/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT})
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


if settings.DEBUG:
    import debug_toolbar

    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),
    ]
