module.factory('LoginService', function() {
var admin = 'admin';
var pass = 'pass';
var isAuthenticated = false;
console.log("in service file");
return {
  login : function(username, password) {
    console.log("in login service ");
	isAuthenticated = username === admin && password === pass;
    console.log("is isAuthenticated = ",isAuthenticated);
    $http.post("login/")
    .then(function(output) {
    $scope.testUser = output;
    console.log($scope.testUser);
});
	return isAuthenticated;
  },
  isAuthenticated : function() {
    console.log("isAuthenticated = ",isAuthenticated);
	return isAuthenticated;
  }
};

});
