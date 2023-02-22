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
    like_user_set = models.ManyToManyField(User, blank=True, related_name='like_post_set')

    class Meta:
        ordering = ["-id"]

    # def __str__(self):
    #     return str(self.title)


# 이미지 파일 경로 
def image_upload_path(instance, filename):
    today = datetime.now()
    return f"post/{today.year}/{today.month}/{today.day}/{instance.post.author.nickname}/{filename}"


class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='image_set')
    image = models.ImageField(upload_to=image_upload_path)

    def __str__(self):
        return str(self.image.url)

    @property
    def image_url(self):
        if self.image:
            return self.image.url
        else:
            return 


class Comment(TimeStampedModel):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.TextField()

    class Meta:
        ordering = ["-id"]

