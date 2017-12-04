# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class User(models.Model):
    email = models.CharField(max_length = 50)
    password = models.CharField(max_length = 50)
    firstname = models.CharField(max_length = 50)
    lastname = models.CharField(max_length = 50)
    alteremail = models.CharField(max_length = 50, blank = True, default = '')
    motto = models.CharField(max_length = 60, blank = True, default = '')
    bio = models.CharField(max_length = 255, blank = True, default = '')
    url = models.CharField(max_length = 50, blank = True, default = '')
    company = models.CharField(max_length = 50, blank = True, default = '')

    def __str__(self):
        return u'%s %s' % (self.firstname, self.lastname)
