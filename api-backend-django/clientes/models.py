from django.db import models

# Create your models here.

class Localidad(models.Model):
    name = models.CharField(max_length=30)

class Clientes(models.Model):
    name = models.CharField(max_length=30)
    lastname = models.CharField(max_length=30)
    phone = models.CharField(max_length=20)
    adress = models.CharField(max_length=100)
    ubication = models.CharField(max_length=500)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=128)

    def __str__(self):
        return f"{self.name} {self.lastname}"