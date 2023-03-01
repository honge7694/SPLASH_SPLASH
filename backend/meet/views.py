from .models import MeetingPost
from .serializers import MeetingPostSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
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