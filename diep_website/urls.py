from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name='home'),
    path('home', views.home, name='home'),
    path('article/<str:pk>', views.article_detail, name='article'),
    path('backend/checkproductcode', views.checkProductCode, name='checkProductCode')
]

