var myApp = angular.module('myApp', [
  'ngRoute',
  'meetingsController',  
]);

myApp.config(['$routeProvider', function($routeProvider){
  $routeProvider.
  when('/meetings', {
    templateUrl: 'partials/meetings.html',
    controller: 'MeetingsController'
  }).
  when('/details/:meetingId', {
    templateUrl: 'partials/details.html',
    controller: 'DetailsController'
  }).
  otherwise({
    redirectTo: '/meeting'
  });
}]);