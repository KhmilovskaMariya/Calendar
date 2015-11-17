angular.module('calendar')
.controller('records', function ($scope, $routeParams, repository) {

    $scope.test = 'this is records page ' + JSON.stringify($routeParams);
});