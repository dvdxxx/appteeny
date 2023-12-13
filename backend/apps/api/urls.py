from django.urls import path
from . import views
from .views import UserRegistrationView

urlpatterns = [
    path('api/item/', views.ItemList.as_view(), name='item-list'),
    path('api/item/<str:pk>/', views.ItemDetail.as_view(), name='item-detail'),
    path('api/echeck/', views.emailCheck, name='emailCheck'),  # Remove <str:email>
    path('api/register/', UserRegistrationView.as_view(), name='user-registration'),
]