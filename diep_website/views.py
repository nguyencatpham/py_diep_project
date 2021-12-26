from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Product, Article

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


def page_not_found(request, exception):
    return render(request, '404.html')

def server_error(request):
    return render(request, '500.html')
