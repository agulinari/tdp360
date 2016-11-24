var app = angular.module("sbAdminApp")
app.controller('EmployeeEvalCtrl', 
 ['$scope', '$stateParams', '$modalInstance', 'Employee', 'Eval', 'Instance',
 function ($scope, $stateParams, $modalInstance, Employee, Eval, Instance) {

    $scope.eval = {};
    var idEvaluador = $stateParams.employeeId;
    var idEvaluado = $stateParams.idEvaluado;
    
    function findEvaluado(id){
        Employee.Detail(id)
            .then(function (data) {
                $scope.eval.evaluado = Employee.currentEmployee;                
            });
    }

    function findEvaluador(id){
        Employee.Detail(id)
            .then(function (data) {
                $scope.eval.evaluador = Employee.currentEmployee;                
            });
    }

    function findEvals(){
       Eval.Find()
                .then(function (data) {
                    $scope.evals = Eval.evals;
                });
    }

    $scope.assign = function () {
            var instance = {};
            instance.evaluador = $scope.eval.evaluador._id;
            instance.evaluado = $scope.eval.evaluado._id;
            instance.evaluacion = $scope.eval._id;
            instance.comunicacion =  [];
            instance.desempenio = [];
            instance.factorhumano = [];
            instance.liderazgo = [];
            instance.habilidades = [];
            Instance.Create(instance).then(function (response) {
                $modalInstance.close(response.data);
            })        
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.evals = findEvals();
    $scope.eval.evaluador = findEvaluador(idEvaluador);
    $scope.eval.evaluado = findEvaluado(idEvaluado);

}]); 