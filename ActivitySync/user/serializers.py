from django.contrib.auth.models import User
from rest_framework import serializers

from ActivitySync.user.models import UserProfile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email')


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    creditability = serializers.CharField(source='get_creditability', read_only=True)

    class Meta:
        model = UserProfile
        fields = ('id', 'user', 'creditability')

