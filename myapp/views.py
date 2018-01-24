from django.shortcuts import render
from django.conf import settings
import jwt,json
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.contrib.auth import authenticate
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

		try:
			user = authenticate(username=username, password=password)
		except User.DoesNotExist:
			return Response({'Error': "Invalid username/password"}, status="400")

		if user:
			payload = {
				'id': user.pk,
				# 'username': user.username,
				# 'staff': user.is_staff
				# 'exp': datetime.utcnow() + EXPIRY_TIME
			}
			token = {
				'token':str(jwt.encode(payload, 'SECRET'))
			}
			length = len(token['token'])
			print("length = ",length)
			var = token['token'][2:length-1]
			print("var = ",var)
			# import pdb; pdb.set_trace()
			print("userid = ",var.decode('utf-8'))
			return HttpResponse(
				json.dumps(token),
				content_type="application/json"
			)
		else:
			return Response(
				json.dumps({'Error': "Invalid credentials"}),
				status=400,
				content_type="application/json"
			)
