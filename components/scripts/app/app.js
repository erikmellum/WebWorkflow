var myApp = angular.module('myApp', [
  'ngRoute',
  'meetingControllers',
  'sliderController'
]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/home', {
    templateUrl: 'views/pages/home.html'
  }).
  when('/about', {
    templateUrl: 'views/pages/about.html'
  }).
  when('/meeting', {
    templateUrl: 'views/meetings.html',
    controller: 'MeetingController'
  }).
  when('/meeting/:itemId', {
    templateUrl: 'views/details.html',
    controller: 'DetailsController'
  }).
  otherwise({
    redirectTo: '/home',
  });
}]);