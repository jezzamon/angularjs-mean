angular.module('app')
  .controller('mvShowDetailCtrl', [
    '$scope',
    'mvShows',
    '$routeParams',
    function($scope, mvCachedShows, $routeParams) {
      mvCachedShows.query().$promise
        .then(function(collection) {
          collection.forEach(function(show) {
            if (show._id === $routeParams.id) {
              $scope.show = show;
            }
          })
        })
  }])