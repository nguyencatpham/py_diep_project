from django.contrib import admin
from .models import *
from import_export.admin import ImportExportModelAdmin
from rangefilter.filters import DateRangeFilter
# from mce_filebrowser.admin import MCEFilebrowserAdmin
from .forms import *

# Register your models here.

class ProductInline(admin.StackedInline):
    model = Product
@admin.register(Category)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "created")
    inlines = [ProductInline]
    
# admin.site.register(Category)
# @admin.register(Article)
# class ArticleAdmin(MCEFilebrowserAdmin):
#     pass
class ArticleAdmin(admin.ModelAdmin):
    form = ArticleAdminForm
admin.site.register(Article, ArticleAdmin)

# admin.site.register(Article)
# @admin.register(Article)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_filter = (('created', DateRangeFilter),)
    list_display = ("product_name", "product_code", "created")
    # If you would like to add a default range filter
    # method pattern "get_rangefilter_{field_name}_default"
    def get_rangefilter_created_at_default(self, request):
        return (datetime.date.today, datetime.date.today)
    
class ProductAdmin(ImportExportModelAdmin):
#     list_display = ("product_name", "product_code", "created")
#     search_fields = ['product_name', 'product_code']
    pass

admin.site.register(ReleaseLabel)
admin.site.register(Label)
