from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .serializers import UserSerializer, SignupSerializer, CustomTokenObtainPairSerializer

User = get_user_model()

class SignupAPIView(CreateAPIView):
    '''
    회원가입
    '''
    queryset = User.objects.all()
    serializer_class = SignupSerializer
    permission_classes = [AllowAny, ]


class CustomTokenObtainPairView(TokenObtainPairView):
    '''
    로그인
    '''
    serializer_class = CustomTokenObtainPairSerializer



