from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import MeetingPost

User = get_user_model()


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'nickname', 'avatar_url']


class MeetingPostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    is_attendance = serializers.SerializerMethodField()
    attendance = serializers.SerializerMethodField()

    class Meta:
        model = MeetingPost
        fields = ['id', 'author', 'title', 'content', 'place', 'place_lat', 'place_lng', 'status', 'date_at', 'time_at', 'created_at', 'updated_at', 'is_attendance', 'attendance']

    def get_is_attendance(self, obj):
        if 'request' in self.context:
            user = self.context['request'].user
            return obj.is_attendance.filter(pk=user.pk).exists()
        return False
    
    def get_attendance(self, obj):
        attendance_list = []
        for attendance in obj.is_attendance.all():
            attendance_list.append(attendance.nickname)
        return attendance_list
    

class MeetingAttendanceSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = MeetingPost
        fields = ['author', 'is_attendance']