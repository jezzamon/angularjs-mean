angular.module('app')
  .factory('mvAuth', [
    '$http',
    'mvIdentity',
    '$q',
    'mvUser',
    function($http, mvIdentity, $q, mvUser) {
    return {
      authenticateUser: function(username, password) {
        var deferred = $q.defer();
        
        $http.post('/login', {username: username, password: password})
          .then(function(res) {
            if(res.data.success) {
              var user = new mvUser();
              // take data returned from $http post and add it into user obj we created
              angular.extend(user, res.data.user);
              mvIdentity.currentUser = user;
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

      },
      authorizeCurrentUserForRoute: function(role) {
        if (mvIdentity.isAuthorized(role)) {
          return true;
        } else {
          return $q.reject('not authorized')
        }
      }
    }
  }])