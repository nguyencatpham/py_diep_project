# Generated by Django 3.2.4 on 2021-12-25 01:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diep_website', '0002_auto_20211224_1307'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='title',
            field=models.CharField(max_length=500),
        ),
    ]
