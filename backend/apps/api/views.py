from rest_framework import generics
from .models import Items, AppteenyUser
from .serializer import ItemSerializer
from django.http import JsonResponse
from rest_framework.views import APIView
import random
import string
import re
from rest_framework import status
from rest_framework.response import Response
from .serializer import AppteenyUserSerializer

from django.core.mail import send_mail
from django.conf import settings


class ItemList(generics.ListAPIView):
    queryset = Items.objects.all()
    serializer_class = ItemSerializer

class ItemDetail(generics.RetrieveAPIView):
    serializer_class = ItemSerializer

    def get_object(self):
        unique_code = self.kwargs['pk']
        item = Items.objects.filter(unique_code=unique_code).first()
        if item is not None:
            return item
        else:
            raise print("Item not found")
        
def emailCheck(request):
    if request.method == 'POST' or request.method == 'GET':
        email = request.GET.get('email', '')
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        print(f'request: {request}')
        print(f'email: {email}')
        if not re.match(email_pattern, email):
            print('no email format')
            return JsonResponse({'available': False})

        if AppteenyUser.objects.filter(email=email).exists():
            return JsonResponse({'available': False})
        else:
            return JsonResponse({'available': True})
    return JsonResponse({'error': 'Invalid request method'}, status=400)

class UserRegistrationView(APIView):
    def generate_activation_key(self):
        # Generate a random activation key
        key = ''.join(random.choices(string.ascii_letters + string.digits, k=40))
        return key

class CreateUserAPIView(APIView):
    def post(self, request):
        serializer = AppteenyUserSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            
            # Perform email format validation here, for example:
            if not emailCheck(email):
                return Response({'error': 'Invalid email format'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Create the user with the provided email
            user = AppteenyUser(email=email)
            user.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
