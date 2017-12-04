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
@csrf_exempt
def personalprofile(request):
    userid = ''
    # use for page routing
    profile = request.GET.get('page')
    print(profile)
    # for error message
    errors = []
    success = False
    try:
        userid = request.session['userid']
        print('The user has logged in!')
        # handle the post request
        if (request.method == "POST" and profile == 'profile'):
            alteremail = request.POST.get('alteremail', '')
            firstname = request.POST.get('firstname', '')
            lastname = request.POST.get('lastname', '')
            motto = request.POST.get('motto', '')
            bio = request.POST.get('bio', '')
            url = request.POST.get('url', '')
            company = request.POST.get('company', '')
            # update the personal information
            User.objects.filter(email = userid).update(alteremail = alteremail, \
            firstname = firstname, lastname = lastname, motto = motto, bio = bio, url = url, company = company)
        elif (request.method == 'POST' and profile == 'security'):
            currpassword = request.POST.get('currpassword', '')
            newpassword1 = request.POST.get('newpassword1', '')
            newpassword2 = request.POST.get('newpassword2', '')
            print(currpassword)
            print(newpassword1)
            print(newpassword2)
            userObject = User.objects.get(email = userid)
            if (userObject.password != currpassword):
                errors.append('Incorrect current password!')
            if (newpassword1 == None or newpassword1 == ''):
                errors.append('New password cannot be empty!')
            if (newpassword1 != newpassword2):
                errors.append("Confirmed new password doesn't match with new password!")
            if (len(errors) == 0):
                User.objects.filter(email = userid).update(password = newpassword1)
                success = True
        pinfo = getPeronalInfo(userid)
        name = pinfo[0]
        motto = pinfo[1]
        # get additional information
        userObject = User.objects.get(email = userid)
        email = userObject.email
        alteremail = userObject.alteremail
        firstname = userObject.firstname
        lastname = userObject.lastname
        motto = userObject.motto
        bio = userObject.bio
        url = userObject.url
        company = userObject.company
        # pack them into params dictionary
        params = {'profile':profile, 'name': name, 'motto':motto, 'email':email,\
         'firstname':firstname, 'lastname':lastname, 'alteremail':alteremail, 'motto':motto,\
         'bio':bio, 'url':url, 'company':company ,'errors': errors ,'success': success}
    # t = Template('personalprofile.html')
    # c = Context({'profile': profile})
    # html = t.render(c)
        return render(request, 'personalprofile.html', params)
    except KeyError:
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