from django.db import models
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

class Product(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)
    product_name = models.CharField(max_length=500, null=True, blank=True)
    product_code = models.CharField(max_length=200, null=False, blank=False)
    created = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.product_code
    
class Article(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    title = models.CharField(max_length=500, null=False, blank=False)
    body = models.TextField(max_length=100000, null=False, blank=False)
    article_image = models.ImageField(
        null=True, blank=True, default="default.jpg")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    @property
    def imageURL(self):
        try:
            url = self.article_image.url
        except:
            url = ''
        return url