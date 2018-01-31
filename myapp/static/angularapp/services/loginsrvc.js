module.factory('SingleService', function($http, LocalstorageService) {
console.log("in service file of login ");
return {
  rest_service : function(url,method,data,callback) {
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

	return $http(httpobj)

   .then(function(response) {
		console.log("response = ",response['data']);
		LocalstorageService.storage_service(response['data'],'set',function(){
			console.log("inside localStorage service controller call");
		});
        // call service of localStorage
		// localStorage.setItem('token',response['data'])
		callback(response)
   },function(response) { // optional
			   // failed
	   });
  },
};
});
