from rest_framework import serializers

from ActivitySync.geo.models import Location


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('id', 'name', 'lat', 'lng')
