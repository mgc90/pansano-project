# Generated by Django 5.0.3 on 2024-03-28 22:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='productos',
            name='description',
            field=models.TextField(blank=True),
        ),
    ]
