#  this is the program to direct views
from django.http import HttpResponse
from django.template.loader import get_template
from django.views.decorators.csrf import csrf_exempt
from django.template import Context
from django.shortcuts import render
from login.models import User

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
    email = params.get("email")
    password = params.get("password")
    print(email)
    print(password)
    # t = get_template('homepage.html')
    # html = t.render()
    # check whether the user exists in the databases
    try:
        user = User.objects.get(email = email)
    except:
        return HttpResponse("Email not exist")
    # check whethr the password is correct
    if (password != user.password):
        return HttpResponse("Incorrect Password")
    return HttpResponse("true")

# the view for register page
def register(request):
    t = get_template('register.html')
    html = t.render()
    return HttpResponse(html)

# the function for registering user check
@csrf_exempt
def registerCheck(request):
    params = request.POST
    email = params.get("email")
    password = params.get("password")
    firstname = params.get("firstname")
    lastname = params.get("lastname")
    print(email)
    print(password)
    print(firstname)
    print(lastname)
    # check whether the email exist in the database;
    try:
        user = User.objects.get(email = email)
        return HttpResponse("exists")
    except:
        newUser = User(email = email, password = password, firstname = firstname, lastname = lastname)
        newUser.save()
    return HttpResponse("true")

# the view for home page
def homepage(request):
    t = get_template('homepage.html')
    html = t.render()
    return HttpResponse(html)
