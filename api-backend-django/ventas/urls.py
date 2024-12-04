from django.urls import path, include
from rest_framework import routers
from ventas import views

router = routers.DefaultRouter()
router.register(r'ventas', views.VentasView)
router.register(r'detalle_venta', views.DetalleVentaView)
router.register(r'pago', views.PagoView)
router.register(r'estado_entrega', views.EstadoEntregaView)
router.register(r'estado_pago', views.EstadoPagoView)
router.register(r'metodo_pago', views.MetodoPagoView)

urlpatterns = [
    path("api/v1/", include(router.urls))
]