# video_annotation/urls.py
from django.urls import path, include

urlpatterns = [
    path('api/videos/', include('video_uploads.urls')),
]

# video_annotation/urls.py
from django.conf import settings
from django.conf.urls.static import static

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
