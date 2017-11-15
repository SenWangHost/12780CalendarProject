#  this is the program to direct views
from django.http import HttpResponse
from django.template.loader import get_template
from django.template import Context

#  the view for homepage
def homepage(request):
    t = get_template('index.html')
    html = t.render()
    return HttpResponse(html)

# the view for register page
def register(request):
    t = get_template('register.html')
    html = t.render()
    return HttpResponse(html)
