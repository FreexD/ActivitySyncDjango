from django.contrib.auth.models import User
from django.test import TestCase

# Create your tests here.
from ActivitySync.user.models import UserProfile


class UserTestCase(TestCase):
    def setUp(self):
        u = User.objects.create_user('adam')
        u.profile = UserProfile.objects.create()

    def test_user_profile_defaults_set_properly(self):
        u = User.objects.get(username='adam')
        self.assertEqual(0,u.profile.acknowledged)