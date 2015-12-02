angular.module('calendar')
.controller('profiles', function ($scope, repository) {

    repository.profiles.getForCurrentUser(function (x) {
        $scope.profiles = x;
    });

    repository.user.getCurrent(function (x) {
        $scope.currentUserId = x.Id;
    });

    $scope.errorEmpty = false;

    $scope.errorExist = false;

    $scope.hideErrors = function () {
        $scope.errorEmpty = false;
        $scope.errorExist = false;
    }

    $scope.doesExist = function (x, index) {
        var exist = false;

        for (var i = 0; i < $scope.profiles.length; i++) {
            if (x == $scope.profiles[i].Title && i != index) {
                exist = true;
                break;
            }
        }
        return exist;
    }

    $scope.onAddProfileClick = function () {
        if ($scope.newProfileTitle == undefined || $scope.newProfileTitle == "") {

            $scope.errorEmpty = true;
            $scope.errorExist = false;
        }
        else {
            if (!$scope.doesExist($scope.newProfileTitle, -1)) {
                repository.profile.create({ Title: $scope.newProfileTitle, UserId: $scope.currentUserId }, function (x) {
                    $scope.profiles.push(x);
                });
                $scope.errorEmpty = false;
                $scope.errorExist = false;
                $scope.newProfileTitle = "";
            }
            else {

                $scope.errorExist = true;
                $scope.errorEmpty = false;
            }

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
        $scope.errorEmpty = false;
        $scope.errorExist = false;
    };

    $scope.saveEdited = function (index) {
        if ($scope.newEditedTitle.Title == undefined || $scope.newEditedTitle.Title == "") {

            $scope.errorEmpty = true;
            $scope.errorExist = false;
        }
        else if (!$scope.doesExist($scope.newEditedTitle.Title, index)) {
            console.log("mes");
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
            $scope.errorEmpty = false;
            $scope.errorExist = false;
        }
        else {

            $scope.errorExist = true;
            $scope.errorEmpty = false;
        }
    };
});