# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Task

# Register your models here.
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'startDate', 'allDay','color')
    search_fields = ('title', 'startDate')

admin.site.register(Task, TaskAdmin)
