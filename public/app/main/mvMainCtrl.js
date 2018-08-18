angular.module('app')
    .controller('mvMainCtrl', [
    '$scope',
    'mvShows',
    function($scope, mvShows) {


    $scope.shows = mvShows.query();
}]);



// {title: 'Terrace House', featured: true, published: new Date(2018, 3, 16, 33)},
// {title: 'Serie Noir', featured: true, published: new Date(2018, 3, 16, 33)},
// {title: 'Outlander', featured: true, published: new Date(2018, 3, 16, 33)},
// {title: 'Better Call Saul', featured: true, published: new Date(2018, 3, 16, 33)},
// {title: 'Fargo', featured: true, published: new Date(2018, 3, 16, 33)},
// {title: 'Breaking Bad', featured: true, published: new Date(2018, 3, 16, 33)},
// {title: 'Outlander', featured: false, published: new Date(2018, 3, 16, 33)},
// {title: 'Barry', featured: false, published: new Date(2018, 3, 16, 33)},
// {title: 'Insecure', featured: false, published: new Date(2018, 3, 16, 33)},
// {title: 'Atlanta', featured: false, published: new Date(2018, 3, 16, 33)},
// {title: 'The defiant ones', featured: false, published: new Date(2018, 3, 16, 33)},