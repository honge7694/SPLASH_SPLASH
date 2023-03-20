from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.shortcuts import render, redirect
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.views import APIView
from .serializers import UserSerializer, SignupSerializer, CustomTokenObtainPairSerializer
import environ
import requests


User = get_user_model()
env = environ.Env()

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


class KakaoView(APIView):
    '''
    카카오 소셜 로그인
    '''
    # 카카오 인가코드 요청
    def get(self, request):
        kakao_api = "https://kauth.kakao.com/oauth/authorize?"
        redirect_uri = "http://127.0.0.1:8000/accounts/kakao/callback/"
        client_id = env('KAKAO_CLIENT_ID_KEY')
        return redirect(f"{kakao_api}&client_id={client_id}&redirect_uri={redirect_uri}&response_type=code")


class KakaoCallBackView(APIView):
    def get(self, request):
        # 카카오 액세스 토큰 받기.
        data = {
            "grant_type": "authorization_code",
            "client_id": env('KAKAO_CLIENT_ID_KEY'),
            "redirection_uri": "http://127.0.0.1:8000/accounts/kakao/",
            "code": request.GET["code"]
        }

        kakao_token_api = "https://kauth.kakao.com/oauth/token"
        access_token = requests.post(kakao_token_api, data=data).json()['access_token']
        
        # 사용자정보 요청.
        kakao_user_api = "https://kapi.kakao.com/v2/user/me"
        header = {"Authorization":f"Bearer ${access_token}"}
        user_information = requests.get(kakao_user_api, headers=header).json()
        # print(user_information)

        return JsonResponse(user_information)
    
