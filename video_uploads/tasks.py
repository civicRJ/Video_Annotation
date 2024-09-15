# video_uploads/tasks.py

from celery import shared_task
from .models import Video
from time import sleep

@shared_task
def process_batch_upload(video_ids):
    # Simulate processing time
    for video_id in video_ids:
        video = Video.objects.get(id=video_id)
        print(f"Processing video: {video.title}")
        # Simulate long-running task (e.g., video transcoding)
        sleep(5)
        print(f"Video {video.title} processed successfully.")
    return f"Processed {len(video_ids)} videos"
