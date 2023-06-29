from django.db import models

# Create your models here.
class Image(models.Model):
    image = models.FileField(upload_to='images/' , null=True , blank=True )
    colors = models.JSONField(null=True, blank=True)

    # def __str__(self):
    #     return self.title
