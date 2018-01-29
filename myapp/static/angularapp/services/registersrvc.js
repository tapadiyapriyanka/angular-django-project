module.factory('RegisterService', function($http) {
var isAuthenticated = false;
console.log("in register service file");
return {
  register : function(username, password, email) {
    console.log("in register service ");
	var Indata = {'username' : username, 'password':password, 'email':email}
	console.log("indata = ",Indata);
	$http({
	   url: 'register/',
	   method: "POST",
	   data: Indata
   })
   .then(function(response) {
		// testUser = response;
		console.log(response);
   },
   function(response) { // optional
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
