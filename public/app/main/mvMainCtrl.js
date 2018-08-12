angular.module('app')
    .controller('mvMainCtrl', [
    '$scope', 
    function($scope) {


    $scope.courses = [
      {name: 'Breaking Bad', featured: true, published: new Date(2018, 3, 16, 33)},
      {name: 'Breaking Bad', featured: true, published: new Date(2018, 3, 16, 33)},
      {name: 'Breaking Bad', featured: true, published: new Date(2018, 3, 16, 33)},
      {name: 'Breaking Bad', featured: true, published: new Date(2018, 3, 16, 33)},
      {name: 'Breaking Bad', featured: true, published: new Date(2018, 3, 16, 33)},
      {name: 'Breaking Bad', featured: true, published: new Date(2018, 3, 16, 33)},
      {name: 'Outlander', featured: false, published: new Date(2018, 3, 16, 33)},
      {name: 'Barry', featured: false, published: new Date(2018, 3, 16, 33)},
      {name: 'Insecure', featured: false, published: new Date(2018, 3, 16, 33)},
      {name: 'Atlanta', featured: false, published: new Date(2018, 3, 16, 33)},
      
    ]
}]);