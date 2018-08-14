angular.module('app')
  .factory('mvIdentity', function($window) {
    var currentUser;
    console.log('userObject', $window.bootstrappedUserObject)
    if($window.bootstrappedUserObject) {
      currentUser = $window.bootstrappedUserObject
      console.log('currentUser', currentUser)
    }
    return {
      currentUser: currentUser,
      isAuthenticated: function() {
        return !!this.currentUser;
      }
    }
  });