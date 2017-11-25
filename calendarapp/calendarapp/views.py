#  this is the program to direct views
from django.http import HttpResponse
from django.template.loader import get_template
from django.views.decorators.csrf import csrf_exempt
from django.template import Context
from django.shortcuts import render

#  the view for homepage
def login(request):
    t = get_template('index.html')
    html = t.render()
    return HttpResponse(html)

# the function for validating the user
@csrf_exempt
def checkUser(request):
    print("This is checkUser function")
    params = request.POST
    print(params)
    t = get_template('homepage.html')
    html = t.render()
    return HttpResponse(html)

# the view for register page
def register(request):
    t = get_template('register.html')
    html = t.render()
    return HttpResponse(html)

# the view for home page
def homepage(request):
    t = get_template('homepage.html')
    html = t.render()
    return HttpResponse(html)
