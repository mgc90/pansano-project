# Generated by Django 5.0.3 on 2024-12-05 02:35

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ventas', '0009_rename_total_amount_ventas_total_mount'),
    ]

    operations = [
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
            ],
        ),
        migrations.AlterField(
            model_name='ventas',
            name='delivery_state',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ventas_estado_entrega', to='ventas.estado_entrega'),
        ),
        migrations.AlterField(
            model_name='pago',
            name='pay_status',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ventas.estado_pago'),
        ),
        migrations.AlterField(
            model_name='pago',
            name='pay_method',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ventas.metodo_pago'),
        ),
    ]
