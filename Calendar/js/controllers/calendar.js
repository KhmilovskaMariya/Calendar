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

    var daysInMonth = function (year, month) {
        var date = new Date(year, month, -1);
        return date.getDate() + 1;
    }
    var begin = new Date($scope.year, $scope.month - 1, 1);
    var dayOfWeek = (begin.getDay() + 6) % 7;
    begin.setDate(1 - dayOfWeek);
    Date.prototype.addDays = function (n) {
        this.setDate(this.getDate() + n);
    }

    $scope.daysOfWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'НД'];
   // $scope.daysOfWeek = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота', 'Неділя'];
    var days = [];
    var nextMonth = $scope.month % 12;
    for (var day = begin; day.getMonth() != nextMonth || day.getDay() != 1; day.addDays(1)) {
        if (day.getDay() == 1)
            days.push([]);
        days[days.length - 1].push({
            day: day.getDate(),
            currMonth: day.getMonth() == $scope.month-1
        });
    }
    $scope.days = days;

});