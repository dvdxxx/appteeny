from rest_framework import serializers
from .models import Items
from apps.api.models import AppteenyUser, Brand, models  # Import the User model

class AppteenyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppteenyUser
        fields = ('email',)

class ItemSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username')
    brand = serializers.CharField(source='brand.name')
    modeltype = serializers.CharField(source='modeltype.name')

    class Meta:
        model = Items
        fields = '__all__'

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppteenyUser
        fields = ('id', 'email', 'activation_key', 'is_active')