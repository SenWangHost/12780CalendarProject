#  this is the program to direct views
from django.http import HttpResponse
from django.template.loader import get_template
from django.views.decorators.csrf import csrf_exempt
from django.template import Context, Template
from django.shortcuts import render
from login.models import User

#  the view for log in page
def login(request):
    userid = ''
    try:
        userid = request.session['userid']
        print('The user has logged in!')
        t = get_template('todolist.html')
        html = t.render()
        return HttpResponse(html)
    except:
        print('The user has not logged in!')
        t = get_template('index.html')
        html = t.render()
        return HttpResponse(html)

# the view for log out page
def logout(request):
    # delete the session information and log out
    del request.session['userid']
    return HttpResponse('delete')

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
    # save the user information in session for login purpose
    request.session['userid'] = email
    return HttpResponse("true")

# the view for register page
def register(request):
    userid = ''
    try:
        userid = request.session['userid']
        print('The user has logged in!')
        t = get_template('todolist.html')
        html = t.render()
        return HttpResponse(html)
    except:
        print('The user has not logged in!')
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
        newUser = User(email = email, password = password, firstname = firstname, \
            lastname = lastname)
        newUser.save()
    return HttpResponse("true")

# the view for to-do-list page
def todolist(request):
    userid = ''
    try:
        userid = request.session['userid']
        print('The user has logged in!')
        pinfo = getPeronalInfo(userid)
        name = pinfo[0]
        motto = pinfo[1]
        params = {'name':name, 'motto':motto}
        return render(request, 'todolist.html', params)
    except:
        print('The user has not logged in!')
        t = get_template('index.html')
        html = t.render()
        return HttpResponse(html)

# the view for calendar page
def calendar(request):
    userid = ''
    try:
        userid = request.session['userid']
        print('The user has logged in!')
        pinfo = getPeronalInfo(userid)
        name = pinfo[0]
        motto = pinfo[1]
        params = {'name':name, 'motto':motto}
        return render(request, 'calendar.html', params)
    except:
        print('The user has not logged in!')
        t = get_template('index.html')
        html = t.render()
        return HttpResponse(html)

# the view for friends list page
def friends(request):
    userid = ''
    try:
        userid = request.session['userid']
        print('The user has logged in!')
        pinfo = getPeronalInfo(userid)
        name = pinfo[0]
        motto = pinfo[1]
        params = {'name':name, 'motto':motto}
        return render(request, 'friends.html', params)
    except:
        print('The user has not logged in!')
        t = get_template('index.html')
        html = t.render()
        return HttpResponse(html)

# the view for personal profile
def personalprofile(request):
    userid = ''
    # use for page routing
    profile = request.GET.get('page')
    print(profile)
    try:
        userid = request.session['userid']
        print('The user has logged in!')
        pinfo = getPeronalInfo(userid)
        name = pinfo[0]
        motto = pinfo[1]
        # pack them into params dictionary
        params = {'profile':profile, 'name': name, 'motto':motto}
    # t = Template('personalprofile.html')
    # c = Context({'profile': profile})
    # html = t.render(c)
        return render(request, 'personalprofile.html', params)
    except:
        print('The user has not logged in!')
        t = get_template('index.html')
        html = t.render()
        return HttpResponse(html)

# the helper function to get personal information with userid
# return a list of results
def getPeronalInfo(userid):
    userObject = User.objects.get(email = userid)
    name = userObject.firstname + ' ' + userObject.lastname
    motto = userObject.motto
    return [name, motto]