from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models


class UserProfile(models.Model):
    # user
    user = models.OneToOneField(User, related_name='profile')

    # creditablity
    acknowledged = models.IntegerField(default=0)
    attended = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username

    def get_creditability(self):
        return "{} / {}".format(self.attended, self.acknowledged)
