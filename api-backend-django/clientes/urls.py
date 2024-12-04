from django.urls import path, include
from rest_framework import routers
from clientes import views

router = routers.DefaultRouter()
router.register(r'clientes', views.ClientesView)
router.register(r'localidad', views.LocalidadView) 

urlpatterns = [
    path("api/v1/", include(router.urls))
]
