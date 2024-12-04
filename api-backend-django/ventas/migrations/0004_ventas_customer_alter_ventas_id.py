# Generated by Django 5.0.3 on 2024-12-01 19:11

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0001_initial'),
        ('ventas', '0003_remove_ventas_customer_alter_ventas_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='ventas',
            name='customer',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ventas_cliente', to='clientes.clientes'),
        ),
        migrations.AlterField(
            model_name='ventas',
            name='id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]
