# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length = 30)
    password = models.CharField(max_length = 30)
    firstname = models.CharField(max_length = 50)
    lastname = models.CharField(max_length = 50)

    def __str__(self):
        return u'%s %s' % (self.firstname, self.lastname)
