# Generated by Django 4.2.7 on 2023-11-02 14:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_rename_item_items'),
    ]

    operations = [
        migrations.RenameField(
            model_name='items',
            old_name='model',
            new_name='modeltype',
        ),
    ]
