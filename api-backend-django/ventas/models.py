from django.db import models
from productos.models import Productos
from clientes.models import Clientes

# Create your models here.

#class Metodo_Pago(models.Model):
 #   name_method = models.CharField(max_length=30)
  ##     return self.name_method

#class Estado_Pago(models.Model):
 #   name_state = models.CharField(max_length=30)
  #  def __str__(self):
   #     return self.name_state

class Pago(models.Model):
    METODO_CHOICES = [
        ('EF', 'Efectivo'),
        ('TR', 'Transferencia'),
    ]
    ESTADO_CHOICES = [
        ('PAG', 'Pagado'),
        ('PEN', 'Pendiente'),
        ('CAN', 'Cancelado')
    ]
    pay_method = models.CharField(max_length=2, choices=METODO_CHOICES)
    pay_status = models.CharField(max_length=3, choices=ESTADO_CHOICES)
    payed_date = models.DateTimeField(auto_now_add=False, null=True)
    def __str__(self):
        return self.pay_status
    

class Estado_Entrega(models.Model):
    ESTADO_ENTREGA_CHOICES = [
        ('PEN', 'Pendiente'),
        ('PRO', 'En proceso'),
        ('ENT', 'Entregado'),
        ('CAN', 'Cancelado'),
    ]
    name = models.CharField(
        max_length=3,
        choices=ESTADO_ENTREGA_CHOICES,
        default='PEN'
    )
    def __str__(self):
        return self.name

class Ventas(models.Model):
    customer =  models.OneToOneField(
        Clientes, 
        null=True, 
        on_delete=models.CASCADE,
        related_name='ventas_cliente'
        )
    delivery_state =  models.ForeignKey(
        Estado_Entrega, 
        null=True, 
        on_delete=models.CASCADE,
        related_name='ventas_estado_entrega'
        )
    pay =  models.OneToOneField(
        Pago, 
        null=True, 
        on_delete=models.CASCADE,
        related_name='ventas_pago'
        )
    total_mount = models.IntegerField(default=0)
    created_date = models.DateTimeField(auto_now_add=True, null=False)
    delivered_date = models.DateTimeField(auto_now_add=False, null=True)
    shipment = models.BooleanField(blank=False, default=False)
    def __str__(self):
        return f"Venta #{self.id} - Cliente: {self.customer}"

class Detalle_Venta(models.Model):
    sale = models.ForeignKey(
        Ventas, 
        on_delete=models.CASCADE,
        related_name='detalle',
        null=True
    )
    product = models.ForeignKey(
        Productos, 
        null=True, 
        on_delete=models.CASCADE
        )
    quantity_product = models.IntegerField(default=1)
    def __str__(self):
        return f"Detalle de Venta #{self.sale}"