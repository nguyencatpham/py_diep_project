from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Product, Article
from django.http import HttpResponse
from .resources import ProductResource

def navbar(request):
    return render(request, 'navbar2.html')

def base(request):
    return render(request, 'base-2.html')
# Create your views here.
def index(request):
    return render(request, 'home-1.html')

# Create your views here.
def home(request):
    articles = Article.objects.all()
    return render(request, 'home.html', {"articles": articles})

def article_detail(request, pk):
    articleObj = Article.objects.get(id=pk)
    articles = Article.objects.all()
    return render(request, 'article-detail-new-2.html',{"article": articleObj, "articles": articles})
 
def checkqrcode(request, pk):
    productObj = Product.objects.get(product_code = pk)
    articleObj = Article.objects.get(id = productObj.article_id)
    if productObj:
        return render(request, 'article-detail-checkqrcode-new.html', {"product": productObj, "article": articleObj})
    else:
        return render(request, '404.html')

def checkProductCode(request):
    # request should be ajax and method should be GET.request.is_ajax and 
    if request.method == "GET":
        # get the nick name from the client side.
        check_what = request.GET.get("check_what", None)
        if check_what != None:
            # check for the nick name in the database.
            productObj = Product.objects.get(product_code = check_what)
            if productObj:
                # if nick_name found return not valid new friend
                return JsonResponse({"valid":True, "serial_no":productObj.serial_no}, status = 200)
            else:
                # if nick_name not found, then user can create a new friend.
                return JsonResponse({"valid":False}, status = 200)
        else:
            return render(request, '404.html')
    return render(request, '404.html')
    # return JsonResponse({}, status = 400)

def export(request):
    product_resource = ProductResource()
    dataset = product_resource.export()
    response = HttpResponse(dataset.xls, content_type='application/vnd.ms-excel')
    response['Content-Disposition'] = 'attachment; filename="product.xls"'
    return response

def page_not_found(request, exception):
    return render(request, '404.html')

def server_error(request):
    return render(request, '500.html')
