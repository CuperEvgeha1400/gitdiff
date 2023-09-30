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



""" -+ одна стркоа + справа есть слева нету -  слева есть спрва ничего вопрос уточнение игнорирует"""


def parse_lr_only(arr, file_name, is_left=True):
    i = 0
    final_list = []
    while i <= len(arr) - 1:
        if is_left:
            d = {'line': i, 'right': None, 'left': arr[i]}
        else:
            d = {'line': i, 'right': arr[i], 'left': None}
        final_list.append(d)
        i += 1

    # Возвращаем словарь, включая имя файла и данные различий
    return {"name": file_name, "data": final_list}


def parse(arr, file_name):
    i = 0
    final_list = []
    while i <= len(arr) - 1:
        d = {'line': i}
        first_element = arr[i]
        if i + 1 == len(arr):
            second_element = None
        else:
            second_element = arr[i + 1]

        if second_element and first_element[0] == '-' and second_element[0] == '+':
            newArr = {'type': '+-', "right": first_element[2:], "left": second_element[2:]}
            d.update(newArr)
            i += 1
        elif first_element[0] == '+':
            newArr = {'type': '+', "right": first_element[2:], "left": None}
            d.update(newArr)
        elif first_element[0] == '-':
            newArr = {'type': '-', "right": None, "left": first_element[2:]}
            d.update(newArr)
        elif first_element[0] == '?':
            pass
        else:
            newArr = {'type': '==', "right": first_element[2:], "left": first_element[2:]}
            d.update(newArr)
        final_list.append(d)
        i += 1

    # Возвращаем словарь, включая имя файла и данные различий
    return {"name": file_name, "data": final_list}

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

        branch_dir1 = os.path.join(os.getcwd()+'/tmp/', branch1)
        os.makedirs(branch_dir1, exist_ok=True)
        subprocess.call(['git', 'clone', '-b', branch1, repo_url, branch_dir1])

        branch_dir2 = os.path.join(os.getcwd()+'/tmp/', branch2)
        os.makedirs(branch_dir2, exist_ok=True)
        subprocess.call(['git', 'clone', '-b', branch2, repo_url, branch_dir2])

        dcmp = dircmp(branch_dir1, branch_dir2)
        all_diffs = []
        for diff_file in dcmp.diff_files:
            file1_path = branch_dir1 + f'/{diff_file}'
            file2_path = branch_dir2 + f'/{diff_file}'

            file1_abs_path = os.path.abspath(file1_path)
            file2_abs_path = os.path.abspath(file2_path)

            with open(file1_abs_path, 'r') as file1, open(file2_abs_path, 'r') as file2:
                file1_lines = file1.readlines()
                file2_lines = file2.readlines()

            d = difflib.Differ()
            diff = list(d.compare(file1_lines, file2_lines))
            # Используем функцию parse и передаем имя файла
            file_diff = parse(diff, diff_file)
            all_diffs.append(file_diff)

        for right_only in dcmp.right_only:
            file2_path = branch_dir2 + f'/{right_only}'
            file2_abs_path = os.path.abspath(file2_path)

            with open(file2_abs_path, 'r') as file2:
                file2_lines = file2.readlines()

            # Вызываем новый метод parse_right_only
            file_diff = parse_lr_only(file2_lines, right_only, False)
            all_diffs.append(file_diff)

        for left_only in dcmp.left_only:
            file1_path = branch_dir1 + f'/{left_only}'
            file1_abs_path = os.path.abspath(file1_path)

            with open(file1_abs_path, 'r') as file1:
                file1_lines = file1.readlines()

            # Вызываем новый метод parse_left_only
            file_diff = parse_lr_only(file1_lines, left_only, True)
            all_diffs.append(file_diff)

        return Response(all_diffs)


