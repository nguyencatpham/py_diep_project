# Generated by Django 4.0 on 2022-01-03 17:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('diep_website', '0046_rename_image_slide_photo'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='mainmenu',
            options={'verbose_name_plural': '01. Menu (Tiêu đề)'},
        ),
        migrations.AlterModelOptions(
            name='webcontent',
            options={'verbose_name_plural': '02. Nội Dung Trang Web'},
        ),
    ]
