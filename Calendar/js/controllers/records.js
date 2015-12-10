angular.module('calendar')
.controller('records', function ($scope, repository, $routeParams) {

    var monthNames = ['Січня', 'Лютого', 'Березня', 'Квітня', 'Травня', 'Червня', 'Липня', 'Серпня', 'Вересня', 'Жовтня', 'Листопада', 'Грудня'];
    $scope.date = {
        day: $routeParams.day,
        monthName: monthNames[$routeParams.month - 1],
        year: $routeParams.year
    };


    var fillRecords = function (records) {
        $scope.records = records;
    }
    repository.profile.getById($routeParams.profile, function (profile) {
        $scope.currentProfile = profile;
    })
    repository.records.getByIDForYearMonthDay(
        $routeParams.profile,
        $routeParams.year,
        $routeParams.month,
        $routeParams.day,
        function (records) {
            fillRecords(records);

        });
    $scope.addRecord = function (text) {
        repository.record.create({
            Text: text,
            ProfileId: $routeParams.profile,
            Date: new Date(Date.UTC($scope.date.year, $routeParams.month - 1, $scope.date.day))
        }, function (record) {
            $scope.records.push(record);
            $scope.newRecord = '';
        });

    }


    $scope.errorEmpty = false;

    $scope.errorExist = false;

    $scope.hideErrors = function () {
        $scope.errorEmpty = false;
        $scope.errorExist = false;
    }

    $scope.doesExist = function (x, index) {
        var exist = false;

        for (var i = 0; i < $scope.records.length; i++) {
            if (x == $scope.records[i].Text && i != index) {
                exist = true;
                break;
            }
        }
        return exist;
    }

    

    $scope.DeleteRecord = function (record) {
        if (confirm("Чи дійсно ви хочете видалити?")) {
            repository.record.delById(record.Id, function () {
                var ind = $scope.records.indexOf(record);
                $scope.records.splice(ind, 1);

            });
        }
    };

    $scope.isEditing = false;

    $scope.indexToEdit = -1;

    $scope.newEditedText = {};

    $scope.newEditedText.Text = "";

    $scope.startEdit = function (index) {
        $scope.isEditing = true;
        $scope.indexToEdit = index;
        $scope.newRecordText = {};
        $scope.newRecordText.Text = $scope.records[index].Text;

    }

    $scope.cancelEdit = function (index) {
        $scope.indexToEdit = -1;
        $scope.isEditing = false;
        $scope.newRecordText.Text = $scope.profiles[index].Text;
        $scope.errorEmpty = false;
        $scope.errorExist = false;
    };

    $scope.saveEdited = function (index) {
        if ($scope.newRecordText.Text == undefined || $scope.newRecordText.Text == "") {

            $scope.errorEmpty = true;
            $scope.errorExist = false;
        }
        else
        {
            console.log("mes");
            if ($scope.records[index].Text != $scope.newRecordText.Text) {
                repository.record.putById($scope.records[index].Id, {
                    Id: $scope.records[index].Id,
                    Text: $scope.newRecordText.Text,
                    ProfileId: $routeParams.profile,
                    Date: new Date(Date.UTC($scope.date.year, $routeParams.month - 1, $scope.date.day))
                }, function () { });

                $scope.records[index].Text = $scope.newRecordText.Text;
            }
            $scope.isEditing = false;
            $scope.indexToEdit = -1;
            $scope.errorEmpty = false;
            $scope.errorExist = false;
        }
        
    };

});