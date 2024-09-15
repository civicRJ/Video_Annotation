# video_uploads/urls.py
from django.urls import path
from .views import VideoUploadView, VideoDetailView, AnnotationCreateView, AnnotationUpdateDeleteView, SearchVideosView, RegisterView, LogoutView, UserVideosView, AllVideosView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('upload/', VideoUploadView.as_view(), name='video-upload'),
    path('<int:pk>/', VideoDetailView.as_view(), name='video-detail'),  # New route
    path('<int:video_id>/annotations/', AnnotationCreateView.as_view(), name='add-annotation'),
    path('annotations/<int:annotation_id>/', AnnotationUpdateDeleteView.as_view(), name='update-delete-annotation'),
    path('', AllVideosView.as_view(), name='all-videos'), 
    path('search/', SearchVideosView.as_view(), name='search-videos'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('user/videos/', UserVideosView.as_view(), name='user-videos'),  # View user-specific videos
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
