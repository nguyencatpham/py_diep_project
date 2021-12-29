from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name='home'),
    path('home', views.home, name='home'),
    path('index', views.index, name='index'),
    path('navbar', views.navbar, name='navbar'),
    path('base', views.base, name='base'),
    path('article/<str:pk>', views.article_detail, name='article'),
    path('backend/checkproductcode', views.checkProductCode, name='checkProductCode'),
    path('checkqrcode/<str:pk>', views.checkqrcode, name='article_checkqrcode'),
]

