from django.contrib import admin
from .models import *
from import_export.admin import ImportExportModelAdmin
# from rangefilter.filters import DateRangeFilter
# from mce_filebrowser.admin import MCEFilebrowserAdmin
from .forms import *

# Register your models here.
class MainMenuAdmin(admin.ModelAdmin):
    list_display = ('name', 'tag', 'has_child_article_menu')
admin.site.register(MainMenu, MainMenuAdmin)

admin.site.register(WebContent)
admin.site.register(Category)

class ArticleAdmin(admin.ModelAdmin):
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
    list_display = ('product_name', 'release_name', 'product_price', 'active_link', 'serial_no', 'created')
    search_fields = ["product_name", "release_name", "product_code", "product_price", "serial_no"]
    pass

admin.site.register(ReleaseProduct)
admin.site.register(YoutubeVideo)
admin.site.register(Slide)
# admin.site.register(Video)
