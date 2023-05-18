from allauth.account.views import SignupView, LogoutView
from allauth.socialaccount.models import SocialAccount, SocialToken
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.kakao.views import KakaoOAuth2Adapter
from django.contrib.auth import get_user_model, authenticate
from django.http import JsonResponse
from django.shortcuts import render, redirect
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from .serializers import UserSerializer, SignupSerializer, CustomTokenObtainPairSerializer, KakaoSignupSerializer
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


class UserEditView(RetrieveUpdateAPIView):
    '''
    회원 수정
    '''
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        # 비밀번호 필드가 전달되었는지 확인
        password = self.request.data.get('password')

        if password:
            # 비밀번호 변경이 요청된 경우
            # 원하는 비밀번호 처리 로직을 수행하고 저장
            user = serializer.save()
            user.set_password(password)
            user.save()
        else:
            # 비밀번호 변경이 요청되지 않은 경우
            serializer.save()

        return Response(serializer.data)


BASE_URL = "http://127.0.0.1:8000/"
KAKAO_CALLBACK_URI = BASE_URL + "accounts/kakao/callback/"


class KakaoView(APIView):
    '''
    카카오 소셜 로그인화면. (BE에서 TEST용도로만 쓰이는듯? FE는 OAuth파일에서 따로 인가코드를 받아온다.)
    '''
    # 카카오 인가코드 요청
    def get(self, request):
        kakao_api = "https://kauth.kakao.com/oauth/authorize?"
        redirect_uri = BASE_URL + "accounts/kakao/callback/"
        client_id = env('KAKAO_CLIENT_ID_KEY')
        return redirect(f"{kakao_api}&client_id={client_id}&redirect_uri={redirect_uri}&response_type=code")


class KakaoCallBackView(APIView):
    def get(self, request):
        # 카카오 액세스 토큰 받기.
        data = {
            "grant_type": "authorization_code",
            "client_id": env('KAKAO_CLIENT_ID_KEY'),
            "redirection_uri": "http://localhost:8000/" + "accounts/kakao/callback",
            "code": request.GET["code"]
        }
        # print(data)
        kakao_token_api = "https://kauth.kakao.com/oauth/token"
        access_token = requests.post(kakao_token_api, data=data).json()['access_token']
        
        # 사용자정보 요청.
        kakao_user_api = "https://kapi.kakao.com/v2/user/me"
        header = {"Authorization":f"Bearer ${access_token}"}
        user_information = requests.get(kakao_user_api, headers=header).json()
        kakao_user_email = user_information['kakao_account'].get('email', None)
        # print(user_information['kakao_account'].get('email'))

        if kakao_user_email is None:
            return JsonResponse({'message': '이메일이 존재하지않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        # 회원가입 및 로그인 처리.
        try:
            print("try 실행.")
            # 가입된 회원 있는지 확인.
            user = User.objects.get(email=kakao_user_email)
            user_info = {
                "id": user.id,
                "nickname": user.nickname
            }
            print("user : ", user)
            
            # FK로 연결되어 있는 socialaccount 테이블에서 해당 이메일의 유저가 있는지 확인.
            social_user = SocialAccount.objects.get(user=user)

            # 존재하는 이메일이지만 kakao가 아닐시 에러.
            if social_user.provider != 'kakao':
                return JsonResponse({"message": "다른 소셜(으)로 가입된 회원입니다."}, status=status.HTTP_400_BAD_REQUEST)
            
            # Kakao 회원 => 로그인 & jwt 발급
            data = {
                "client_id": env('KAKAO_CLIENT_ID_KEY'),
                "access_token": access_token, 
                "code": request.GET["code"]
            }
            accept = requests.post(f"{BASE_URL}accounts/kakao/login/finish/", data=data)
            print('accept : ', accept)

            # 에러
            if accept.status_code != 200:
                return JsonResponse({"message": "로그인에 실패했습니다."}, status=accept.status_code)
            

            accept_json = accept.json()
            print('accept_json : ', accept_json)
            accept_json.pop('user', None)

            # kakao 회원용 simple_jwt 토큰
            refresh = RefreshToken.for_user(user)
            simplejwt_access_token = str(refresh.access_token)
            simplejwt_refresh_token = str(refresh)

            # 추가 정보를 입력하지 않았을 경우.
            if user.nickname == "":
                result = {
                    "accept_json": accept_json,
                    "access_token": simplejwt_access_token,
                    "simplejwt_refresh_token": simplejwt_refresh_token,
                    "user_info": user_info,
                    "status": 204
                }
                return Response(result)
            
            result = {
                "accept_json": accept_json,
                "access_token": simplejwt_access_token,
                "refresh_token": simplejwt_refresh_token, 
                "user_info": user_info,
                "status": 200
            }

            return Response(result)

        except User.DoesNotExist:
            # 기존에 가입된 유저가 아니면 새로 가입.
            print("User.DoesNotExist 실행, code : ", request.GET['code'])
            data = {
                "client_id": env('KAKAO_CLIENT_ID_KEY'),
                "access_token": access_token, 
                "code": request.GET["code"]
            }
            accept = requests.post(f"{BASE_URL}accounts/kakao/login/finish/", data=data)

            if accept.status_code != 200:
                return JsonResponse({"message : ", "회원가입을 할 수 없습니다."}, status=accept.status_code)
            
            accept_json = accept.json()
            accept_json.pop('user', None)

            user = User.objects.get(email=kakao_user_email)
            user_info = {
                "id": user.id,
                "nickname": user.nickname
            }
            
            # kakao 회원용 simple_jwt 토큰
            refresh = RefreshToken.for_user(user)
            simplejwt_access_token = str(refresh.access_token)
            simplejwt_refresh_token = str(refresh)

            result = {
                "accept_json": accept_json,
                "access_token": simplejwt_access_token,
                "refresh_token": simplejwt_refresh_token, 
                "user_info": user_info,
                "status": 204
            }

            return Response(result)
        

class KakaoLogin(SocialLoginView):
    adapter_class = KakaoOAuth2Adapter
    callback_url = KAKAO_CALLBACK_URI
    client_class = OAuth2Client


class LogoutAPIView(LogoutView):
    def dispatch(self, request, *args, **kwargs):
        user = request.user
        try:
            social_token = SocialToken.objects.get(account__user=user, account__provider='kakao')
            social_token.delete()
        except SocialToken.DoesNotExist:
            print("social_token이 존재하지 않습니다.")
            pass
        return super().dispatch(request, *args, **kwargs)
    

class KakaoSignup(RetrieveUpdateDestroyAPIView):
    '''
    카카오 로그인 후 추가 정보 입력
    '''
    queryset = User.objects.all()
    serializer_class = KakaoSignupSerializer
