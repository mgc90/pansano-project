
from rest_framework import viewsets
from .serializer import ProductosSerializer, CategoriasSerializer
from .models import Productos, Categorias

# Create your views here.
class ProductosView(viewsets.ModelViewSet):
    serializer_class = ProductosSerializer
    queryset = Productos.objects.all()

class CategoriasView(viewsets.ModelViewSet):
    serializer_class = CategoriasSerializer
    queryset = Categorias.objects.all()