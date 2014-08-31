var mainController = angular.module('mainController', []);

mainController.controller('MainController', ['$scope', '$http', function($scope, $http){
  $scope.message = 'Welcome Index!';
}]);

angular.module('homeController', []).controller('HomeCtrl', ['$scope', function($scope){
  $scope.message = "Welcome Home!";
}]);