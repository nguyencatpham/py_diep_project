# Generated by Django 4.0 on 2021-12-27 14:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('diep_website', '0021_article_category_product_release_name'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='releaseproduct',
            options={'verbose_name_plural': 'Release Products'},
        ),
        migrations.RemoveField(
            model_name='product',
            name='active_link',
        ),
    ]
