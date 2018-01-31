module.factory('RegisterService', function($http) {
var isAuthenticated = false;
// url = "http://localhost:8000/"
console.log("in register service file");
return {
  rest_service : function(username, password, email) {
	  // urlPath = url.concat(path);
    console.log("in register service ");
	var Indata = {'username' : username, 'password':password, 'email':email}
	console.log("indata = ",Indata);
	$http({
	   // url:urlPath,
	   url: 'register/',
	   method: "POST",
	   data: Indata
   })
   .then(function(response) {
		// testUser = response;
		console.log(response);
   },function(response) { // optional
		   // failed
   });
	return isAuthenticated;
  },
  isAuthenticated : function() {
    console.log("isAuthenticated = ",isAuthenticated);
	return isAuthenticated;
  }
};

});
