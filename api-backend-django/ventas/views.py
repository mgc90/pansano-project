from django.http import JsonResponse
import json
from .services import registrar_venta
from rest_framework.decorators import api_view
from .models import Ventas
from .serializer import VentasSerializer
from rest_framework import viewsets


class VentasView(viewsets.ModelViewSet):
    queryset = Ventas.objects.all()
    serializer_class = VentasSerializer


@api_view(['POST'])
def registrar_venta_view(request):
    
    if request.method == 'POST':
        data = request.data
        try:
            
            venta = registrar_venta(data)

            return JsonResponse({"mensaje": "Venta registrada con éxito", "venta_id": venta.id}, status=201)
        
        except Exception as e: 

            return JsonResponse({"error": str(e)}, status=400)
        
    

