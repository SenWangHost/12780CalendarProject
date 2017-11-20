# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import User

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'password', 'firstname', 'lastname')
    search_fields = ('firstname','lastname')

admin.site.register(User, UserAdmin)
