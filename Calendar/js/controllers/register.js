// Yaroslav Khamar
angular.module('calendar')
    .controller('register', function ($scope, repository, $http) {
        $scope.userExists = false;

        // function to submit the form after all validation has occurred 
        $scope.submitForm = function () {

            // set the 'submitted' flag to true
            $scope.submitted = true;

            // check if user form is valid
            if ($scope.userForm.$valid) {
                // search for user by phone number
                repository.user.find($scope.user.phonenumber, function (user) {
                    $scope.userExists = true;
                }, function (data) {
                    if (data.status == 404) {

                        // creating new user if one doesn't already exist
                        repository.user.create({
                            FirstName: $scope.user.name,
                            LastName: $scope.user.surname,
                            PhoneNumber: $scope.user.phonenumber,
                            Password: $scope.user.password,
                            City: $scope.user.city,
                            Email: $scope.user.email

                            // creating default profile
                        }, function (user) {
                            repository.user.login($scope.user.phonenumber, $scope.user.password,
                                function (data) {
                                    repository.profile.create({
                                        Title: 'Default',
                                        UserId: user.Id
                                    }, function (profile) {
                                        location.hash = '#/calendar';
                                    });
                                });
                        });
                    }
                });

            } else {
                alert("Please correct errors!"); // if form is not valid, correct mistakes
            }
        };
    })
    .directive('ngCompare', function () {
        return {
            require: 'ngModel',
            link: function (scope, currentEl, attrs, ctrl) {
                var comparefield = document.getElementsByName(attrs.ngCompare)[0]; //getting first element
                var compareEl = angular.element(comparefield);

                // current field key up
                currentEl.on('keyup', function () {
                    if (compareEl.val() !== "") {
                        var isMatch = currentEl.val() === compareEl.val();
                        ctrl.$setValidity('compare', isMatch);
                        scope.$digest();
                    }
                });

                // element to compare field key up
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