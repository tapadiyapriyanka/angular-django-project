module.controller('LoginController', function($scope, $http, $auth, $stateParams, $state, SingleService, LocalstorageService) {

$scope.formData = function() {
	data = {'username':$scope.username,
			 'password':$scope.password}
	token = localStorage.getItem('token')
	console.log("token = ",token);
	$auth.login(data)
	.then(function(response) {
 		console.log("response = ",response['data']);
 		LocalstorageService.storage_service(response['data']['token'],'set',function(){
 			console.log("inside localStorage service controller call from login controller");
 		});
		$state.go("home");
    },function(response) {
 	   });

	// SingleService.rest_service('/login/','POST',data,function(){
	// 	console.log("inside single service controller call");
	// 	$scope.error = '';
	// 	$scope.username = '';
	// 	$scope.password = '';
	// 	$state.transitionTo('register');
	// });
}
});
