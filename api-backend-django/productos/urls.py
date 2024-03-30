from django.urls import path, include
from rest_framework import routers
from productos import views

router = routers.DefaultRouter()
router.register(r'productos', views.ProductosView, 'productos')

urlpatterns = [
    path("api/v1/", include(router.urls))
]