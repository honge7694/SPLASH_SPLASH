from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .serializers import PostSerializer, PostImageSerializer, LikeSerializer
from .models import Post, PostImage
from .permissions import IsAuthorOrReadonly


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
    permission_classes = [IsAuthorOrReadonly, ]


class LikeAPIView(ListCreateAPIView):
    '''
    Post Like
    '''
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        post = Post.objects.filter(pk=self.kwargs['pk'], like_user_set=self.request.user)
        return post

    def perform_create(self, serializer):
        post = Post.objects.filter(pk=self.kwargs['pk']).first()
        if self.get_queryset().exists():
            post.like_user_set.remove(self.request.user)
            return Response(status=status.HTTP_204_NO_CONTENT)
        post.like_user_set.add(self.request.user)