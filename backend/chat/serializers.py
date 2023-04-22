from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Chat


User = get_user_model()

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'nickname', 'avatar_url']


class ChatSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Chat
        fields = ['id', 'author', 'message', 'created_at']