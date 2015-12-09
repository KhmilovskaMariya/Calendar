angular.module('calendar')
    .controller('register', function ($scope, repository, $http) {
        $scope.userExists = false;

        // function to submit the form after all validation has occurred 
        $scope.submitForm = function () {

            // set the 'submitted' flag to true
            $scope.submitted = true;

            if ($scope.userForm.$valid) {
                repository.user.find($scope.user.phonenumber, function (user) {
                    $scope.userExists = true;
                }, function (data) {
                    if (data.status == 404) {
                        repository.user.create({
                            FirstName: $scope.user.name,
                            LastName: $scope.user.surname,
                            PhoneNumber: $scope.user.phonenumber,
                            Password: $scope.user.password,
                            City: $scope.user.city,
                            Email: $scope.user.email
                        }, function (user) {
                            repository.user.login($scope.user.phonenumber, $scope.user.password,
                                function (data) {
                                    localStorage.setItem('token', data.access_token);
                                    $http.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token');
                                    location.hash = '#/calendar';
                                });
                        });
                    }
                });

            } else {
                alert("Please correct errors!");
            }
        };
    })
    .directive('ngCompare', function () {
        return {
            require: 'ngModel',
            link: function (scope, currentEl, attrs, ctrl) {
                var comparefield = document.getElementsByName(attrs.ngCompare)[0]; //getting first element
                var compareEl = angular.element(comparefield);

                //current field key up
                currentEl.on('keyup', function () {
                    if (compareEl.val() !== "") {
                        var isMatch = currentEl.val() === compareEl.val();
                        ctrl.$setValidity('compare', isMatch);
                        scope.$digest();
                    }
                });

                //element to compare field key up
                compareEl.on('keyup', function () {
                    if (currentEl.val() !== "") {
                        var isMatch = currentEl.val() === compareEl.val();
                        ctrl.$setValidity('compare', isMatch);
                        scope.$digest();
                    }
                });
            }
        };
    });