from django.shortcuts import render
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
			print("in except case ")
			return Response({'Error': "Invalid username/password"}, status="400")

		if user:
			print("in if condition ")
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

	######################## def another to check user is registered or not ##############

class Register_user(APIView):
	def post(self, request, *args, **kwargs):
		username = request.data['username']
		password = request.data['password']
		lastname = request.data['lastname']
		firstname = request.data['firstname']
		email     = request.data['email']
		print("username = ",username)
		print("password = ",password)
		print("email = ",email)
		user = User.objects.create_user(username, password, email, firstname, lastname)
