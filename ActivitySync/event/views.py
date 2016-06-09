from rest_framework import generics

from ActivitySync.event.models import Event
from ActivitySync.event.serializers import EventSerializer, EventCreateSerializer


class EventListView(generics.ListAPIView):
    serializer_class = EventSerializer

    def get_queryset(self):
        return Event.objects.all()


class FilterEventListView(EventListView):
    def get_queryset(self):
        queryset = super(FilterEventListView, self).get_queryset()

        discipline_id = self.request.query_params.get('disciplineID', None)

        if discipline_id is not None:
            queryset = queryset.filter(discipline__id=discipline_id)

        # since = self.request.query_params.get('since', None)
        #
        # if since is not None:
        #     queryset = queryset.filter(date__gt=since)
        #
        # to = self.request.query_params.get('since', None)
        #
        # if to is not None:
        #     queryset = queryset.filter(date__lt=to)
        #

        address = self.request.query_params.get('address', None)

        if address is not None:
            queryset = queryset.filter(location__name__icontains=address)

        return queryset


class EventCreateView(generics.CreateAPIView):
    serializer_class = EventCreateSerializer


class EventRetrieveView(generics.RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
