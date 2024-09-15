# video_uploads/models.py
from django.db import models
from django.contrib.auth.models import User

class Video(models.Model):
    title = models.CharField(max_length=100)
    video_file = models.FileField(upload_to='videos/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Annotation(models.Model):
    video = models.ForeignKey(Video, related_name='annotations', on_delete=models.CASCADE)
    time = models.FloatField()  # Time in seconds
    tag = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.tag} at {self.time}s"
