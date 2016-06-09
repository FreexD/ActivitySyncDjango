from rest_framework import generics

from ActivitySync.discipline.models import Discipline
from ActivitySync.discipline.serializers import DisciplineSerializer


class DisciplineListView(generics.ListAPIView):
    queryset = Discipline.objects.all()
    serializer_class = DisciplineSerializer
