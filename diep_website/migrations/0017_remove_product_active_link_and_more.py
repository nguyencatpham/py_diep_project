# Generated by Django 4.0 on 2021-12-27 13:56

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('diep_website', '0016_alter_releaseproduct_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='active_link',
        ),
        migrations.RemoveField(
            model_name='product',
            name='product_price',
        ),
        migrations.RemoveField(
            model_name='product',
            name='serial_no',
        ),
        migrations.AlterField(
            model_name='product',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='product',
            name='product_code',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='product_name',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='releaseproduct',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True),
        ),
        migrations.CreateModel(
            name='ProductNew',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('product_code', models.CharField(max_length=100)),
                ('product_name', models.CharField(blank=True, max_length=500, null=True)),
                ('product_price', models.FloatField(blank=True, null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('active_link', models.CharField(blank=True, max_length=100, null=True)),
                ('serial_no', models.CharField(blank=True, max_length=10, null=True)),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='diep_website.category')),
            ],
        ),
    ]
