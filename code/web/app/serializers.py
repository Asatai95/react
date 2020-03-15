from rest_framework import serializers
from .models import Todo, User
from django.contrib.auth import get_user_model
Get_user = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', "first_name", "last_name", "is_staff", "message", "image", )

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'body',)
