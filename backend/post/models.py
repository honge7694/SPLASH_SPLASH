from datetime import datetime
from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()

class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Post(TimeStampedModel):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='my_post_set')
    title = models.CharField(max_length=200)
    content = models.TextField()

    # def __str__(self):
    #     return str(self.title)


# 이미지 파일 경로 
def image_upload_path(instance, filename):
    today = datetime.now()
    return f"post/{today.year}/{today.month}/{today.day}/{instance.post.author}/{filename}"


class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='image_set')
    image = models.ImageField(upload_to=image_upload_path)

    def __str__(self):
        return str(self.image.url)

