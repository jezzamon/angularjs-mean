angular.module('app')
  .controller('mvShowsListCtrl', [
    '$scope',
    'mvShows',
    function($scope, mvShows) {
      $scope.shows = mvShows.query();
  }]);