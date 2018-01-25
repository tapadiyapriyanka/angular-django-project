module.controller('RegisterController', function($scope, $http, $stateParams, $state, RegisterService) {

$scope.saveData() = function(data) {
	console.log("register");
	if(RegisterService.register($scope.username, $scope.password, $scope.firstname, $scope.lastname, $scope.email)) {
		 $scope.error = '';
		 $scope.username = '';
		 $scope.password = '';
		 $scope.firstname = '';
		 $scope.lastname = '';
		 $scope.email = '';
		 $state.transitionTo('test1');
} else {
 $scope.error = "Registration failed";
}
};
});
