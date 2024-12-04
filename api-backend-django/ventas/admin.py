from django.contrib import admin
from .models import Metodo_Pago, Estado_Pago, Pago, Estado_Entrega, Ventas, Detalle_Venta

# Register your models here.
admin.site.register(Metodo_Pago)
admin.site.register(Estado_Pago)
admin.site.register(Pago)
admin.site.register(Estado_Entrega)
admin.site.register(Ventas)
admin.site.register(Detalle_Venta)