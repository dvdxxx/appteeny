# Generated by Django 4.2.7 on 2023-11-01 23:04

from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='AppteenyUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('firstname', models.CharField(blank=True, max_length=30)),
                ('lastname', models.CharField(blank=True, max_length=30)),
                ('username', models.CharField(max_length=30, unique=True)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('phonenumber', models.CharField(blank=True, max_length=15)),
                ('avatar', models.ImageField(blank=True, null=True, upload_to='avatars/')),
                ('unique_user_code', models.CharField(blank=True, max_length=20, null=True, unique=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Brand',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('logo', models.ImageField(blank=True, null=True, upload_to='brand_logos/')),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('unique_code', models.CharField(max_length=20, unique=True)),
                ('registration_date', models.DateField()),
                ('status', models.CharField(max_length=255)),
                ('features', models.CharField(max_length=255)),
                ('info', models.TextField()),
                ('brand', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.brand')),
            ],
        ),
        migrations.CreateModel(
            name='MediaFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(blank=True, null=True, upload_to='item_media/')),
                ('description', models.TextField(blank=True, null=True)),
                ('release_date', models.DateField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='SocialMedia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('social_media', models.CharField(max_length=255)),
                ('url', models.CharField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='UserSocialMedia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=255)),
                ('url', models.CharField(max_length=1000)),
                ('socialmedia', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.socialmedia')),
            ],
        ),
        migrations.CreateModel(
            name='OwnershipHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transfer_date', models.DateTimeField(auto_now_add=True)),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.item')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ModelType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('release_date', models.DateField(blank=True, null=True)),
                ('brand', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.brand')),
            ],
        ),
        migrations.AddField(
            model_name='item',
            name='media_files',
            field=models.ManyToManyField(to='api.mediafile'),
        ),
        migrations.AddField(
            model_name='item',
            name='model',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.modeltype'),
        ),
        migrations.AddField(
            model_name='item',
            name='previous_users',
            field=models.ManyToManyField(related_name='items_owned', through='api.OwnershipHistory', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='item',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='appteenyuser',
            name='social_media',
            field=models.ManyToManyField(blank=True, to='api.usersocialmedia'),
        ),
        migrations.AddField(
            model_name='appteenyuser',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions'),
        ),
    ]
