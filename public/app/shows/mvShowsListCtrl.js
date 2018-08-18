angular.module('app')
  .controller('mvShowsListCtrl', [
    '$scope',
    'mvShows',
    function($scope, mvCachedShows) {

      $scope.shows = mvCachedShows.query();

      $scope.sortOptions = [
        {value: "title", text: "Sort by Title"},
        {value: "published", text: "Sort by Published Date"},
      ]

      $scope.sortOrder = $scope.sortOptions[0].value;
  }]);