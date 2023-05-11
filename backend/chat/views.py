from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Chat
from .serializers import ChatSerializer


class ChatMessageAPIView(ListCreateAPIView):
    qs = Chat.objects.all().order_by('-id')[:50]
    queryset = Chat.objects.filter(pk__in=qs).order_by('id')
    serializer_class = ChatSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
