from django.urls import path, include

from .login_view import LoginView
from .hello_world_view import HelloView

urlpatterns = [
    path('login/', LoginView.as_view()),
    path('hello/', HelloView.as_view(), name='hello'),
]