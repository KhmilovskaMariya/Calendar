// Oleg Pylypchak
angular.module('calendar')
.controller('calendar', function ($scope, $routeParams, repository) {
    Date.prototype.addDays = function (n) {
        this.setDate(this.getDate() + n);
    };
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
            var rDate = new Date(r.Date);
            return rDate.getDate() == day.getDate() && rDate.getMonth() == day.getMonth();
        }).length;
    };
    // create calendar matrix out of retived records for current month
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
                records: countRecordsForDay(records, day)
            });
        }
        $scope.days = days;
    };

    // if date not specified use current date
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

    $scope.daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.monthName = monthNames[$scope.month - 1];

    // generate calendar matrix before records loaded
    fillDays([]);

    repository.profiles.getForCurrentUser(function (profiles) {
        fillProfiles(profiles);
        repository.records.getByIDForYearMonth(
            $scope.currentProfile.Id,
            $scope.year,
            $scope.month,
            function (records) {
                fillDays(records);
            });
    });
});