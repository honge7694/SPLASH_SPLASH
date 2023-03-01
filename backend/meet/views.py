from .models import MeetingPost
from .serializers import MeetingPostSerializer
from rest_framework.generics import ListCreateAPIView

class MeetingPostAPIView(ListCreateAPIView):
    queryset = MeetingPost.objects.all()
    serializer_class = MeetingPostSerializer
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        return super().perform_create(serializer)
