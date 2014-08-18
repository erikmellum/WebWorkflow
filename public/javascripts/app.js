var myApp = angular.module('myApp', [
  'ngRoute',
  'meetingsController',  
]);

myApp.config(['$routeProvider', function($routeProvider){
  $routeProvider.
  when('/meetings', {
    templateUrl: 'views/meetings.html',
    controller: 'MeetingsController'
  }).
  when('/details/:meetingId', {
    templateUrl: 'views/details.html',
    controller: 'DetailsController'
  }).
  otherwise({
    redirectTo: '/meeting'
  });
}]);