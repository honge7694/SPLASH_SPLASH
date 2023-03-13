from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from .models import MeetingPost
from .serializers import MeetingPostSerializer, MeetingAttendanceSerializer
from .permissions import IsAuthorOrReadonly


class MeetingPostAPIView(ListCreateAPIView):
    '''
    MeetingPost List
    '''
    queryset = MeetingPost.objects.all()
    serializer_class = MeetingPostSerializer
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        return super().perform_create(serializer)
    

class MeetingPostDetailView(RetrieveUpdateDestroyAPIView):
    '''
    MeetingPost Detail
    '''
    queryset = MeetingPost.objects.all()
    serializer_class = MeetingPostSerializer
    permission_classes = [IsAuthorOrReadonly, ]


class MeetingAttendanceAPIView(ListCreateAPIView):
    serializer_class = MeetingAttendanceSerializer

    def get_queryset(self):
        qs = MeetingPost.objects.filter(pk=self.kwargs['pk'], is_attendance=self.request.user.pk)
        return qs

    def perform_create(self, serializer):
        meet = MeetingPost.objects.filter(pk=self.kwargs['pk']).first()
        if self.get_queryset().exists():
            meet.is_attendance.remove(self.request.user)
            return Response(status=status.HTTP_204_NO_CONTENT)
        meet.is_attendance.add(self.request.user)

