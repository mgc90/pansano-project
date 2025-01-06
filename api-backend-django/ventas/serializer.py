from rest_framework import serializers
from .models import Pago, Estado_Entrega, Ventas, Detalle_Venta
from productos.models import Productos
from clientes.models import Clientes
from productos.serializer import ProductosSerializer

class DetalleVentasSerializer(serializers.ModelSerializer):
    product = serializers.StringRelatedField()
    quantity_product = serializers.IntegerField()
    class Meta:
        model = Detalle_Venta
        fields = ['product', 'quantity_product']

class PagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pago
        fields = ['pay_method', 'pay_status', 'payed_date']

class EstadoEntregaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estado_Entrega
        fields = ['name']

class VentasSerializer(serializers.ModelSerializer):
    detalle = DetalleVentasSerializer(many=True)
    pay = PagoSerializer(read_only=True)
    delivery_state = EstadoEntregaSerializer(read_only=True)
    customer = serializers.StringRelatedField()
    
    class Meta:
        model = Ventas
        fields = ['id', 'customer', 'detalle', 'delivery_state', 'pay', 'total_mount', 'created_date', 'observations']