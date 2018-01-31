module.factory('LoginService', function($http) {
console.log("in service file");
return {
  rest_service : function(url,method,data,callback) {
	  console.log("method = ",method);
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

	return $http(httpobj)

   .then(function(response) {
		console.log("response = ",response);
   },function(response) { // optional
			   // failed
	   });
  },
};
});
