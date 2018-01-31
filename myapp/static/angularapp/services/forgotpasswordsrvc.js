// This service is no longer required.

module.factory('ForgotService', function($http) {
console.log("in service file of forgot password");
return {
  rest_service : function(url,method,data,callback) {
	  console.log("method = ",method);
	  console.log("url = ",url);
	  console.log("data = ",data);
	var httpobj={
		  'url' : url,
		  'method' : method,
	}
	if(method == 'get' || method == 'GET'){
		httpobj.params = data
		}
	else {
		httpobj.data = data
	}

	$http({
	   url:url,
	   method:method,
	   data:data
   })
   .then(function(response) {
		console.log("response = ",response);
   },function(response) { // optional
			   // failed
	   });
  },
};
});
