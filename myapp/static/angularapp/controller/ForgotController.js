module.controller('ForgotController', function($scope, $http, $stateParams, $state, SingleService) {

$scope.savePassword = function() {
	console.log("on savePassword function");
	data = {'username':$scope.username,
		 	'password':$scope.password,
		    'confirmpass':$scope.repassword}
	
	SingleService.rest_service('/forgotpassword/','POST',data,function(){
		console.log("inside forgot password after calling to service");
		$scope.error = '';
		$scope.username = '';
		$scope.password = '';
		$state.transitionTo('login');
	});
}
});
