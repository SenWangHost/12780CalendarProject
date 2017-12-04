# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Friend

# Register your models here.
class FriendAdmin(admin.ModelAdmin):
    list_display = ('owner', 'friendemail', 'firstname', 'lastname')
    search_fields = ('firstname','lastname')

admin.site.register(Friend, FriendAdmin)