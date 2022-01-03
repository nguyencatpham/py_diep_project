from django.db import models
import random
import secrets
from diep_project import settings
# from tinymce import models as tinymce_models
# from tinymce.models import HTMLField
# from embed_video.fields import EmbedVideoField
import uuid

class MainMenu(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    name = models.CharField(max_length=100, null=False, blank=False, verbose_name="Tên Menu")
    tag = models.CharField(max_length=100, null=True, blank=True, verbose_name="Menu Tag")
    def __str__(self):
        return self.name
    class Meta:
        verbose_name_plural = "Menu (Tiêu đề)"

class WebContent(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    web_title = models.CharField(max_length=20, null=False, blank=False, verbose_name="Tiêu đề trang web")
    phone_number = models.CharField(max_length=20, null=False, blank=False, verbose_name="Số điện thoại")
    company_name = models.CharField(max_length=500, null=False, blank=False, verbose_name="Tên công ty")
    address = models.CharField(max_length=500, null=False, blank=False, verbose_name="Địa chỉ")
    email = models.CharField(max_length=500, null=False, blank=False, verbose_name="Email")
    site_name = models.CharField(max_length=500, null=False, blank=False, verbose_name="Tên website")
    copy_right = models.CharField(max_length=20, null=False, blank=False, verbose_name="Tên copyright")
    
    def __str__(self):
        return self.web_title
    class Meta:
        verbose_name_plural = "Nội Dung Trang Web"

# Create your models here.
class Category(models.Model):
    class Meta:
        verbose_name_plural = "Danh Mục Sản Phẩm"
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    name = models.CharField(max_length=500, null=False, blank=False, verbose_name="Tên danh mục")
    created = models.DateTimeField(auto_now_add=True, verbose_name="Thời gian tạo")
    def __str__(self):
        return self.name
    class Meta:
        verbose_name_plural = "Danh Mục"


class Article(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True, verbose_name="Danh mục")
    title = models.CharField(max_length=500, null=False, blank=False, verbose_name="Tiêu đề")
    body = models.TextField(verbose_name="Nội dung")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.title
    class Meta:
        verbose_name_plural = "Bài Viết"

class Product(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    product_code = models.CharField(max_length=100, null=True, blank=False, editable=False, verbose_name="Mã sản phẩm")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True, verbose_name="Danh mục")
    article_id = models.CharField(max_length=500, null=True, blank=True, editable=False, verbose_name="Mã bài viết")
    product_name = models.CharField(max_length=500, null=True, blank=True, verbose_name="Tên sản phẩm")
    release_name = models.CharField(max_length=500, null=True, blank=True, verbose_name="Ngày phát hành")
    product_price = models.FloatField(null=True, blank=True, verbose_name="Giá")
    active_link = models.CharField(max_length=500, null=True, blank=True, editable=False, verbose_name="QRCode link")
    serial_no = models.CharField(max_length=9, null=True, blank=True, editable=False)
    created = models.DateTimeField(auto_now_add=True, verbose_name="Ngày tạo")
    def __str__(self):
        return self.product_name
    class Meta:
        verbose_name_plural = "Sản Phẩm"

#HM-000000
class ReleaseProduct(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    # category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, null=True, blank=True, verbose_name="Bài viết")
    name = models.CharField(max_length=100, verbose_name="Tên")
    product_quantity = models.IntegerField(verbose_name="Số lượng sản phẩm")
    price = models.FloatField(verbose_name="Giá")
    domain_name = models.CharField(max_length=500, null=True, blank=True, verbose_name="Tên website")
    created = models.DateTimeField(auto_now_add=True, verbose_name="Ngày tạo")
    
    def __str__(self):
        return self.article.name + ' - ' + self.name
    
    def save(self, *args, **kwargs):
        cateObj = Category.objects.get(id = self.article.category.id)
        for x in range(self.product_quantity):
            productObj = Product()
            product_code = secrets.token_urlsafe() + secrets.token_urlsafe()
            productObj.product_code = product_code
            productObj.release_name = self.name
            productObj.category = cateObj
            productObj.article_id = self.article.id
            productObj.product_name = cateObj.name
            productObj.product_price = self.price
            productObj.serial_no = 'HM-' + f'{random.randrange(1, 999999):06}'
            productObj.active_link = self.domain_name + '/checkqrcode/' + product_code
            productObj.created = self.created
            productObj.save()
        super(ReleaseProduct, self).save(*args, **kwargs)
    
    class Meta:
        verbose_name_plural = "Tạo (Phát hành) Sản Phẩm"

# class Video(models.Model):
#     title = models.CharField(max_length=200)
#     url = EmbedVideoField()
#     def __str__(self):
#         return self.title
    