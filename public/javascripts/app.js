var myApp = angular.module('myApp', [
  'ngRoute',
  'meetingControllers'
]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/meeting', {
    templateUrl: 'views/meetings.html',
    controller: 'MeetingController'
  }).
  when('/meeting/:itemId', {
    templateUrl: 'views/details.html',
    controller: 'DetailsController'
  }).
  otherwise({
    redirectTo: '/'
  });
}]);