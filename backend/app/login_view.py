import os

from django.contrib.auth.models import User
from django.http import HttpResponse
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
import gitlab
from gitlab.exceptions import GitlabAuthenticationError


class LoginView(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        password = request.POST.get('password')
        try:
            gl = gitlab.Gitlab(url=os.getenv('GITLAB_URL'), private_token=password)
            gl.auth()
            username = gl.user.username
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                user = User.objects.create_user(username=username, password=password)
                user.save()
            if not user.check_password(password):
                user.set_password(password)
                user.save()

        except GitlabAuthenticationError:
            return HttpResponse('Unauthorized', status=401)
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username
        })