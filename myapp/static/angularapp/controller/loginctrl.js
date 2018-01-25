module.controller('LoginController', function($scope, $http, $stateParams, $state, LoginService) {

$scope.formData = function(data) {
	console.log("sbjdhjfkzj");
	if(LoginService.login($scope.username, $scope.password)) {
		 $scope.error = '';
		 $scope.username = '';
		 $scope.password = '';
		 $state.transitionTo('test1');
} else {
 $scope.error = "Incorrect username/password !";
}
};
});
