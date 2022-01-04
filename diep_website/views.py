from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import *
from django.http import HttpResponse
from .resources import ProductResource

# Create your views here.
def home(request):
    articles = Article.objects.all()
    main_menus = MainMenu.objects.all()
    webcontent = WebContent.objects.all()[0]
    property_right = PropertyRight.objects.all()[0]
    video = YoutubeVideo.objects.all()[0]
    slides = Slide.objects.all()
    context = {"articles": articles,
               "webcontent": webcontent,
               "property_right": property_right,
               "main_menus": main_menus,
               "video": video,
               "slides": slides,
               }
    return render(request, 'home.html', context)

def article_detail(request, pk):
    articleObj = Article.objects.get(id=pk)
    articles = Article.objects.all()
    webcontent = WebContent.objects.all()[0]
    main_menus = MainMenu.objects.all()
    context = {"article": articleObj,
               "articles": articles,
               "webcontent": webcontent,
               "main_menus": main_menus,
               }
    return render(request, 'article-detail.html', context)
 
def checkqrcode(request, pk):
    productObj = Product.objects.get(product_code = pk)
    if productObj:
        productObj.scanned = True
        productObj.save()
        articleObj = Article.objects.get(id = productObj.article_id)
        articles = Article.objects.all()
        return render(request, 'article-detail-checkqrcode.html', {"product": productObj, "article": articleObj, "articles": articles})
    else:
        return render(request, '404.html')

def checkProductCode(request):
    if request.method == "GET":
        check_what = request.GET.get("check_what", None)
        if check_what != None:
            if Product.objects.filter(product_code = check_what).exists():
                productObj = Product.objects.get(product_code = check_what)
                return JsonResponse({"valid":True, "serial_no":productObj.serial_no}, status = 200)
            else:
                return JsonResponse({"valid":False}, status = 200)
        else:
            return render(request, '404.html')
    return render(request, '404.html')

def report(request):
    reports = []
    for category in Category.objects.all():
        cate_name = category.name
        products = Product.objects.filter(category=category)
        products_scanned = products.filter(scanned=True)
        # total_product = len(products)
        total_product = 1000000
        total_product_scanned = len(products_scanned)
        row = {
            "cate_name": cate_name,
            "total_product": total_product,
            "total_product_scanned": total_product_scanned
        }
        reports.append(row)
    context = {"reports":reports}
    return render(request, 'report.html', context)

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
