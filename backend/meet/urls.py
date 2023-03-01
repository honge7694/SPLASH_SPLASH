from django.urls import path
from .views import MeetingPostAPIView, MeetingPostDetailView

urlpatterns = [
    path('', MeetingPostAPIView.as_view(), name='meeting_list'),
    path('<int:pk>/', MeetingPostDetailView.as_view(), name='meeting_detail'),
]
