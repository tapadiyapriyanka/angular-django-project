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
from django.core.mail import EmailMessage
from django.utils.encoding import force_bytes, force_text
from django.template.loader import render_to_string
from pyee import EventEmitter
from rest_framework import status
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
		print("request = ",request.data)
		username = request.data['username']
		password = request.data['password']
		print("username and password = ",username, " ", password)
		try:
			user = authenticate(username=username, password=password)
			print("in try case user = ",user)
		except User.DoesNotExist:
			return Response({'Error': "Invalid username/password"}, status="400")
		print("user = ",user)
		ee.emit('event')
		if user:
			payload = {'username':username, 'password' : password}
			jwt_token = jwt.encode(payload, 'SECRET_KEY', 'HS256')
			print("jwt token = ",jwt_token)
			response_data['token'] = jwt_token;
			return Response(data=response_data,status=status.HTTP_201_CREATED)
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
			return Response(data=jwt_token,status=status.HTTP_201_CREATED)
		else:
			return Response(data="Error Occured",status=status.HTTP_400_BAD_REQUEST)

class activate_class(APIView):
	def get(self, request, *args, **kwargs):
		token = self.kwargs['token']
		user_data = jwt.decode(token, 'SECRET_KEY', algorithms=['HS256'])
		users = User.objects.all()
		user = User.objects.get(username=user_data['username'])
		if user in users:
			print("user = ",user)
			user.is_active = True
			user.save()
			return redirect("home")
		else:
			return HttpResponse("not valid user")

ee = EventEmitter()
@ee.on('event')
def event_handler():
	print('BANG BANG')

class forgot_password(APIView):
	def post(self, request, *args, **kwargs):
		print("in forgot password view..")
		response_data = {}
		username = request.data['username']
		password = request.data['password']
		confirmpass = request.data['confirmpass']
		print("username = ",username)
		print("password = ",password)
		print("confirmpass = ",confirmpass)
		u = User.objects.get(username=username)
		u.set_password('new password')
		u.save()
		return HttpResponse('password changed successfully')
