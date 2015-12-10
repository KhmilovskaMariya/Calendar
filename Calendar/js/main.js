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
        .when('/records/:profile/date/:year/:month/:day', {
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
                $http.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token');
            }, function (data) {
                console.log(data);
            });
    }
})
.run(function ($http, repository, $rootScope) {
    // if previously logged in - set authorizatin header
    if (localStorage.getItem('token')) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token');
        // check if token is hasn't expored yet
        repository.user.getCurrent(function (user) {
        }, function (data) {
            if (data.status == 401) {
                // if unauthorized remove current token and redirect to login page
                localStorage.removeItem('token');
                $rootScope.tokenExpired = true; // notify user about what happend
                location.hash = '#/login';
            }
        });
    }
})
.run(function ($rootScope, $location) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        // to prevent blinking when navigating between same controllers
        // need to preserve some scope variables
        if (current !== undefined && current.controller == next.controller) {
            if (current.controller == 'calendar') {
                $rootScope.currentProfile = current.scope.currentProfile;
                $rootScope.days = current.scope.days;
            }
        }
        // when navigation to different controller
        // need to clean root scope from saved variables
        if (current !== undefined && current.controller != next.controller) {
            if (current.controller == 'calendar') {
                // if scope state was previously preserverd
                if ($rootScope.currentProfile != undefined) {
                    delete $rootScope.currentProfile;
                    delete $rootScope.days;
                }
            }
        }
        // if user is not logged in - redirect to login page
        if (!localStorage.getItem('token')) {
            if (next.controller != 'login' && next.controller != 'register') {
                $location.path("/login");
            }
        }
    });
});