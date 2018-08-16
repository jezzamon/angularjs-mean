// This uses an example of a non-singleton service
// https://stackoverflow.com/questions/16626075/non-singleton-services-in-angularjs

angular.module('app')
  .factory('mvIdentity', [
    '$window',
    'mvUser',
    function($window,mvUser) {
    var currentUser;

    if(!!$window.bootstrappedUserObject) {
      // example of non-singleton service instantiation
      currentUser = new mvUser(); // has access to services ($resource) and methods 
      // angular.extends like Object.assign es6 - take current user and add new changed properties
      angular.extend(currentUser, $window.bootstrappedUserObject);
    
    }
    return {
      currentUser: currentUser,
      isAuthenticated: function() {
        return !!this.currentUser;
      },
      isAuthorized: function(role) {
        return !!this.currentUser && currentUser.roles.indexOf('admin') > -1;
      }
    }
  }]);