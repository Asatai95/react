from rest_framework import serializers
from .models import Todo, User
from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
import sys
from django.core import exceptions
import django.contrib.auth.password_validation as validators

Get_user = get_user_model()

# 検索
class UserFilter(serializers.ModelSerializer):
    username = filters.CharFilter(name="username", lookup_expr='contains')
    start_date = filters.DateFilter(lookup_expr="gte")
    end_date = filters.DateFilter(lookup_expr="lte")

    class Meta:
        model = User
        fields = ("username", "start_date", "end_date")

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', "message", 'date_joined')

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "message", "password")

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'body',)

class AccountSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=150)
    # email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all())])

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

    def validate(self, data):
        user = User(**data)
        password = data.get('password')
        print(password)
        errors = dict()
        try:
            validators.validate_password(password=password, user=User)
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)
        if errors:
            raise serializers.ValidationError(errors)
        return super(AccountSerializer, self).validate(data)

    def create(self, validated_data):
        return User.objects.create_user(request_data=validated_data)