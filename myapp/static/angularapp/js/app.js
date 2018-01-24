
var module = angular.module("sampleApp", ['ui.router']);
module.config(function ($stateProvider) {
    var settings = {
           name: 'test1',
           url: '/test1',
           templateUrl: '/static/angularapp/html/test1.html',
           controller: ['$scope', function ($scope) {
                $scope.name = "Hello";
            }]
       };

       var quotes = {
           name: 'test2',
           url: '/test2',
           templateUrl: '/static/angularapp/html/test2.html',
           controller:['$scope', function ($scope) {
                $scope.name = "World";
            }]
       };

       var login = {
           name: 'login',
           url: '/login',
           templateUrl: '/static/angularapp/html/login.html',
           controller: 'LoginController'
       };

       $stateProvider
           .state(settings)
           .state(quotes)
           .state(login);  

    });
