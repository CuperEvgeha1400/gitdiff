# Проект для хакатона
## Как запустить

`docker-compose up --build`

Создать суперпользователя

`docker-compose exec gitdiff python manage.py createsuperuser`

Если таблиц нет

`docker-compose exec gitdiff python manage.py makemigrations app`

## Узнать пароль от суперпользователя гитлаба

Внутри контейнера gitlab

`cat /etc/gitlab/initial_root_password`
