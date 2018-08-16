angular.module('app', ['ngResource', 'ngRoute'])
  
  var routeRoleChecks = {
    admin:{ 
      auth: function(mvAuth) {
              return mvAuth.authorizeCurrentUserForRoute('admin')
          }
      } 
  }

  
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', { templateUrl: '/partials/main/main', controller: 'mvMainCtrl' })
      .when('/admin/users', { templateUrl: '/partials/admin/user-list', 
        controller: 'mvUserListCtrl', resolve: routeRoleChecks.admin
      });
      
  });

  // runs after module has loaded and completed its stack
  angular.module('app').run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
      if(rejection === 'not authorized') {
        $location.path('/');
      }
    })
  })