from django.db import models
#from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Define a model for social media platforms
class SocialMedia(models.Model):
    social_media = models.CharField(max_length=255)
    url = models.CharField(max_length=1000)

    def __str__(self):
        return self.name

# Define a model for social media platforms
class UserSocialMedia(models.Model):
    socialmedia = models.ForeignKey(SocialMedia, on_delete=models.CASCADE)
    username = models.CharField(max_length=255)
    url = models.CharField(max_length=1000)
    # Add other fields as needed

    def __str__(self):
        return self.name
    
# Define the custom user model
class AppteenyUser(AbstractUser):
    username = models.CharField(max_length=30, unique=True)
    email = models.EmailField(unique=True)
    phonenumber = models.CharField(max_length=15, blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    social_media = models.ManyToManyField(UserSocialMedia, blank=True)
    unique_user_code = models.CharField(max_length=20, unique=True, blank=True, null=True)
    activation_key = models.CharField(max_length=40, null=True)
    is_active = models.BooleanField(default=False, null=True)

    def __str__(self):
        return self.username
    
class Brand(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    logo = models.ImageField(upload_to='brand_logos/', blank=True, null=True)

    def __str__(self):
        return self.name

class ModelType(models.Model):
    name = models.CharField(max_length=255)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    description = models.TextField(blank=True, null=True)
    release_date = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.name
    
class Items(models.Model):
    unique_code = models.CharField(max_length=20, unique=True)
    registration_date = models.DateField()
    user = models.ForeignKey(AppteenyUser, on_delete=models.CASCADE, related_name='items')
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    modeltype = models.ForeignKey(ModelType, on_delete=models.CASCADE)
    status = models.CharField(max_length=255)
    features = models.CharField(max_length=1000)
    info = models.TextField()
    #previous_users = models.ManyToManyField(AppteenyUser, through='OwnershipHistory', related_name='items_owned')
    def previous_owners(self):
        # Get all ownership history entries for the current item
        ownership_history_entries = OwnershipHistory.objects.filter(item=self)

        # Exclude the current owner from the list
        previous_owners = ownership_history_entries.exclude(user=self.user)

        return previous_owners
    
    def __str__(self):
        return f"Item {self.id}"
    
class MediaFile(models.Model):
    file = models.FileField(upload_to='item_media/', null=True, blank=True)
    description = models.TextField(blank=True, null=True)
    release_date = models.DateField(blank=True, null=True)
    item = models.ForeignKey(Items, on_delete=models.CASCADE, related_name='media_files', null=True)

    def __str__(self):
        return self.file.name
    
class OwnershipHistory(models.Model):
    item = models.ForeignKey(Items, on_delete=models.CASCADE)
    user = models.ForeignKey(AppteenyUser, on_delete=models.CASCADE)
    transfer_date = models.DateTimeField(auto_now_add=True)
    isOwner = models.BooleanField(default=False)
    owner_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Ownership History for Item {self.item.id} - User {self.user.username}"






    