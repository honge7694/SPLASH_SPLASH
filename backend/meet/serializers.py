from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import MeetingPost

User = get_user_model()


class AuthorSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'nickname', 'avatar_url']


class MeetingPostSerializer(serializers.Serializer):
    author = AuthorSerializer(read_only=True)
    class Meta:
        model = MeetingPost
        fields = "__all__"