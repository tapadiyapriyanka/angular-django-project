var module = angular.module("sampleApp", ['ui.router']);
console.log("jhgkj");
module.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/login")
	$stateProvider
    .state('settings' , {
           name: 'test1',
           url: '/test1',
           templateUrl: '/static/angularapp/html/test1.html',
           controller: ['$scope', function ($scope) {
                $scope.name = "Hello";
            }]
       })

    .state('quotes', {
           name: 'test2',
           url: '/test2',
           templateUrl: '/static/angularapp/html/test2.html',
           controller:['$scope', function ($scope) {
                $scope.name = "World";
            }]
       })

	.state('register',{
		name: 'register',
		url: '/register',
		templateUrl: '/static/angularapp/html/login.html',
		controller: 'RegisterController'
	})

    .state('login', {
           name: 'login',
           url: '/login',
           templateUrl: '/static/angularapp/html/login.html',
           controller: 'LoginController'
       });



    }]);
