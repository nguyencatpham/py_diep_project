from django.contrib import admin
from django.urls import reverse
from .models import *
from . import views
from import_export.admin import ImportExportModelAdmin
# from rangefilter.filters import DateRangeFilter
# from mce_filebrowser.admin import MCEFilebrowserAdmin
from .forms import *

# Register your models here.
class MainMenuAdmin(admin.ModelAdmin):
    list_display = ('name', 'tag', 'has_child_article_menu')
admin.site.register(MainMenu, MainMenuAdmin)

class WebcontentAdmin(admin.ModelAdmin):
    list_display = ('web_title',)
admin.site.register(WebContent, WebcontentAdmin)

class PropertyRightAdmin(admin.ModelAdmin):
    list_display = ('title',)
admin.site.register(PropertyRight, PropertyRightAdmin)

class IngredientAdmin(admin.ModelAdmin):
    list_display = ('title', 'display_type', 'name', 'photo')
admin.site.register(Ingredient, IngredientAdmin)

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'created')
admin.site.register(Category, CategoryAdmin)

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'created')
    form = ArticleAdminForm
admin.site.register(Article, ArticleAdmin)

@admin.register(Product)
# class ProductAdmin(admin.ModelAdmin):
#     list_filter = (('created', DateRangeFilter),)
#     list_display = ('product_name', 'release_name', 'product_code', 'product_price', 'active_link', 'serial_no', 'created')
#     # If you would like to add a default range filter
#     # method pattern "get_rangefilter_{field_name}_default"
#     # def get_rangefilter_created_at_default(self, request):
#     #     return (datetime.date.today, datetime.date.today)
    
class ProductAdmin(ImportExportModelAdmin):
    list_display = ('product_name', 'release_name', 'product_price', 'serial_no', "scanned", 'created')
    search_fields = ["product_name", "release_name", "product_code", "product_price", "serial_no"]
    pass

admin.site.register(ReleaseProduct)

class YoutubeVideoAdmin(admin.ModelAdmin):
    list_display = ('title',)
admin.site.register(YoutubeVideo, YoutubeVideoAdmin)

class SlideAdmin(admin.ModelAdmin):
    list_display = ('title', 'photo' ,'photoURL')
admin.site.register(Slide, SlideAdmin)

class ReportAdmin(admin.ModelAdmin):
    list_display = ('name', 'url_as_link')
admin.site.register(Report, ReportAdmin)


# admin.site.register(Video)
