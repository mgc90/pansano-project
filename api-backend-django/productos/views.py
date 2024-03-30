
from rest_framework import viewsets
from .serializer import ProductosSerializer
from .models import Productos

# Create your views here.
class ProductosView(viewsets.ModelViewSet):
    serializer_class = ProductosSerializer
    queryset = Productos.objects.all()