angular.module('app')
  .factory('mvAuth', function($http, mvIdentity, $q) {
    return {
      authenticateUser: function(username, password) {
        var deferred = $q.defer();
        $http.post('/login', {username: username, password: password})
        .then(function(res) {
          if(res.data.success) {
            mvIdentity.currentUser = res.data.user;
            deferred.resolve(true);
          } else {
            deferred.resolve(false);
          }
        });
        return deferred.promise;
      },
      logoutUser: function() {
        var deferred = $q.defer();
        $http.post('/logout', {logout: true}).then(function() {
          mvIdentity.currentUser = undefined;
          deferred.resolve(true);
        });

        return deferred.promise;

      }
    }
  })