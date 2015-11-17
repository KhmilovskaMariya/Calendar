angular.module('calendar')
.controller('month', function ($scope, $routeParams) {
    var repository = angular.module('repository');

    $scope.test = 'this is calendar page ' + JSON.stringify($routeParams);
    $scope.title = 'title';
});