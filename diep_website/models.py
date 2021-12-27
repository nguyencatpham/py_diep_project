from django.db import models
import random
from diep_project import settings
# from tinymce import models as tinymce_models
# from tinymce.models import HTMLField

import uuid

# Create your models here.
class Category(models.Model):
    class Meta:
        verbose_name_plural = "Categories"
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    name = models.CharField(max_length=500, null=False, blank=False)
    created = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name

# class Product(models.Model):
#     id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
#     category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)
#     product_code = models.CharField(max_length=200, null=True)
#     product_name = models.CharField(max_length=200, null=True)
#     created = models.DateTimeField(auto_now_add=True)

class Product(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    product_code = models.CharField(max_length=100, null=True, blank=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)
    product_name = models.CharField(max_length=500, null=True, blank=True)
    release_name = models.CharField(max_length=500, null=True, blank=True)
    product_price = models.FloatField(null=True, blank=True)
    active_link = models.CharField(max_length=500, null=True, blank=True)
    serial_no = models.CharField(max_length=9, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.product_name
    
class Article(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=500, null=False, blank=False)
    # body = models.TextField(max_length=100000, null=False, blank=False)
    # body = HTMLField()
    body = models.TextField()
    # article_image = models.ImageField(
    #     null=True, blank=True, default="default.jpg")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    # @property
    # def imageURL(self):
    #     try:
    #         url = self.article_image.url
    #     except:
    #         url = ''
    #     return url

#HM-000000
class ReleaseProduct(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=100)
    product_quantity = models.IntegerField()
    price = models.FloatField()
    domain_name = models.CharField(max_length=500, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    
    def save(self, *args, **kwargs):
        for x in range(self.product_quantity):
            productObj = Product()
            product_code = uuid.uuid4().hex
            productObj.product_code = product_code
            productObj.release_name = self.name
            productObj.category = self.category
            productObj.product_name = self.category.name
            productObj.product_price = self.price
            productObj.serial_no = 'HM-' + f'{random.randrange(1, 999999):06}'
            productObj.active_link = self.domain_name + '/checkqrcode/' + product_code
            productObj.created = self.created
            productObj.save()
    
    class Meta:
        verbose_name_plural = "Release Products"
