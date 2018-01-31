module.controller('LoginController', function($scope, $http, $stateParams, $state, LoginService) {

$scope.formData = function() {
	data = {'username':$scope.username,
		 	'password':$scope.password}
	view_data = response.data
	console.log("view data = ",view_data);
	LoginService.rest_service('login/','POST',data,function(){
		$scope.error = '';
		$scope.username = '';
		$scope.password = '';
		$state.transitionTo('test1');
	});
}
});
