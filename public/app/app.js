angular.module('app', ['ngResource', 'ngRoute'])
  
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider.when('/', { templateUrl: '/partials/main', controller: 'mainCtrl' });
  })

  .controller('mainCtrl', [
    '$scope', 
    function($scope) {
      $scope.myVar = "main-ctrl - hello angular";
  }]);
