﻿angular.module('repository', [])
.factory('repository', function ($http) {
    return {
        test: {
            getTest: function () {
                return 'hello world';
            }
        },
        user: {
            login: function (user, pass, success, fail) {
                $http.post('/token', $.param({
                    grant_type: 'password',
                    username: user,
                    password: pass
                }), {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function (response) {
                    success(response.data);
                }, function (response) {
                    response.data.status = response.status;
                    if (fail !== undefined)
                        fail(response.data);
                });
            },
            find: function (phone, success, fail) {
                $http.get('/api/User/Find/' + phone)
                    .then(function (response) {
                        success(response.data);
                    }, fail);
            },
            create: function (user, success, fail) {
                $http.post('/api/User/', user)
                    .then(function (response) {
                        success(response.data);
                    }, fail);
            }
        },
        profiles: {
            getForCurrentUser: function (success, fail) {
                $http.get('/api/User/Current/Profiles')
                    .then(function (response) {
                        success(response.data);
                    }, fail);
            }
        }
    };
});