from django.conf.urls import url

from ActivitySync.event.views import EventCreateView, EventListView, FilterEventListView, EventRetrieveView

urlpatterns = [
    # event list
    url(r'^all', EventListView.as_view(), name='event_list'),
    # event filtered list
    url(r'^find', FilterEventListView.as_view(), name='event_filter'),
    # event detail
    url(r'^(?P<pk>\d+)$', EventRetrieveView.as_view(), name='event_detail'),
    # event create
    url(r'^create', EventCreateView.as_view(), name='event_create'),
]
