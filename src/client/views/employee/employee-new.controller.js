var app = angular.module("sbAdminApp")
app.controller('EmployeeNewCtrl', 
 ['$scope', '$timeout', '$modalInstance', 'Employee',
 function ($scope, $timeout, $modalInstance, Employee) {

    $scope.employee = {};
    $scope.headerTitle = 'Add Employee';
    $scope.jefes = [];
    $scope.edit = false;

    $scope.findJefes = function(){
       Employee.Jefes($scope.employee.area)
                .then(function (data) {
                    $scope.jefes = Employee.jefes;
                });
    }

    $scope.save = function () {
            Employee.Create($scope.employee).then(function (response) {
                $modalInstance.close(response.data);
            })        
    };

    $scope.fileReaderSupported = window.FileReader != null;
    $scope.photoChanged = function(files) {
      if (files != null) {
        var file = files[0];
         if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
          $timeout(function() {
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file); // convert the image to data url. 
            fileReader.onload = function(e) {
              $timeout(function() {
                $scope.employee.image = e.target.result; // Retrieve the image. 
              });
            }
          });
        }
      }
    };


    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]); 