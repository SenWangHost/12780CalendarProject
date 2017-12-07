#  this is the program to direct views
from django.http import HttpResponse
from django.template.loader import get_template
from django.views.decorators.csrf import csrf_exempt
from django.template import Context, Template
from django.shortcuts import render
from login.models import User
from friends.models import Friend
from tasks.models import Task
import json

#  the view for log in page
def login(request):
    userid = ''
    try:
        userid = request.session['userid']
        print('The user has logged in!')
        pinfo = getPeronalInfo(userid)
        name = pinfo[0]
        motto = pinfo[1]
        params = {'name':name, 'motto':motto}
        return render(request, 'todolist.html', params)
    except KeyError:
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
        # save the user information in session for login purpose
        request.session['userid'] = email
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
    except KeyError:
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
    except KeyError:
        print('The user has not logged in!')
        t = get_template('index.html')
        html = t.render()
        return HttpResponse(html)

# the function for adding the task to the database
@csrf_exempt
def addTask(request):
    userid = '';
    try:
        userid = request.session['userid']
    except KeyError:
        return HttpResponse("UNAUTHORIZED")
    if (request.method == "POST"):
        data = json.loads(request.body)
        title = data['title']
        allDay = data['allday']
        startDate = data['startDate']
        endDate = data['endDate']
        startTime = data['startTime']
        endTime = data['endTime']
        description = data['description']
        location = data['location']
        color = data['color']
        print(title)
        print(allDay)
        print(startDate)
        print(startTime)
        print(endDate)
        print(endTime)
        print(description)
        print(location)
        print(color)
        newTask = Task(title = title, owner = userid,allDay = allDay, startDate = startDate, \
                color = color, startTime = startTime, endDate = endDate, \
                endTime = endTime, description = description, location = location)
        newTask.save()
        return HttpResponse("SAVED")
    else:
        return HttpResponse("FAILED")

# the function getting all the tasks related to the logged in user
def getTasks(request):
    userid = ''
    try:
        userid = request.session['userid']
    except KeyError:
        return HttpResponse('UNANTHORIZED')
    resultSet = Task.objects.filter(owner = userid)
    tasks = []
    for entry in resultSet:
        start = entry.startDate
        end = entry.endDate
        if (entry.startTime != ''):
            start += 'T' + entry.startTime
        if (entry.endTime != ''):
            end += 'T' + entry.endTime 
        task = {'title': entry.title, 'allDay': entry.allDay, 'start': start,\
            'end': end, 'description' :entry.description, 'location':entry.location, 'color': entry.color, 'textColor': 'white'}
        tasks.append(task)
    return HttpResponse(json.dumps(tasks))

# the view for friends list page
@csrf_exempt
def friends(request):
    userid = ''
    # use for page routing
    page = request.GET.get('page')
    print(page)
    searchresult = None
    errors = []
    friends = []
    try:
        userid = request.session['userid']
        print('The user has logged in!')
        pinfo = getPeronalInfo(userid)
        name = pinfo[0]
        motto = pinfo[1]
        if (request.method == "POST" and page == 'add'):
            searchemail = request.POST.get('searchemail', '')
            print(searchemail)
            if (searchemail == None or searchemail == ''):
                errors.append('Input search email is empty!')
            else:
                try:
                    result = User.objects.get(email = searchemail)
                    if (result.email == userid):
                        errors.append("This is your own email address!")
                    else:
                        searchresult = result;
                except User.DoesNotExist:
                    errors.append("We don't have the record of this email address")
        if (request.method == "POST" and page == 'current'):
            femail = request.POST.get('femail', '')
            firstnameF = request.POST.get('firstname', '')
            lastnameF = request.POST.get('lastname', '')
            mottoF = request.POST.get('motto', '')
            bioF = request.POST.get('bio', '')
            # print(femail)
            # print(firstnameF)
            # print(lastnameF)
            # print(mottoF)
            # print(bioF)
            newFriend = Friend(owner = userid, friendemail = femail, \
                firstname = firstnameF, lastname = lastnameF, bio = bioF, motto = mottoF)
            # save the new friend object to the database.
            newFriend.save()
            print('New Friend is saved into database!')
        # fecth the all posiblile friend and pack them into list
        friendsSet = Friend.objects.filter(owner = userid)
        for entry in friendsSet:
            print(entry.friendemail)
            friendData = User.objects.get(email = entry.friendemail)
            friends.append(friendData)
        params = {'name':name, 'motto':motto , 'page':page, 'errors': errors, 'searchresult': searchresult, 'friends':friends}
        return render(request, 'friends.html', params)
    except KeyError:
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