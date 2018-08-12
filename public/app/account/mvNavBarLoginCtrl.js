
angular.module('app')
    .controller('mvNavBarLoginCtrl', [
    '$scope',
    '$http',
    'mvIdentity',
    'mvNotifier',
    'mvAuth',
    function($scope, $http, mvIdentity, mvNotifier, mvAuth) {
      // vars
      $scope.identity = mvIdentity;
      
      // functions
      $scope.signin = function(username, password) {
        mvAuth.authenticateUser(username, password)
          .then(function(success) {
            if(success) {
              mvNotifier.notify('You have successfully logged in');
            } else {
              mvNotifier.notify('Incorrect username/password');
            }
          })
      }
    }
  ]);