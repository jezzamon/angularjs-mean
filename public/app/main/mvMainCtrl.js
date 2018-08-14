angular.module('app')
    .controller('mvMainCtrl', [
    '$scope', 
    function($scope) {


    $scope.courses = [
      {name: 'Terrace House', featured: true, published: new Date(2018, 3, 16, 33)},
      {name: 'Serie Noir', featured: true, published: new Date(2018, 3, 16, 33)},
      {name: 'Outlander', featured: true, published: new Date(2018, 3, 16, 33)},
      {name: 'Better Call Saul', featured: true, published: new Date(2018, 3, 16, 33)},
      {name: 'Fargo', featured: true, published: new Date(2018, 3, 16, 33)},
      {name: 'Breaking Bad', featured: true, published: new Date(2018, 3, 16, 33)},
      {name: 'Outlander', featured: false, published: new Date(2018, 3, 16, 33)},
      {name: 'Barry', featured: false, published: new Date(2018, 3, 16, 33)},
      {name: 'Insecure', featured: false, published: new Date(2018, 3, 16, 33)},
      {name: 'Atlanta', featured: false, published: new Date(2018, 3, 16, 33)},
      {name: 'The defiant ones', featured: false, published: new Date(2018, 3, 16, 33)},
      
    ]
}]);