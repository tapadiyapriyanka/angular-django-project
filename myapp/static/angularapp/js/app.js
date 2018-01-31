var module = angular.module("sampleApp", ['ui.router','satellizer']);
module.config(['$stateProvider', '$urlRouterProvider', '$authProvider', function($stateProvider, $urlRouterProvider, $authProvider) {

	var skipIfLoggedIn = ['$q', '$auth', function($q, $auth) {
        var deferred = $q.defer();
        console.log($auth.isAuthenticated());
        if ($auth.isAuthenticated()) {
            deferred.reject();
        } else {
            deferred.resolve();
        }
        return deferred.promise;
    }];

    var loginRequired = ['$q', '$state', '$auth', function($q, $state, $auth) {
        var deferred = $q.defer();
        console.log($auth.isAuthenticated());
        if ($auth.isAuthenticated()) {
            deferred.resolve();
        } else {
            $state.go('/login');
        }
        return deferred.promise;
    }];

	$urlRouterProvider.otherwise("/login")

	$stateProvider
    .state('test1' , {
           url: '/test1',
           templateUrl: '/static/angularapp/html/test1.html',
           controller: ['$scope', function ($scope) {
                $scope.name = "Hello";
            }],
			resolve: {
                loginRequired: loginRequired
            }
       })

    .state('test2', {
           url: '/test2',
           templateUrl: '/static/angularapp/html/test2.html',
           controller:['$scope', function ($scope) {
                $scope.name = "World";
            }],
			resolve: {
                loginRequired: loginRequired
            }
       })

	.state('register',{
		url: '/register',
		templateUrl: '/static/angularapp/html/register.html',
		controller: 'RegisterController',
		resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            }
	})

	.state('forgotpassword',{
		url: '/forgotpassword',
		templateUrl: '/static/angularapp/html/forgot_password.html',
		controller: 'ForgotController',
		resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            }
	})

    .state('login', {
           url: '/login',
           templateUrl: '/static/angularapp/html/login.html',
           controller: 'LoginController',
		   resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            }
       });



    }]);
