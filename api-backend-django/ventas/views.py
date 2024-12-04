from rest_framework import viewsets
from .serializer import VentasSerializer, DetalleVentaSerializer, PagoSerializer, EstadoEntregaSerializer, EstadoPagoSerializer, MetodoPagoSerializer
from .models import Ventas, Detalle_Venta, Pago, Estado_Pago, Estado_Entrega, Estado_Pago, Metodo_Pago

# Create your views here.
class VentasView(viewsets.ModelViewSet):
    serializer_class = VentasSerializer
    queryset = Ventas.objects.all()

class DetalleVentaView(viewsets.ModelViewSet):
    serializer_class = DetalleVentaSerializer
    queryset = Detalle_Venta.objects.all()

class PagoView(viewsets.ModelViewSet):
    serializer_class = PagoSerializer
    queryset = Pago.objects.all()

class EstadoEntregaView(viewsets.ModelViewSet):
    serializer_class = EstadoEntregaSerializer
    queryset = Estado_Entrega.objects.all()

class EstadoPagoView(viewsets.ModelViewSet):
    serializer_class = EstadoPagoSerializer
    queryset = Estado_Pago.objects.all()

class MetodoPagoView(viewsets.ModelViewSet):
    serializer_class = MetodoPagoSerializer
    queryset = Metodo_Pago.objects.all()