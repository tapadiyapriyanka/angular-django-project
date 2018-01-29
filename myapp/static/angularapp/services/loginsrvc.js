module.factory('LoginService', function($http) {
// var admin = 'admin';
// var pass = 'admin123';
// var isAuthenticated = false;
console.log("in service file");
return {
  login : function(username, password) {
    // console.log("in login service ");
	// isAuthenticated = username === admin && password === pass;
    // console.log("is isAuthenticated = ",isAuthenticated);
	var Indata = {'username' : username, 'password':password}
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
