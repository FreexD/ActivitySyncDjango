"""ActivitySync URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin

import settings
from test_index import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    # main screen
    url(r'^$', views.index_view, name='index'),
    # administration
    url(r'^admin/', include(admin.site.urls)),
    # docs
    url(r'^docs/', include('rest_framework_docs.urls')),
    # auth
    url(r'^api-auth-token', obtain_auth_token, name='obtain_auth_token'),
    # modules
    url(r'^disciplines/', include('ActivitySync.discipline.urls')),
    url(r'^events/', include('ActivitySync.event.urls')),


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
