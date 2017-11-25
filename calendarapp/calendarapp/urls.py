"""calendarapp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
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
from django.conf.urls import url, include
from django.contrib import admin

from calendarapp.views import login
from calendarapp.views import register
from calendarapp.views import homepage
from calendarapp.views import checkUser
admin.autodiscover()

urlpatterns = [
    #  the admin page for this project
    url(r'^admin/', include(admin.site.urls)),
    #  the login page
    url(r'^$', login),
    url(r'^checkUser/$', checkUser),
    # the register page
    url(r'^register/$', register),
    # the home page
    url(r'^homepage/$', homepage)
]
