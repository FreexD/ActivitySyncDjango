from __future__ import unicode_literals

from django.db import models

from ActivitySync.user.models import UserProfile
from ActivitySync.event.models import Event


class Application(models.Model):
    # user
    user_profile = models.ForeignKey(UserProfile, related_name='applications')

    # event
    event = models.ForeignKey(Event, related_name='applications')

    # application data
    date = models.DateTimeField()
    is_invited = models.BooleanField(default=False)
    is_applicated = models.BooleanField(default=True)
    is_acknowledged = models.BooleanField(default=False)
    attended = models.BooleanField(default=False)
