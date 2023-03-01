from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import MeetingPost

User = get_user_model()


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'nickname', 'avatar_url']


class MeetingPostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    class Meta:
        model = MeetingPost
        fields = ['id', 'author', 'title', 'content', 'status', 'date_at', 'created_at', 'updated_at']