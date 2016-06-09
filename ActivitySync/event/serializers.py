from django.contrib.auth.models import User
from rest_framework import serializers

from ActivitySync.discipline.models import Discipline
from ActivitySync.discipline.serializers import DisciplineSerializer
from ActivitySync.event.models import Event
from ActivitySync.geo.models import Location
from ActivitySync.geo.serializers import LocationSerializer
from ActivitySync.user.serializers import UserProfileSerializer


class EventSerializer(serializers.ModelSerializer):
    organizer = UserProfileSerializer(read_only=True)
    location = LocationSerializer(read_only=True)
    discipline = DisciplineSerializer(read_only=True)

    class Meta:
        model = Event
        fields = ('id', 'organizer', 'description', 'date', 'places', 'location', 'discipline')


class EventCreateSerializer(serializers.Serializer):

    disciplineID = serializers.IntegerField(source='get_discipline_id')
    date = serializers.DateTimeField()
    places = serializers.IntegerField()
    address = serializers.CharField(source='get_location_name', max_length=100)
    lat = serializers.DecimalField(source='get_location_lat', max_digits=9, decimal_places=6)
    lng = serializers.DecimalField(source='get_location_lng', max_digits=9, decimal_places=6)
    description = serializers.CharField(max_length=200)

    def create(self, validated_data):
        discipline = Discipline.objects.get(id=validated_data['get_discipline_id'])
        location = Location.objects.get_or_create(name=validated_data['get_location_name'],
                                                  lat=validated_data['get_location_lat'],
                                                  lng=validated_data['get_location_lng'])[0]
        organizer = User.objects.get(username='admin').profile

        return Event.objects.create(organizer=organizer, description=validated_data['description'],
                                    places=validated_data['places'], date=validated_data['date'], discipline=discipline,
                                    location=location)

    def update(self, instance, validated_data):
        pass
