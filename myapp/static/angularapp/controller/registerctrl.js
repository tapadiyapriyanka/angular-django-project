module.controller('RegisterController', function($scope, $http, $stateParams, $state, RegisterService) {

$scope.registerUser= function(value){
	console.log("value = ",value);
}

$scope.saveData = function(data) {
	// console.log("register", $scope.username, $scope.password, $scope.email, $scope.repassword);
	data = {'username':$scope.username,
			'password':$scope.password,
			'email'   :$scope.email,
		 	'repassword': $scope.repassword}
	RegisterService.rest_service('register/','POST',data,function(){
		 $scope.error = '';
		 $scope.username = '';
		 $scope.password = '';
		 $scope.email = '';
		 $state.transitionTo('test2');

})
}
});
