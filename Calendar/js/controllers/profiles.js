angular.module('calendar')
.controller('profiles', function ($scope, repository) {
    repository.profiles.getForCurrentUser(function (x) {
        $scope.profiles = x;
    });
});