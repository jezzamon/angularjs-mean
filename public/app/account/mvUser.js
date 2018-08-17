angular.module('app')
  .factory('mvUser', function($resource) {
    var UserResource = $resource('/api/users/:id', 
      {_id: "@id"},
      { update: {
          method: 'PUT',
          isArray: false,// expect a single object, not an array of objects
        }
      }
    );

    UserResource.prototype.isAdmin = function() {
      return this.roles && this.roles.indexOf('admin') > -1;
    }

    return UserResource;
  })