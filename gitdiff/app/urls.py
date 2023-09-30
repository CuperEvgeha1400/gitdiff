from django.urls import path, include

from .login_view import LoginView
from .views import ProjectView, GitDiff, TaskView, WorkView

urlpatterns = [
    path('login/', LoginView.as_view()),
    path('project/', ProjectView.as_view()),
    path('gitdiff/', GitDiff.as_view()),
    path('task/', TaskView.as_view()),
    path('work/', WorkView.as_view()),
]