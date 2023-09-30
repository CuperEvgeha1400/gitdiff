import os
from random import randint
import subprocess
import shutil
from json import loads

from django.core.mail import send_mail
from django.conf import settings
from celery import shared_task
import difflib
import redis
from filecmp import dircmp


@shared_task()
def make_diff_task(branch1, branch2, repo_url, redis_key):
    redis_instance = redis.StrictRedis(host=settings.REDIS_HOST,
                                       port=settings.REDIS_PORT)
    # Создаем отдельную директорию для каждой ветки
    branch_dir1 = os.path.join(os.getcwd() + '/tmp/', branch1)
    os.makedirs(branch_dir1, exist_ok=True)
    # Клонируем репозиторий в директорию для текущей ветки
    subprocess.call(['git', 'clone', '-b', branch1, repo_url, branch_dir1])

    branch_dir2 = os.path.join(os.getcwd() + '/tmp/', branch2)

    os.makedirs(branch_dir2, exist_ok=True)

    # Клонируем репозиторий в директорию для текущей ветки
    subprocess.call(['git', 'clone', '-b', branch2, repo_url, branch_dir2])

    redis_instance.set(f"status_{redis_key}", 'run')

    dcmp = dircmp(branch_dir1, branch_dir2)
    for diff_file in dcmp.diff_files:
        file1_path = branch_dir1 + f'/{diff_file}'
        file2_path = branch_dir2 + f'/{diff_file}'

        file1_abs_path = os.path.abspath(file1_path)
        file2_abs_path = os.path.abspath(file2_path)

        # Считываем содержимое файлов
        with open(file1_abs_path, 'r') as file1, open(file2_abs_path, 'r') as file2:
            file1_lines = file1.readlines()
            file2_lines = file2.readlines()

        # Выполняем сравнение
        d = difflib.Differ()
        diff = {'data': list(d.compare(file1_lines, file2_lines))}

        work_key = f"diffwork_{randint(1, 99999999)}"
        redis_instance.set(work_key, str(diff))

        work_list = loads(redis_instance.get(f"work_{redis_key}"))
        work_list.append(work_key)
        redis_instance.set(f"work_{redis_key}", str(work_list))
    redis_instance.set(f"status_{redis_key}", 'done')

    shutil.rmtree(branch_dir1)
    shutil.rmtree(branch_dir2)
