from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()

class TimeStampModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class MeetingPost(TimeStampModel):
    class StatusChoices(models.TextChoices):
        success = 'success', '모집중'
        danger = 'warning', '모집종료'

    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField()
    place = models.CharField(max_length=255)
    place_lat = models.CharField(max_length=100)
    place_lng = models.CharField(max_length=100)
    date_at = models.DateField(null=True)
    time_at = models.TimeField(null=True)
    status = models.CharField(max_length=20, choices=StatusChoices.choices, default='success')
    is_attendance = models.ManyToManyField(User, blank=True, related_name='attendance_meet_set')

    class Meta:
        ordering = ['-id']