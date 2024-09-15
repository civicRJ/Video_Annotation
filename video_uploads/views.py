# video_uploads/views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from .models import Video, Annotation
from .serializers import VideoSerializer, AnnotationSerializer, UserSerializer

class VideoUploadView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        # Add the authenticated user to the video data
        file_size = request.FILES['video_file'].size
        max_size = 100 * 1024 * 1024  # 100 MB
        if file_size > max_size:
            return Response({"error": "File too large. Maximum size allowed is 100MB."},
                            status=status.HTTP_400_BAD_REQUEST)
        serializer = VideoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # Save video with the user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class VideoDetailView(APIView):
    def get(self, request, pk):
        video = Video.objects.get(pk=pk)
        serializer = VideoSerializer(video)
        return Response(serializer.data)

class AnnotationCreateView(APIView):
    def post(self, request, video_id):
        video = Video.objects.get(pk=video_id)
        serializer = AnnotationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(video=video)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AnnotationUpdateDeleteView(APIView):
    def put(self, request, annotation_id):
        annotation = Annotation.objects.get(pk=annotation_id)
        serializer = AnnotationSerializer(annotation, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, annotation_id):
        annotation = Annotation.objects.get(pk=annotation_id)
        annotation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class SearchVideosView(APIView):
    def get(self, request):
        query = request.query_params.get('tag', None)
        if query:
            # Search for videos that have annotations matching the query tag
            videos = Video.objects.filter(annotations__tag__icontains=query).distinct()
            serializer = VideoSerializer(videos, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"error": "Tag parameter is required."}, status=status.HTTP_400_BAD_REQUEST)
    
class AllVideosView(APIView):
    def get(self, request):
        # Fetch all videos from the database
        videos = Video.objects.all()
        serializer = VideoSerializer(videos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        if not username or not password:
            return Response({'error': 'Username and password required.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already taken.'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create(username=username, email=email, password=make_password(password))
        return Response({'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserVideosView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        videos = Video.objects.filter(user=request.user)
        serializer = VideoSerializer(videos, many=True)
        return Response(serializer.data)


