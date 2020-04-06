from django.contrib.auth.hashers import check_password, make_password
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

class UserBackend(ModelBackend):
    def authenticate(self, username, password, **kwargs):
        UserModel = get_user_model()
        print("username")
        print(username)
        try:
            user = UserModel.objects.get(email=username, password=password)
        except UserModel.DoesNotExist:
            return None
        print(user.set_password(password))
        cass
        if user.check_password(password):
            return user

        return None