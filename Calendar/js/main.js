angular.module('calendar', ['ngRoute', 'repository'])
.config(function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'Views/login.html',
            controller: 'login'
        })
        .when('/register', {
            templateUrl: 'Views/register.html',
            controller: 'register'
        })
        .when('/calendar/:profile?', {
            templateUrl: 'Views/calendar.html',
            controller: 'calendar'
        })
        .when('/calendar/:profile/date/:year?/:month?', {
            templateUrl: 'Views/calendar.html',
            controller: 'calendar'
        })
        .when('/profiles', {
            templateUrl: 'Views/profiles.html',
            controller: 'profiles'
        })
        .when('/records/:year/:month/:day', {
            templateUrl: 'Views/records.html',
            controller: 'records'
        })
        .otherwise({
            redirectTo: '/calendar'
        });
})
.run(function ($http, repository) {
    // fake login
    // remove after login page implemented
    if (!localStorage.getItem('token')) {
        repository.user.login('0961234567', 'password',
            function (data) {
                localStorage.setItem('token', data['access_token']);
            }, function (data) {
                console.log(data);
            });
    }
})
.run(function ($http) {
    // if previously logged in - set authorizatin header
    if (localStorage.getItem('token'))
        $http.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token');
})
.run(function ($rootScope, $location) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        // if user is not logged in - redirect to login page
        if (!localStorage.getItem('token')) {
            if (next.controller != 'login' && next.controller != 'register') {
                $location.path("/login");
            }
        }
    });
});