angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  $scope.data = {};

  Links.getAll()
  .then(function(links) {
    //console.log('LINKS:', links);
    $scope.data.links = links;

    if(Array.isArray($scope.data.links)) {
      $scope.data.links.sort(function(a, b) {
        return b.visits - a.visits;
      });
    }
  });

});
