angular.module('app')
  .factory('mvCachedShows', [
    'mvShows',
    function(mvShows) {
      var showsList;

      return {
        query: function() {
          if(!showsList) {
            showsList = mvShows.query();
          }

          return showsList;
        }
      }
    }])