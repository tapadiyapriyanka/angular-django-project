module.controller('ForgotController', function($scope, $http, $stateParams, $state, ForgotService) {

$scope.savePassword = function() {
	console.log("on savePassword function");
	// var url = 'login/'
	// var method = 'POST'
	data = {'username':$scope.username,
		 	'password':$scope.password,
		    'confirmpass':$scope.repassword}
	ForgotService.rest_service('/forgotpassword/','POST',data,function(){
		console.log("inside forgot password after calling to service");
		$scope.error = '';
		$scope.username = '';
		$scope.password = '';
		$state.transitionTo('test1');
	});
}
});
