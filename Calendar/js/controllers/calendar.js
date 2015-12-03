angular.module('calendar')
.controller('calendar', function ($scope, $routeParams, repository) {
    Date.prototype.addDays = function (n) {
        this.setDate(this.getDate() + n);
    }
    var fillProfiles = function (profiles) {
        $scope.profiles = profiles;
        if ($routeParams.profile === undefined) {
            $scope.currentProfile = profiles[0];
        }
        else {
            $scope.currentProfile = $.grep(profiles, function (p) { return p.Id == $routeParams.profile; })[0];
        }
    };
    var countRecordsForDay = function (records, day) {
        return $.grep(records, function (r) {
            return new Date(r.Date).getDate() == day;
        }).length;
    };
    var fillDays = function (records) {
        var jsMonth = $scope.month - 1;
        var begin = new Date($scope.year, jsMonth, 1);
        var dayOfWeek = (begin.getDay() + 6) % 7;
        begin.setDate(1 - dayOfWeek);   // last monday of previous month or 1st of current month if it is monday
        var days = [];
        var nextMonth = (jsMonth + 1) % 12;
        for (var day = begin; day.getMonth() != nextMonth || day.getDay() != 1/*monday*/; day.addDays(1)) {
            if (day.getDay() == 1) // new row starts with monday
                days.push([]);
            days[days.length - 1].push({
                day: day.getDate(),
                currMonth: day.getMonth() == jsMonth,
                records: countRecordsForDay(records, day.getDate())
            });
        }
        $scope.days = days;
    };

    if ($routeParams.month === undefined) {
        var now = new Date();
        $routeParams.year = now.getFullYear();
        $routeParams.month = now.getMonth() + 1;
    }
    $scope.year = $routeParams.year;
    $scope.month = $routeParams.month;
    var nextMonth = new Date($scope.year, $scope.month, 1);
    var prevMonth = new Date($scope.year, $scope.month - 2, 1);
    $scope.next = {
        year: nextMonth.getFullYear(),
        month: nextMonth.getMonth() + 1
    };
    $scope.prev = {
        year: prevMonth.getFullYear(),
        month: prevMonth.getMonth() + 1
    };

    $scope.daysOfWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'НД'];
    var monthNames = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
    $scope.monthName = monthNames[$scope.month - 1];

    repository.profiles.getForCurrentUser(function (profiles) {
        fillProfiles(profiles);
        var records = repository.records.getByIDForYearMonth(
            $scope.currentProfile.Id,
            $scope.year,
            $scope.month,
            function (records) {
                fillDays(records);
            });
    });
});