from django.shortcuts import render, redirect
from django.contrib.sites.shortcuts import get_current_site
from django.conf import settings
import jwt,json
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.contrib.auth import authenticate
import jwt
import hmac, hashlib, base64, urllib
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from .tokens import account_activation_token
from django.core.mail import EmailMessage
from django.utils.encoding import force_bytes, force_text
from django.template.loader import render_to_string


# import datetime
# Create your views here.
def home(req):
	return render(req, 'main.html', {'STATIC_URL': settings.STATIC_URL})

class Login_user(APIView):
	def post(self, request, *args, **kwargs):
		response_data = {}
		response_data['token'] = '';
		if not request.data:
			return Response({'Error': "Please provide username/password"}, status="400")

		username = request.data['username']
		password = request.data['password']
		print("username and password = ",username, " ", password)
		try:
			user = authenticate(username=username, password=password)
			print("in try case user = ",user)
		except User.DoesNotExist:
			return Response({'Error': "Invalid username/password"}, status="400")

		if user:
			payload = {'username':username, 'password' : password}
			jwt_token = jwt.encode(payload, 'SECRET_KEY', 'HS256')
			print("jwt token = ",jwt_token)
			return JsonResponse({'token': jwt_token.decode('utf-8')})
		else:
			return Response(
				json.dumps({'Error': "Invalid credentials"}),
				status=400,
				content_type="application/json"
			)

class Register_user(APIView):
	def post(self, request, *args, **kwargs):
		response_data = {}
		username = request.data['username']
		password = request.data['password']
		email     = request.data['email']
		user = User.objects.create_user(username, email, password)
		if user:
			payload = {'username':username}
			jwt_token = jwt.encode(payload, 'SECRET_KEY', 'HS256')
			user.is_active = False
			user.save()
			current_site = get_current_site(request)
			mail_subject = 'Activate your account.'
			message ="Hi plese click on this link to validate your email id and then your registration will be done. "+ 'http://127.0.0.1:8000/activate/'+jwt_token.decode('utf-8')
			to_email = request.data['email']
			email = EmailMessage(mail_subject, message, to=[to_email])
			email.send()
			return HttpResponse('Please confirm your email address to complete the registration')

class activate_class(APIView):
	def get(self, request, *args, **kwargs):
		token = self.kwargs['token']
		return redirect("login")
