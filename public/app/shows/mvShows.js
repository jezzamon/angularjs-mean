angular.module('app')
  .factory('mvShows', [
    '$resource',
    function($resource) {
      var ShowsResource = $resource('/api/shows/:_id', {_id: "@id"},
        { 
          update: {
            method: 'PUT', isArray: false
          }
        }
      )

      return ShowsResource;
    }])