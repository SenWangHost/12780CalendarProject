# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length = 255)
    allDay = models.BooleanField(default = False)
    startDate = models.CharField(max_length = 50)
    color = models.CharField(max_length = 30)
    startTime = models.CharField(max_length = 50, blank = True, default = '')
    endDate = models.CharField(max_length = 50, blank = True, default = '')
    endTime = models.CharField(max_length = 50, blank = True, default = '')
    description = models.CharField(max_length = 255, blank = True, default = '')
    location = models.CharField(max_length = 255, blank = True, default = '')

    def __str__(self):
        return u'%s %s %s' % (self.title, self.startDate, self.color)
