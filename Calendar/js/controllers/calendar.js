angular.module('calendar')
.controller('calendar', function ($scope, $routeParams, repository) {

    // need to use $rootScope to prevent blinking (when?)
    repository.profiles.getForCurrentUser(function (profiles) {
        $scope.profiles = profiles;
        if ($routeParams.profile === undefined) {
            $scope.currentProfile = profiles[0];
        }
        else {
            $scope.currentProfile = $.grep(profiles, function (p) { return p.Id == $routeParams.profile; })[0];
        }
    });

    if ($routeParams.month === undefined) {
        var now = new Date();
        $routeParams.year = now.getFullYear();
        $routeParams.month = now.getMonth() + 1;
    }
    $scope.year = $routeParams.year;
    $scope.month = $routeParams.month;
    var monthNames = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
    $scope.monthName = monthNames[$routeParams.month - 1];


});