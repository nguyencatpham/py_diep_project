from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name='home'),
    path('home', views.home, name='home'),
    path('report', views.report, name='report'),
    path('article/<str:pk>', views.article_detail, name='article'),
    path('backend/checkproductcode', views.checkProductCode, name='checkProductCode'),
    path('backend/orderProduct', views.orderProduct, name='orderProduct'),
    path('checkqrcode/<str:pk>', views.checkqrcode, name='article_checkqrcode'),
]

