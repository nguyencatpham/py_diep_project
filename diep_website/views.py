from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Product, Article

from django.http import HttpResponse
from .resources import ProductResource

# Create your views here.
def home(request):
    articles = Article.objects.all()
    return render(request, 'home.html', {"articles": articles})

def article_detail(request, pk):
    articleObj = Article.objects.get(id=pk)
    return render(request, 'article-detail.html',{"article": articleObj})
    

def checkProductCode(request):
    # request should be ajax and method should be GET.request.is_ajax and 
    if request.method == "GET":
        # get the nick name from the client side.
        check_what = request.GET.get("check_what", None)
        # check for the nick name in the database.
        if Product.objects.filter(product_code = check_what).exists():
            # if nick_name found return not valid new friend
            return JsonResponse({"valid":True}, status = 200)
        else:
            # if nick_name not found, then user can create a new friend.
            return JsonResponse({"valid":False}, status = 200)

    return JsonResponse({}, status = 400)
    # return render(request, '404.html')
    # return redirect('/home')

def export(request):
    product_resource = ProductResource()
    dataset = product_resource.export()
    #response = HttpResponse(dataset.csv, content_type='text/csv')
    #response['Content-Disposition'] = 'attachment; filename="member.csv"'
    #response = HttpResponse(dataset.json, content_type='application/json')
    #response['Content-Disposition'] = 'attachment; filename="persons.json"'
    response = HttpResponse(dataset.xls, content_type='application/vnd.ms-excel')
    response['Content-Disposition'] = 'attachment; filename="product.xls"'
    return response

def page_not_found(request, exception):
    return render(request, '404.html')

def server_error(request):
    return render(request, '500.html')
