# Generated by Django 4.0 on 2022-01-03 15:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diep_website', '0040_remove_youtubevideo_youtube_content_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='youtubevideo',
            name='youtube_url',
        ),
        migrations.AddField(
            model_name='youtubevideo',
            name='youtube_embed_content',
            field=models.TextField(blank=True, null=True, verbose_name='Mã nhúng Youtube'),
        ),
    ]
