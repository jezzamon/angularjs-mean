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

      createUser: function(mvUserData) {
        var newUser = new mvUser(mvUserData);
        var deferred = $q.defer();

        newUser.$save().then(function() {
          mvIdentity.currentUser = newUser;
          deferred.resolve();
        }, function(res) {
          deferred.reject(res.data.reason);
        });

        return deferred.promise;
      },

      updateCurrentUser: function(newUserData) {
        var deferred = $q.defer();

        //mvIdentity has an instance of mvAuth service (with $resource methods)
        // we want to copy it first, then if change was successful at it, otherwise mvIdentity might contain data that wasn't successfully saved on back end
        var clone = angular.copy(mvIdentity.currentUser);
        angular.extend(clone, newUserData); 

        clone.$update()
          .then(function() {
            mvIdentity.currentUser = clone;
            deferred.resolve();
          }, function(res) {
            deferred.reject(res.data);
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
      },
      authorizeAuthenticatedUserForRoute: function() {
        if (mvIdentity.isAuthenticated()) {
          return true;
        } else {
          return $q.reject('not authorized');
        }
      }
    }
  }])