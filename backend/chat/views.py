from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Chat
from .serializers import ChatSerializer


class ChatMessageAPIView(ListCreateAPIView):
    queryset = Chat.objects.all()[:50]
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
