var myApp = angular.module('myApp', [
  'ngRoute',
  'mainController',
  'homeController'
]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'index',
    controller: 'HomeCtrl'
  }).
  when('/home', {
    templateUrl: 'home',
    controller: 'HomeCtrl'
  }).
  otherwise({
    redirectTo: '/home',
  });
}]);