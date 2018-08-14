
angular.module('app')
    .controller('mvNavBarLoginCtrl', [
    '$scope',
    '$http',
    'mvIdentity',
    'mvNotifier',
    'mvAuth',
    '$location',
    function($scope, $http, mvIdentity, mvNotifier, mvAuth, $location) {
      // vars
      $scope.identity = mvIdentity;
      
      // functions
      $scope.signin = function(username, password) {
        mvAuth.authenticateUser(username, password)
          .then(function(success) {
            if(success) {
              mvNotifier.notify('You have successfully logged in');
              console.log('logged in')
            } else {
              mvNotifier.notify('Incorrect username/password');
              console.log('logged out')
            }
          })
      }

      $scope.signout = function() {
        mvAuth.logoutUser().then(function() {
          $scope.username = "";
          $scope.password = "";
          mvNotifier.notify('You have successfully logged out');
          $location.path('/');
        })
      }
    }
  ]);