# Generated by Django 4.0 on 2021-12-27 14:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('diep_website', '0020_product_active_link_product_product_price_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='diep_website.category'),
        ),
        migrations.AddField(
            model_name='product',
            name='release_name',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
