from .models import MeetingPost
from .serializers import MeetingPostSerializer
from rest_framework.generics import ListCreateAPIView

class MeetingPostAPIView(ListCreateAPIView):
    queryset = MeetingPost.objects.all()
    serializer_class = MeetingPostSerializer
    
