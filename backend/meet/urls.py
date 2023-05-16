from django.urls import path
from .views import MeetingPostAPIView, MeetingPostDetailView, MeetingAttendanceAPIView, UserMeetArticleAPIView

urlpatterns = [
    path('', MeetingPostAPIView.as_view(), name='meeting_list'),
    path('<int:pk>/', MeetingPostDetailView.as_view(), name='meeting_detail'),
    path('<int:pk>/attendance/', MeetingAttendanceAPIView.as_view(), name='meeting_attendance'),
    path('article/', UserMeetArticleAPIView.as_view(), name='post_article'),
]
