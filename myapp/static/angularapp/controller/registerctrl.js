module.controller('RegisterController', function($scope, $http, $stateParams, $state, RegisterService) {

$scope.saveData = function(data) {
	console.log("register", $scope.username, $scope.password, $scope.email, $scope.repassword);
	RegisterService.register($scope.username, $scope.password, $scope.email, $scope.repassword)
		 $scope.error = '';
		 $scope.username = '';
		 $scope.password = '';
		 $scope.email = '';
		 $state.transitionTo('test2');

};
});
