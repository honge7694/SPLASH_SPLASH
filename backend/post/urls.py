from django.urls import path
from .views import PostListAPIView, PostDetailAPIView, LikeAPIView, CommentAPIView


urlpatterns = [
    path('', PostListAPIView.as_view(), name='post_list'),
    path('<int:pk>/', PostDetailAPIView.as_view(), name='post_detail'),
    path('<int:pk>/like/', LikeAPIView.as_view(), name='post_like'),
    path('<int:post_pk>/comment/', CommentAPIView.as_view(), name='post_comment')
]