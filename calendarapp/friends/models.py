# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here
class Friend(models.Model):
    owner = models.CharField(max_length = 50)
    friendemail = models.CharField(max_length = 50)
    firstname = models.CharField(max_length = 50)
    lastname = models.CharField(max_length = 50)
    bio = models.CharField(max_length = 255, blank = True, default = '')
    motto = models.CharField(max_length = 60, blank = True, default = '')

    def __str__(self):
        return u'%s -> %s %s' % (self.owner, self.firstname, self.lastname)
