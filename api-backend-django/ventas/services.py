import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import transaction
from .models import Ventas, Detalle_Venta, Pago, Estado_Entrega
from productos.models import Productos
from clientes.models import Clientes



def registrar_venta(data):

    with transaction.atomic():
        
        # crerar o buscar cliente
        cliente, created = Clientes.objects.get_or_create(
            name = data["nombre"],
            lastname = data["apellido"],
            phone = data["telefono"]
        )

        # crear pago
        metodo_pago = 'EF' if data["modoPago"] == "Efectivo" else 'TR'
        pago = Pago.objects.create(
            pay_method = metodo_pago,
            pay_status = 'PEN' # arranca pendiente
        )

        # crerar estaqdo de entrega
        estado_entrega = Estado_Entrega.objects.create(
            name='PEN' # tambien arranca pendiente
        )

        # crear la venta
        venta = Ventas.objects.create(
            customer = cliente,
            delivery_state = estado_entrega,
            pay = pago,
            total_mount = int(data["total"]),
            shipment = (data["modoEntrega"] == "En el Local")
        )

        # observaciones
        venta.observations = data["observaciones"]

        # crear el detalle de venta
         
        for item in data["carrito"]: 
            Detalle_Venta.objects.create(
                sale = venta,
                product_id = item["id"],
                quantity_product = item["quanty"]
            )

        return venta
