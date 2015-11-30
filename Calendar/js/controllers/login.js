angular.module('calendar')
.controller('login', function ($scope, $http, repository) {

    $scope.login = function () {
        repository.user.login($scope.phone, $scope.password,
            function (data) {
                localStorage.setItem('token', data['access_token']);
                $http.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token');
                window.location.hash = '#/calendar';
            }, function (data) {
                $scope.errorPhone = (data.error_description == 'username');
                $scope.errorPassword = (data.error_description == 'password');
            })
    };
});
