var app = angular.module("sbAdminApp")
app.controller('EmployeeEditCtrl', 
 ['$scope', '$timeout', '$modalInstance', 'Employee',
 function ($scope, $timeout, $modalInstance, Employee) {

    $scope.employee = Employee.currentEmployee;
    $scope.headerTitle = 'Edit Employee';
    $scope.edit = true;

    $scope.jefes = findJefes();

    $scope.findJefes = findJefes;

    function findJefes(){
       Employee.Jefes($scope.employee.area)
                .then(function (data) {
                    $scope.jefes = Employee.jefes;
                    //elimino el actual porq no puede ser jefe de si mismo
                    for(i=0;i<$scope.jefes.length;i++){
                        if($scope.jefes[i]._id == $scope.employee._id){
                          $scope.jefes.splice(i, 1);
                        }
                    }
                });
    }

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

    $scope.save = function () {
            Employee.Update($scope.employee).then(function (response) {
                $modalInstance.close(response.data);
            })        
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

}]); 