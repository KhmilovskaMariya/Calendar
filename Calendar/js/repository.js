angular.module('repository', [])
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
            },
            deleteByID: function (id, success, fail) {
                $http.delete('/api/User/' + id)
                .then(function (response) {
                    success(response.data)
                }, fail);
            },
            deleteCurrent: function (success, fail) {
                $http.delete('/api/User')
                .then(function (response) {
                    success(response.data)
                }, fail);
            },
            putForCurrentUser: function (user, success, fail) {
                $http.put('/api/User/Current/', user)
                    .then(function (response) {
                        success(response.data);
                    }, fail);
            },
            putForUserOfId: function (user, id, success, fail) {
                $http.put('/api/User/' + id + '/', user)
                    .then(function (response) {
                        success(response.data);
                    }, fail);
            },
            getAll: function (success, fail) {
                $http.get('/api/User/')
                    .then(function (response) {
                        success(response.data);
                    }, fail);
            },
            getCurrent: function (success, fail) {
                $http.get('/api/User/Current')
                    .then(function (response) {
                        success(response.data);
                    }, fail);
            },
            getById: function (id, success, fail) {
                $http.get('/api/User/' + id)
                    .then(function (response) {
                        success(response.data);
                    }, fail);
            }
        },
        profiles: {
            getAll: function (success, fail) {
                $http.get('/api/Profile/')
                    .then(function (response) {
                        success(response.data);
                    }, fail);
            },
            getForCurrentUser: function (success, fail) {
                $http.get('/api/User/Current/Profiles')
                    .then(function (response) {
                        success(response.data);
                    }, fail);
            },
            getByUserId: function (id, success, fail) {
                $http.get('/api/User/' + id + '/Profiles')
                    .then(function (response) {
                        success(response.data);
                    }, fail);
            }
        },
        records: {
            getAll: function (success, fail) {
                $http.get('/api/Record/')
                    .then(function (response) {
                        success(response.data);
                    }, fail);
            },
            getByID: function (id, success, fail) {
                $http.get('/api/Profile/' + id + '/Records')
                .then(function (response) {
                    success(response.data);
                }, fail);
            },
            getByIDForYear: function (id, year, success, fail) {
                $http.get('/api/Profile/' + id + '/Records/' + year)
                .then(function (response) {
                    success(response.data);
                }, fail);
            },
            getByIDForYearMonth: function (id, year, month, success, fail) {
                $http.get('/api/Profile/' + id + '/Records/' + year + '/' + month)
                .then(function (response) {
                    success(response.data);
                }, fail);
            },
            getByIDForYearMonthDay: function (id, year, month, day, success, fail) {
                $http.get('/api/Profile/' + id + '/Records/' + year + '/' + month + '/' + day)
                .then(function (response) {
                    success(response.data);
                }, fail);
            }
        },
        profile: {
            getById: function (id, success, fail) {
                $http.get('/api/Profile/' + id)
                    .then(function (response) {
                        success(response.data);
                    }, fail);
            },
            putById: function (id, profile, success, fail) {
                $http.put('/api/Profile/' + id, profile)
                    .then(function (response) {
                        success(response.data);
                    }, fail);
            },
            create: function (profile, success, fail) {
                $http.post('/api/Profile/', profile)
                    .then(function (response) {
                        success(response.data);
                    }, fail);
            },
            delByid: function (id, success, fail) {
                $http.delete('/api/Profile/' + id)
                    .then(function (response) {
                        success(response.data);
                    }, fail);
            },
        },
        record: {
            create: function (record, success, fail) {
                $http.post('/api/Record/', record)
                    .then(function (response) {
                        success(response.data);
                    }, fail);
            },
            getById: function (id, success, fail) {
                $http.get('/api/Record/' + id)
                    .then(function (response) {
                        success(response.data);
                    }, fail);
            },
            putById: function (id, record, success, fail) {
                $http.put('/api/Record/' + id, record)
                    .then(function (response) {
                        success(response.data);
                    }, fail);
            },
            delById: function (id, success, fail) {
                $http.delete('/api/Record/' + id)
                    .then(function (response) {
                        success(response.data);
                    }, fail);
            }
        }
    };
});