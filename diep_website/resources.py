from import_export import resources
from .models import Product

class ProductResource(resources.ModelResource):
    fields = ('product_name', 'product_code', 'created')
    class Meta:
        model = Product