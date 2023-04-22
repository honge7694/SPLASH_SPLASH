from django.urls import path
from .views import ChatMessageAPIView


urlpatterns = [
    path('chat/', ChatMessageAPIView.as_view(), name="chat_list"),
]
