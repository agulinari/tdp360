var app = angular.module("sbAdminApp")
app.controller('EvalNewCtrl', 
 ['$scope', '$modalInstance', 'Eval',
 function ($scope, $modalInstance, Eval) {

    $scope.eval = {
       'titulo' : '',
       'tipo' : '',
       'comunicacion' : [],
       'desempenio' : [],
       'factorhumano' : [],
       'habilidades' : [],
       'liderazgo' : []     
    };
    $scope.headerTitle = 'Nueva Evaluación';

    $scope.save = function () {
            Eval.Create($scope.eval).then(function (response) {
                $modalInstance.close(response.data);
            })        
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.addNewItemComunicacion = function() {
      var newItemNo = $scope.eval.comunicacion.length+1;
      $scope.eval.comunicacion.push({'id': newItemNo});
    };

    $scope.addNewItemDesempenio = function() {
      var newItemNo = $scope.eval.desempenio.length+1;
      $scope.eval.desempenio.push({'id': newItemNo});
    };

    $scope.addNewItemFactorHumano = function() {
      var newItemNo = $scope.eval.factorhumano.length+1;
      $scope.eval.factorhumano.push({'id': newItemNo});
    };

    $scope.addNewItemLiderazgo = function() {
      var newItemNo = $scope.eval.liderazgo.length+1;
      $scope.eval.liderazgo.push({'id': newItemNo});
    };

    $scope.addNewItemHabilidades = function() {
      var newItemNo = $scope.eval.habilidades.length+1;
      $scope.eval.habilidades.push({'id': newItemNo});
    };

}]); 