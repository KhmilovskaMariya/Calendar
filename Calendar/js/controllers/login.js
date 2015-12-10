// Mariya Khmilovska
angular.module('calendar')
.controller('login', function ($scope, $http, repository) {

    $scope.login = function () {
        repository.user.login($scope.phone, $scope.password,
            function (data) {
                // if login successful redirect to calendar page
                window.location.hash = '#/calendar';
            }, function (data) {
                // if not, show error message
                $scope.errorPhone = (data.error_description == 'username');
                $scope.errorPassword = (data.error_description == 'password');
            })
    };
});
