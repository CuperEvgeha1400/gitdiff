import os

import gitlab
from gitlab.exceptions import GitlabAuthenticationError


def login_decorator(func):
    def wrapper(self, request):
        if request.user:
            try:
                gl = gitlab.Gitlab(url=os.getenv('GITLAB_URL'), private_token=request.user.token_git)
                gl.auth()

            except GitlabAuthenticationError:
                gl = gitlab.Gitlab(url=os.getenv('GITLAB_URL'))
        else:
            gl = gitlab.Gitlab(url=os.getenv('GITLAB_URL'))
        return func(self, request, gl)
    return wrapper
