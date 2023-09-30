import os
import subprocess
import asyncio
from json import loads
from random import randint

import gitlab
import difflib
from filecmp import dircmp
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
import redis

from .decorator import login_decorator
from .tasks import make_diff_task


class ProjectView(APIView):
    @login_decorator
    def get(self, request, gl):
        project_name = request.GET.get('project_name')
        try:
            project = gl.projects.list(search=project_name)[0]
        except IndexError:
            return HttpResponse('project not found', status=404)
        return Response({'id': project.id, 'name': project.path_with_namespace})


class GitDiff(APIView):
    @login_decorator
    def get(self, request, gl):

        branch1 = request.GET.get('branch1')
        branch2 = request.GET.get('branch2')
        project_id = request.GET.get('project_id')
        if not branch1 or not branch2:
            return HttpResponse('branch not found', status=404)
        try:
            project = gl.projects.get(project_id)
        except IndexError:
            return HttpResponse('project not found', status=404)
        repo_url = project.http_url_to_repo


        redis_instance = redis.StrictRedis(host=settings.REDIS_HOST,
                                           port=settings.REDIS_PORT)
        redis_key = f"diff_{randint(1, 99999999)}"
        redis_instance.set(f"status_{redis_key}", 'install')
        redis_instance.set(f"work_{redis_key}", str([]))
        make_diff_task.delay(branch1, branch2, repo_url, redis_key)

        return Response({"task_key": redis_key})


class TaskView(APIView):
    def get(self, request):

        task_key = request.GET.get('task_key')

        redis_instance = redis.StrictRedis(host=settings.REDIS_HOST,
                                           port=settings.REDIS_PORT)
        status = redis_instance.get(f"status_{task_key}")
        work = redis_instance.get(f"work_{task_key}")
        return Response({"status": status, "works": work})


class WorkView(APIView):
    def get(self, request):
        work_key = request.GET.get('work_key')

        redis_instance = redis.StrictRedis(host=settings.REDIS_HOST,
                                           port=settings.REDIS_PORT)
        work = redis_instance.get(work_key)

        return Response(loads(work))

