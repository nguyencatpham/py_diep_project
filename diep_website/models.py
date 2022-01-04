from django.db import models
import random
import secrets
# from tinymce import models as tinymce_models
# from tinymce.models import HTMLField
# from embed_video.fields import EmbedVideoField
import uuid
from django.utils.safestring import mark_safe

class MainMenu(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    name = models.CharField(max_length=100, null=False, blank=False, verbose_name="Tên Menu")
    tag = models.CharField(max_length=100, null=True, blank=True, verbose_name="Menu Tag")
    has_child_article_menu = models.BooleanField(default=False, verbose_name="Có chứa menu bài viết")
    def __str__(self):
        return self.name
    class Meta:
        verbose_name_plural = "01. Menu (Tiêu đề)"

class WebContent(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    # web info
    web_title = models.CharField(max_length=200, null=False, blank=False, verbose_name="Tiêu đề trang web")
    phone_number = models.CharField(max_length=20, null=False, blank=False, verbose_name="Số điện thoại")
    company_name = models.CharField(max_length=500, null=False, blank=False, verbose_name="Tên công ty")
    address = models.TextField(max_length=500, null=False, blank=False, verbose_name="Địa chỉ")
    email = models.CharField(max_length=500, null=False, blank=False, verbose_name="Email")
    site_name = models.CharField(max_length=500, null=False, blank=False, verbose_name="Tên website")
    copy_right = models.CharField(max_length=200, null=False, blank=False, verbose_name="Tên copyright")
    
    # vertical content
    banner_1 = models.CharField(max_length=200, null=True, blank=True, verbose_name="Nội dung banner 1")
    banner_2 = models.CharField(max_length=200, null=True, blank=True, verbose_name="Nội dung banner 2")
    banner_3 = models.CharField(max_length=200, null=True, blank=True, verbose_name="Nội dung banner 3")
    banner_photo = models.ImageField(upload_to="home_photos",null=True, blank=True, verbose_name="Hình ảnh banner chính")
    
    counterfeiting = models.TextField(max_length=500, null=True, blank=True, verbose_name="Nội dung chống hàng giả")
    counterfeiting_photo = models.ImageField(upload_to="home_photos",null=True, blank=True, verbose_name="Hình ảnh chống hàng giả")
    
    video_photo = models.ImageField(upload_to="home_photos",null=True, blank=True, verbose_name="Hình ảnh video")
    
    
    def __str__(self):
        return self.web_title
    class Meta:
        verbose_name_plural = "02. Nội Dung Trang Web"

class PropertyRight(models.Model):
    photo_top_left = models.ImageField(upload_to="property_right",null=True, blank=True, verbose_name="Hình ảnh (trên - trái)", default="default.jpg")
    photo_top_right = models.ImageField(upload_to="property_right",null=True, blank=True, verbose_name="Hình ảnh (trên - phải)", default="default.jpg")
    
    title = models.CharField(max_length=200, null=True, blank=True, verbose_name="Tiêu đề (Nguồn gốc sản phẩm)")
    
    content = models.TextField(max_length=700, null=True, blank=True, verbose_name="Nội dung (Nguồn gốc sản phẩm)")
    photo_main = models.ImageField(upload_to="property_right",null=True, blank=True, verbose_name="Hình ảnh chính")
    
    title_1 = models.CharField(max_length=200, null=True, blank=True, verbose_name="Tiêu đề (Nguồn gốc sản phẩm) (1)")
    content_1 = models.TextField(max_length=700, null=True, blank=True, verbose_name="Nội dung (Nguồn gốc sản phẩm) (1)")
    photo_main_1 = models.ImageField(upload_to="property_right",null=True, blank=True, verbose_name="Hình ảnh chính (1)")
    
    def __str__(self):
        return self.title
    class Meta:
        verbose_name_plural = "03. Nguồn gốc sản phẩm"

# Create your models here.
class Category(models.Model):
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
    release_name = models.CharField(max_length=500, null=True, blank=True, verbose_name="Tên (Đợt phát hành)")
    product_price = models.FloatField(null=True, blank=True, verbose_name="Giá")
    active_link = models.CharField(max_length=500, null=True, blank=True, editable=False, verbose_name="QRCode link")
    serial_no = models.CharField(max_length=9, null=True, blank=True, editable=False)
    scanned = models.BooleanField(default=False, verbose_name="Đã Scan")
    created = models.DateTimeField(auto_now_add=True, verbose_name="Ngày tạo")
    updated = models.DateTimeField(auto_now=True, auto_now_add=False, verbose_name="Ngày cập nhật")
    def __str__(self):
        return self.product_name
    class Meta:
        verbose_name_plural = "Sản Phẩm"

#HM-000000
class ReleaseProduct(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    # category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, null=True, blank=True, verbose_name="Bài viết")
    name = models.CharField(max_length=100, verbose_name="Tên (Đợt phát hành)")
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

class YoutubeVideo(models.Model):
    title = models.CharField(max_length=200, verbose_name="Tiêu đề")
    youtube_embed_content = models.TextField(null=True, blank=True, verbose_name="Mã nhúng Youtube")
    def __str__(self):
        return self.title
    class Meta:
        verbose_name_plural = "Video Youtube"
        
class Slide(models.Model):
    title = models.CharField(max_length=100, verbose_name="Tiêu đề (chung)")
    photo = models.ImageField(upload_to="slide",null=True, blank=True, verbose_name="Hình ảnh slide")
    @property
    def photoURL(self):
        try:
            url = self.photo.url
        except:
            url = ''
        return url
    
    def __str__(self):
        return self.title
    class Meta:
        verbose_name_plural = "Slide hình ảnh"

class Report(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True ,verbose_name="Báo cáo")
    report_link = models.URLField(max_length=500, null=True, blank=True, verbose_name="link")
    
    def url_as_link(self):
        return mark_safe('<a href="%s" target="_blank">Click vào link để xem báo cáo</a>' % (self.report_link))
    url_as_link.allow_tags = True
    
    def __str__(self):
        return self.name
    class Meta:
        verbose_name_plural = "99. Xem báo cáo"
    