from django.db import models

# Create your models here.

class Productos(models.Model):
    id = models.IntegerField
    name = models.CharField(max_length=200)
    price = models.IntegerField(default=0)
    img = models.CharField(max_length=200) #models.FileField(upload_to="imgs")
    quanty = models.IntegerField(default=1)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name
    