//Roman Vovk
angular.module('calendar')
.controller('profiles', function ($scope, repository) {

    //saves profiles into $scope.profiles
    repository.profiles.getForCurrentUser(function (x) {
        $scope.profiles = x;
    });

    //saves current user's id into $scope.currentUserId
    repository.user.getCurrent(function (x) {
        $scope.currentUserId = x.Id;
    });

    $scope.errorEmpty = false;

    $scope.errorExist = false;

    //hides all error messages
    $scope.hideErrors = function () {
        $scope.errorEmpty = false;
        $scope.errorExist = false;
    };

    //checks if profile exists
    //parameters: x - title of the profile
    //            index - index of profile
    $scope.doesExist = function (x, index) {
        var exist = false;

        for (var i = 0; i < $scope.profiles.length; i++) {
            if (x == $scope.profiles[i].Title && i != index) {
                exist = true;
                break;
            }
        }
        return exist;
    };

    //adds new profile to database and profiles array
    $scope.onAddProfileClick = function () {
        if ($scope.newProfileTitle === undefined || $scope.newProfileTitle === "") {

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

    //deletes profile from database and profiles array
    //parameters: index - index of the profile
    $scope.onDeleteButtonClick = function (index) {
        if (confirm("Do you really want to delete this profile?")) {
            repository.profile.delByid($scope.profiles[index].Id, function () {
                $scope.profiles.splice(index, 1);
            });
        }
    };

    $scope.isEditing = false;

    $scope.indexToEdit = -1;

    $scope.newEditedTitle = {};

    $scope.newEditedTitle.Title = "";

    //starts profile editing process
    $scope.startEdit = function (index) {
        $scope.isEditing = true;
        $scope.indexToEdit = index;
        $scope.newEditedTitle.Title = $scope.profiles[index].Title;

    };

    //cancels profile editing process
    $scope.cancelEdit = function (index) {
        $scope.indexToEdit = -1;
        $scope.isEditing = false;
        $scope.newEditedTitle.Title = $scope.profiles[index].Title;
        $scope.errorEmpty = false;
        $scope.errorExist = false;
    };

    //saves edited profile to database and profiles array
    $scope.saveEdited = function (index) {
        if ($scope.newEditedTitle.Title === undefined || $scope.newEditedTitle.Title === "") {

            $scope.errorEmpty = true;
            $scope.errorExist = false;
        }
        else if (!$scope.doesExist($scope.newEditedTitle.Title, index)) {
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