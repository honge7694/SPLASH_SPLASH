from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny
from .serializers import PostSerializer, PostImageSerializer
from .models import Post, PostImage


class PostListAPIView(ListCreateAPIView):
    '''
    Post 생성 및 목록
    '''
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny, ]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        return super().perform_create(serializer)


class PostDetailAPIView(RetrieveUpdateDestroyAPIView):
    '''
    Post 상세 및 수정, 삭제
    '''
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny, ]