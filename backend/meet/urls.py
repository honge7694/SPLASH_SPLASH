from django.urls import path
from .views import MeetingPostAPIView

urlpatterns = [
    path('', MeetingPostAPIView.as_view(), name='meeting_list'),
]
