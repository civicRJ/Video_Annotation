# video_uploads/serializers.py
from rest_framework import serializers
from .models import Video, Annotation
from django.contrib.auth.models import User

class AnnotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Annotation
        fields = ['id', 'time', 'tag']

class VideoSerializer(serializers.ModelSerializer):
    annotations = AnnotationSerializer(many=True, read_only=True)

    class Meta:
        model = Video
        fields = ['id', 'title', 'video_file', 'uploaded_at', 'annotations']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
