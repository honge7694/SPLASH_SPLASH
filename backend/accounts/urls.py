from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from .views import SignupAPIView, UserEditView, CustomTokenObtainPairView, KakaoView, KakaoCallBackView, KakaoLogin, KakaoSignup, LogoutAPIView


urlpatterns = [
    path('signup/', SignupAPIView.as_view(), name='signup'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('edit/<int:pk>/', UserEditView.as_view(), name='edit'),

    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    path("kakao/", KakaoView.as_view()),
    path("kakao/signup/<int:pk>/", KakaoSignup.as_view()),
    path("kakao/callback/", KakaoCallBackView.as_view()),
    path("kakao/login/finish/", KakaoLogin.as_view()),
    path('', include('allauth.urls')),
]
