var meetingControllers = angular.module('meetingControllers', ['ngAnimate']);

meetingControllers.controller('MeetingController', ['$scope', '$http', function($scope, $http) {
  $http.get('javascripts/data.json').success(function(data) {
    $scope.meetings = data;
    $scope.meetingOrder = 'name';
  });
}]);

meetingControllers.controller('DetailsController', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {
  $http.get('javascripts/data.json').success(function(data) {
    $scope.meetings = data;
    $scope.whichItem = $routeParams.itemId;

    if ($routeParams.itemId > 0) {
      $scope.prevItem = Number($routeParams.itemId)-1;
    } else {
      $scope.prevItem = $scope.meetings.length-1;
    }

    if ($routeParams.itemId < $scope.meetings.length-1) {
      $scope.nextItem = Number($routeParams.itemId)+1;
    } else {
      $scope.nextItem = 0;
    }

  });
}]);

