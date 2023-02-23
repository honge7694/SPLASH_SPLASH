from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .serializers import PostSerializer, PostImageSerializer, LikeSerializer, CommentSerializer
from .models import Post, PostImage, Comment
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


class CommentAPIView(ListCreateAPIView):
    '''
    Post 댓글 
    '''
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(post__pk=self.kwargs['post_pk'])
        return qs

    def perform_create(self, serializer):
        post = get_object_or_404(Post, pk=self.kwargs['post_pk'])
        serializer.save(author=self.request.user, post=post)
        return super().perform_create(serializer)


class CommentDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(pk=self.kwargs['pk'])
        return qs