from django.http import HttpResponse
from django.template import loader


def index_view(request):
    t = loader.get_template('index.html')
    return HttpResponse(t.render({}, request))
