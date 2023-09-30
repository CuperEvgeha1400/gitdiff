import os

from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse

from .decorator import login_decorator


class ProjectView(APIView):
    @login_decorator
    def get(self, request, gl):
        project_name = request.GET.get('project_name')
        try:
            project = gl.projects.list(search=project_name)[0]
        except IndexError:
            return HttpResponse('project not found', status=404)
        return Response({'id': project.id, 'name': project.path_with_namespace})
