var myApp = angular.module('myApp', [
  'ngRoute',
  'mainController'
]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/home', {
  }).
  otherwise({
    redirectTo: '/home',
  });
}]);