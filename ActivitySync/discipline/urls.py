from django.conf.urls import url

from ActivitySync.discipline.views import DisciplineListView

urlpatterns = [
    # disciplines list
    url(r'^all/', DisciplineListView.as_view(), name='discipline_list'),
]
