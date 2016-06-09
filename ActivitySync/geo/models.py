from __future__ import unicode_literals

from django.db import models


class Location(models.Model):
    # name
    name = models.CharField(max_length=100)

    # coordinates
    lng = models.DecimalField(max_digits=9, decimal_places=6)
    lat = models.DecimalField(max_digits=9, decimal_places=6)

    def __str__(self):
        return self.name
