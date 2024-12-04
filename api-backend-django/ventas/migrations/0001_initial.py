# Generated by Django 5.0.3 on 2024-12-01 04:04

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('clientes', '0001_initial'),
        ('productos', '0016_alter_productos_description'),
    ]

    operations = [
        migrations.CreateModel(
            name='Estado_Entrega',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Estado_Pago',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name_state', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Metodo_Pago',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name_method', models.CharField(max_length=30)),
                ('company', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Ventas',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('delivered_date', models.DateTimeField(null=True)),
                ('shipment', models.BooleanField(default=False)),
                ('cliente', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='clientes.clientes')),
                ('estado_entrega', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ventas_estado_entrega', to='ventas.estado_entrega')),
                ('pago', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ventas_pago', to='ventas.estado_entrega')),
            ],
        ),
        migrations.CreateModel(
            name='Pago',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('payed_date', models.DateTimeField(null=True)),
                ('pay_method', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ventas.metodo_pago')),
                ('pay_status', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ventas.estado_pago')),
            ],
        ),
        migrations.CreateModel(
            name='Detalle_Venta',
            fields=[
                ('id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='ventas.ventas')),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='productos.productos')),
            ],
        ),
    ]
