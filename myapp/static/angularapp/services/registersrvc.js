module.factory('RegisterService', function($http) {
var isAuthenticated = false;
console.log("in register service file");
return {
  login : function(username, password) {
    console.log("in register service ");

    console.log("is isAuthenticated = ",isAuthenticated);
	var Indata = {'username' : username, 'password':password, 'firstname':firstname, 'lastname':lastname, 'email':email}
	console.log("indata = ",Indata);
	$http({
	   url: '/login/',
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
