# Generated by Django 4.2.7 on 2023-11-13 18:02

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_appteenyuser_activation_key_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='ownershiphistory',
            name='owner_date',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2023, 11, 13, 18, 2, 24, 734638, tzinfo=datetime.timezone.utc)),
            preserve_default=False,
        ),
    ]