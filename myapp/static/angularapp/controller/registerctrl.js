module.controller('RegisterController', function($scope, $http, $stateParams, $state, SingleService) {

$scope.registerUser= function(value){
	console.log("value = ",value);
}

$scope.saveData = function(data) {
	data = {'username':$scope.username,
			'password':$scope.password,
			'email'   :$scope.email,
		 	'repassword': $scope.repassword}
	SingleService.rest_service('/register/','POST',data,function(){
		 $scope.error = '';
		 $scope.username = '';
		 $scope.password = '';
		 $scope.email = '';
		 $state.transitionTo('login');

})
}
});
