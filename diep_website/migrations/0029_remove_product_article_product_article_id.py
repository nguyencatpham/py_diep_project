# Generated by Django 4.0 on 2021-12-28 06:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diep_website', '0028_remove_releaseproduct_category_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='article',
        ),
        migrations.AddField(
            model_name='product',
            name='article_id',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
