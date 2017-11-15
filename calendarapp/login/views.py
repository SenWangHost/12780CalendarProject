# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from django.template.loader import get_template

# Create your views here.
def login(request):
    t = get_template('login.html')
    html = t.render()
    return HttpResponse(html)
