from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Post, PostImage, Comment


User = get_user_model()

class AuthorSerializer(serializers.ModelSerializer): 
    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'name', 'nickname', 'avatar_url']


class PostImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=False)

    class Meta:
        model = PostImage
        fields = ['image',]


class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    images = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    is_like = serializers.SerializerMethodField('is_like_field')
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'author', 'images', 'created_at', 'updated_at', 'likes', 'is_like', 'comments']

    def get_images(self, obj):
        '''
        다중 이미지 가져오기
        '''
        image = obj.image_set.all()
        return PostImageSerializer(instance=image, many=True, context=self.context).data

    def create(self, validated_data):
        '''
        Post + image 생성
        '''
        instance = Post.objects.create(**validated_data)
        image_set = self.context['request'].FILES
        # print('image_set 길이 : ', len(image_set.getlist('image')))
        if len(image_set.getlist('image')) > 8:
            raise serializers.ValidationError("이미지는 8개까지만 가능합니다.")
        for image_data in image_set.getlist('image'):
            PostImage.objects.create(post=instance, image=image_data)
        
        return instance

    def get_likes(self, obj):
        like = len(obj.like_user_set.all())
        return like

    def is_like_field(self, obj):
        if 'request' in self.context:
            user = self.context['request'].user
            return obj.like_user_set.filter(pk=user.pk).exists()
        return False
    
    def get_comments(self, obj):
        comment = len(obj.comment_set.all())
        return comment


class LikeSerializer(serializers.ModelSerializer):
    '''
    좋아요 기능
    '''
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ['like_user_set', 'author']


class CommentSerializer(serializers.ModelSerializer):
    '''
    댓글 기능
    '''
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'author', 'content', 'created_at']