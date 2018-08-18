angular.module('app', ['ngResource', 'ngRoute'])
  
  .config(function($routeProvider, $locationProvider) {
    
    var routeRoleChecks = {
      admin:{ 
        auth: function(mvAuth) {
                return mvAuth.authorizeCurrentUserForRoute('admin')
        }
      },
      user: {
        auth: function(mvAuth) {
          return mvAuth.authorizeAuthenticatedUserForRoute()
        }
      }
        
    }
    
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', { templateUrl: '/partials/main/main', controller: 'mvMainCtrl' })
      .when('/admin/users', { templateUrl: '/partials/admin/user-list', 
        controller: 'mvUserListCtrl', resolve: routeRoleChecks.admin
      })
      .when('/signup', { templateUrl: '/partials/account/signup', 
        controller: 'mvSignupCtrl'
      })
      .when('/profile', { templateUrl: '/partials/account/profile', 
        controller: 'mvProfileCtrl', resolve: routeRoleChecks.user
      })
      .when('/shows', { templateUrl: '/partials/shows/shows-list', 
        controller: 'mvShowsListCtrl'
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