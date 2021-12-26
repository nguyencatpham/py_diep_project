from django.contrib import admin
from .models import Category, Product, Article
from import_export.admin import ImportExportModelAdmin
from .forms import *


# Register your models here.

admin.site.register(Category)

class ArticleAdmin(admin.ModelAdmin):
    form = ArticleAdminForm
admin.site.register(Article)

@admin.register(Product)
class ProductAdmin(ImportExportModelAdmin):
    list_display = ("product_name", "product_code", "created")
    pass