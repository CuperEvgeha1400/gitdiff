import os
import os
from filecmp import dircmp

import gitlab
import subprocess
import asyncio
import difflib
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


class GitDiff(APIView):
    @login_decorator
    def get(self, request, gl):

        branch1 = request.GET.get('branch1')
        branch2 = request.GET.get('branch2')
        project_id = request.GET.get('project_id')
        try:
            project = gl.projects.get(project_id)
        except IndexError:
            return HttpResponse('project not found', status=404)
        repo_url = project.http_url_to_repo

        # Создаем отдельную директорию для каждой ветки
        branch_dir1 = os.path.join(os.getcwd()+'/tmp/', branch1)
        os.makedirs(branch_dir1, exist_ok=True)

        # Клонируем репозиторий в директорию для текущей ветки
        subprocess.call(['git', 'clone', '-b', branch1, repo_url, branch_dir1])

        branch_dir2 = os.path.join(os.getcwd()+'/tmp/', branch2)

        os.makedirs(branch_dir2, exist_ok=True)

        # Клонируем репозиторий в директорию для текущей ветки
        subprocess.call(['git', 'clone', '-b', branch2, repo_url, branch_dir2])

        dcmp = dircmp(branch_dir1, branch_dir2)

        for diff_file in dcmp.diff_files:
            file1_path = branch_dir1+f'/{diff_file}'
            file2_path = branch_dir2+f'/{diff_file}'

            # Считываем содержимое первого файла
            with open(file1_path, 'r') as file1:
                file1_lines = file1.readlines()

            # Считываем содержимое второго файла
            with open(file2_path, 'r') as file2:
                file2_lines = file2.readlines()

            # Создаем объект Differ
            d = difflib.Differ()

            # Выполняем сравнение
            diff = list(d.compare(file1_lines, file2_lines))

            file1_abs_path = os.path.abspath(file1_path)
            file2_abs_path = os.path.abspath(file2_path)

            # Считываем содержимое файлов
            with open(file1_abs_path, 'r') as file1, open(file2_abs_path, 'r') as file2:
                file1_lines = file1.readlines()
                file2_lines = file2.readlines()

            # Выполняем сравнение
            d = difflib.Differ()
            diff = list(d.compare(file1_lines, file2_lines))
        return Response(diff)

