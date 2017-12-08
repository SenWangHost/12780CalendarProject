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
from calendarapp.views import logout
from calendarapp.views import register
from calendarapp.views import checkUser
from calendarapp.views import registerCheck

from calendarapp.views import todolist
from calendarapp.views import calendar
from calendarapp.views import friends
from calendarapp.views import personalprofile
from calendarapp.views import addTask
from calendarapp.views import getTasks
from calendarapp.views import deleteTask
from calendarapp.views import updateTask
admin.autodiscover()

urlpatterns = [
    #  the admin page for this project
    url(r'^admin/', include(admin.site.urls)),
    #  the login page
    url(r'^$', login),
    url(r'^logout/$', logout),
    url(r'^checkUser/$', checkUser),
    # the register page
    url(r'^register/$', register),
    url(r'^registerCheck/$', registerCheck),
    # the to do list page
    url(r'^todolist/$', todolist),
    # the calendar page
    url(r'^calendar/$', calendar),
    url(r'^addTask/$', addTask),
    url(r'^getTasks/$', getTasks),
    url(r'^deleteTask/$', deleteTask),
    url(r'^updateTask/$', updateTask),
    # the friends list page
    url(r'^friends/$', friends),
    # the personal profile page
    url(r'^personalprofile/', personalprofile)
]
