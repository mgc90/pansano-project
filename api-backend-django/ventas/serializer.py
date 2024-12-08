from rest_framework import serializers
from .models import Pago, Estado_Entrega, Ventas, Detalle_Venta

#class MetodoPagoSerializer(serializers.ModelSerializer):
 #   class Meta:
  #      model = Metodo_Pago
   #     fields = '__all__'

#class EstadoPagoSerializer(serializers.ModelSerializer):
 #   class Meta:
  #      model = Estado_Pago
   #     fields = '__all__'

class PagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pago
        fields = '__all__'

class EstadoEntregaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estado_Entrega
        fields = '__all__'

class VentasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ventas
        fields = '__all__'

class DetalleVentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detalle_Venta
        fields = '__all__'