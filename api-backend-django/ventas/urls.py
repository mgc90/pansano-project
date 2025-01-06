from django.urls import path, include
from rest_framework import routers
from .views import VentasView, registrar_venta_view

router = routers.DefaultRouter()
router.register(r'ventas', VentasView)
#router.register(r'detalle_venta', views.DetalleVentaView)
#router.register(r'pago', views.PagoView)
#router.register(r'estado_entrega', views.EstadoEntregaView)
#router.register(r'estado_pago', views.EstadoPagoView)
#router.register(r'metodo_pago', views.MetodoPagoView)


urlpatterns = [
    path("api/v1/ventas/", include(router.urls)),
    path("api/v1/procesar_venta/", registrar_venta_view, name='procesar_venta')
]