angular.module('calendar')
.controller('login', function ($scope, $http, repository) {

    $scope.login = function () {
        repository.user.login($scope.phone, $scope.password,
            function (data) {
                window.location.hash = '#/calendar';
            }, function (data) {
                $scope.errorPhone = (data.error_description == 'username');
                $scope.errorPassword = (data.error_description == 'password');
            })
    };
});
