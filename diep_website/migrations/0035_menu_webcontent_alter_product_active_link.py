# Generated by Django 4.0 on 2022-01-03 08:02

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('diep_website', '0034_alter_article_options_alter_category_options_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Menu',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=500, verbose_name='Tên Menu')),
            ],
            options={
                'verbose_name_plural': 'Menu (Tiêu đề)',
            },
        ),
        migrations.CreateModel(
            name='WebContent',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('web_title', models.CharField(max_length=20, verbose_name='Tiêu đề trang web')),
                ('phone_number', models.CharField(max_length=20, verbose_name='Số điện thoại')),
                ('company_name', models.CharField(max_length=500, verbose_name='Tên công ty')),
                ('address', models.CharField(max_length=500, verbose_name='Địa chỉ')),
                ('email', models.CharField(max_length=500, verbose_name='Email')),
                ('site_name', models.CharField(max_length=500, verbose_name='Tên website')),
                ('copy_right', models.CharField(max_length=20, verbose_name='Tên copyright')),
            ],
            options={
                'verbose_name_plural': 'Nội Dung Trang Web',
            },
        ),
        migrations.AlterField(
            model_name='product',
            name='active_link',
            field=models.CharField(blank=True, editable=False, max_length=500, null=True, verbose_name='QRCode link'),
        ),
    ]
