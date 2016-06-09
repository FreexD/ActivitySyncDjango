from __future__ import unicode_literals

from django.db import models

from ActivitySync.discipline.models import Discipline
from ActivitySync.user.models import UserProfile
from ActivitySync.geo.models import Location


class Event(models.Model):
    # owner
    organizer = models.ForeignKey(UserProfile, related_name='events')

    # event data
    description = models.CharField(max_length=200)
    date = models.DateTimeField()
    location = models.ForeignKey(Location, related_name='events')
    places = models.IntegerField(default=0)
    discipline = models.ForeignKey(Discipline, related_name='events')

    def __str__(self):
        return "{} in {} on {}".format(self.discipline.name, self.location.name, self.date)

    def get_discipline_id(self):
        return self.discipline.id

    def get_location_lat(self):
        return self.location.lat

    def get_location_lng(self):
        return self.location.lng

    def get_location_name(self):
        return self.location.name
