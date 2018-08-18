angular.module('app')
  .controller('mvShowDetailCtrl', [
    '$scope',
    'mvShows',
    '$routeParams',
    function($scope, mvShows, $routeParams) {

    $scope.show = mvShows.get({ _id : $routeParams.id})
  }])