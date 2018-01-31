"""django_angular URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import *
from myapp import views

# from django.conf.urls import url
# from rest_framework_jwt.views import obtain_jwt_token
# from rest_framework_jwt.views import refresh_jwt_token
# from rest_framework_jwt.views import verify_jwt_token

urlpatterns = [
		url(r'^login/$', views.Login_user.as_view(), name='login'),
		url(r'^register/$', views.Register_user.as_view(), name='register'),
		url(r'^forgotpassword/$', views.forgot_password.as_view(), name='forgotpassword'),
		
		path('activate/<str:token>/', views.activate_class.as_view(), name='activate'),
        # url('auth-jwt/', obtain_jwt_token),
        # url('auth-jwt-refresh/', refresh_jwt_token),
        # url('auth-jwt-verify/', verify_jwt_token),
		path('admin/', admin.site.urls),
	    url('home/', views.home, name='home')
]

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     url('home/', views.home, name='home'),
#     url(r'^login/$', views.Login_user.as_view(), name='login')
# ]
