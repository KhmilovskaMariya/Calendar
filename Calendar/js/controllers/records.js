angular.module('calendar')
.controller('records', function ($scope, $routeParams) {
    var repository = angular.module('repository');

    $scope.test = 'this is records page ' + JSON.stringify($routeParams);
});