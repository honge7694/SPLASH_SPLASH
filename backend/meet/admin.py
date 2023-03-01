from django.contrib import admin
from .models import MeetingPost

@admin.register(MeetingPost)
class MeetingPostAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'content', 'created_at', 'updated_at', 'date_at', 'status']

