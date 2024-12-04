from rest_framework import viewsets
from .serializer import ClientesSerializer, LocalidadSerializer
from .models import Clientes, Localidad

# Create your views here.
class ClientesView(viewsets.ModelViewSet):
    serializer_class = ClientesSerializer
    queryset = Clientes.objects.all()

class LocalidadView(viewsets.ModelViewSet):
    serializer_class = LocalidadSerializer
    queryset = Localidad.objects.all()