var meetingsController = angular.module('meetingsController', []);

  meetingsController.controller('MeetingsController', ['$scope', '$http', function($scope, $http) {
  $http.get('data.json').success(function(data){
    $scope.meetings = data;
  });
}]);

  myApp.controller('DetailsController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  $http.get('data.json').success(function(data){
    $scope.meetings = data;
    $scope.whichMeeting = $routeParams.meetingId;
  });
}]);

