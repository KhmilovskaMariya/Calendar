angular.module('calendar')
.controller('profiles', function ($scope, repository) {

    repository.profiles.getForCurrentUser(function (x) {
        $scope.profiles = x;
    });

    repository.user.getCurrent(function (x) {
        $scope.currentUserId = x.Id;
    });

    $scope.onAddProfileClick = function () {
        if ($scope.newProfileTitle == undefined || $scope.newProfileTitle == "") {
            console.log("empty input")
        }
        else {
            var doesExists = false;

            for (var i = 0; i < $scope.profiles.length; i++) {
                if ($scope.newProfileTitle == $scope.profiles[i].Title) {
                    doesExists = true;
                    break;
                }
            }

            if (!doesExists) {
                repository.profile.create({ Title: $scope.newProfileTitle, UserId: $scope.currentUserId }, function (x) {
                    $scope.profiles.push(x);
                });
            }
            else {
                console.log("already exists");
            }

            $scope.newProfileTitle = "";
        }
    };

    $scope.onDeleteButtonClick = function (index) {
        repository.profile.delByid($scope.profiles[index].Id, function () {
            $scope.profiles.splice(index, 1);
        });
    };

    $scope.isEditing = false;

    $scope.indexToEdit = -1;

    $scope.newEditedTitle = {};

    $scope.newEditedTitle.Title = "";

    $scope.startEdit = function (index) {
        $scope.isEditing = true;
        $scope.indexToEdit = index;
        $scope.newEditedTitle.Title = $scope.profiles[index].Title;

    }

    $scope.cancelEdit = function (index) {
        $scope.indexToEdit = -1;
        $scope.isEditing = false;
        $scope.newEditedTitle.Title = $scope.profiles[index].Title;
    };

    $scope.saveEdited = function (index) {
        if ($scope.profiles[index].Title != $scope.newEditedTitle.Title) {
            repository.profile.putById($scope.profiles[index].Id, {
                Id: $scope.profiles[index].Id,
                Title: $scope.newEditedTitle.Title,
                UserId: $scope.currentUserId
            }, function () { });
            $scope.profiles[index].Title = $scope.newEditedTitle.Title;
        }
        $scope.isEditing = false;
        $scope.indexToEdit = -1;
    };
});