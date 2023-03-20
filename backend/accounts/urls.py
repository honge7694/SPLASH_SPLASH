from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from .views import SignupAPIView, CustomTokenObtainPairView, KakaoView, KakaoCallBackView


urlpatterns = [
    path('signup/', SignupAPIView.as_view(), name='signup'),

    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    path("kakao/callback/", KakaoCallBackView.as_view()),
    path("kakao/", KakaoView.as_view()),
]
