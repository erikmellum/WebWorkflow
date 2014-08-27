var mainController = angular.module('mainController', []);

mainController.controller('MainController', ['$scope', '$http', function($scope, $http){
  $scope.hello = 'world';
}]);