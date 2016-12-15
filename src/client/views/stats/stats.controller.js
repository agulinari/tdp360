'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('StatsCtrl', ['$scope', '$timeout', 'Employee', 'Instance', function ($scope, $timeout, Employee, Instance) {

var vm = this;
 $scope.employees = searchEmployees();
 $scope.evaluado = null;
 medias();

             function searchEmployees() {
                //Employee.Search($scope.searchText)
                Employee.Find()
                .then(function (data) {
                    $scope.employees = Employee.employees;
                });
            };

$scope.update = function(evaluado) {
                   Instance.Stats(evaluado)
                .then(function (data) {
                    var insts = Instance.instances;
                    
                    var acumcom = 0;
                    var icom = 0;
                    var promcom = 0;                

                    var acumlid = 0;
                    var ilid = 0;
                    var promlid = 0;                 
                    
                    var acumfh = 0;
                    var ifh = 0;
                    var promfh = 0;                 

                    var acumhab = 0;
                    var ihab = 0;
                    var promhab = 0;

                    var acumdes = 0;
                    var ides = 0;
                    var promdes = 0;               

                    insts.forEach(function (inst){                    
                         inst.comunicacion.forEach(function (com){
                            acumcom = acumcom + com.puntaje;
                            icom++;
                         });
                         inst.liderazgo.forEach(function (com){
                            acumlid = acumlid + com.puntaje;
                            ilid++;
                         });
                         inst.factorhumano.forEach(function (com){
                            acumfh = acumfh + com.puntaje;
                            ifh++;
                         });
                         inst.habilidades.forEach(function (com){
                            acumhab = acumhab + com.puntaje;
                            ihab++;
                         });
                         inst.desempenio.forEach(function (com){
                            acumdes = acumdes + com.puntaje;
                            ides++;
                         });
                    });
                    if (icom != 0){
                        promcom = (acumcom*5)/icom;                        
                    }
                    if (ilid != 0){
                        promlid = (acumlid*5)/ilid;
                    }
                    if (ifh != 0){
                        promfh = (acumfh*5)/ifh;
                    }
                    if (ihab != 0){
                        promhab = (acumhab*5)/ihab;
                    }
                    if (ides != 0){
                        promdes = (acumdes*5)/ides;
                    }

                   vm.radar.data[0] = [promcom, promdes, promfh, promlid, promhab];

                   var rand = evaluado.charCodeAt(6) % 5;
                   switch (rand){
                    case 0:
                        vm.line.data[0] = [65, 59, 80, 81, 56, 55, 40];
                        vm.bar.data[0] = [23, 13, 67, 54];
                        vm.pie.data = [200, 400, 200];
                        break;
                    case 1:
                        vm.line.data[0] = [12, 76, 24, 46, 24, 31, 66];
                        vm.bar.data[0] = [25, 64, 60, 20];
                        vm.pie.data = [300, 500, 100];
                        break;
                    case 2:
                        vm.line.data[0] = [87, 23, 13, 53, 46, 24, 67];
                        vm.bar.data[0] = [65, 76, 13, 22];
                        vm.pie.data = [50, 50, 700];
                        break;
                    case 3:
                        vm.line.data[0] = [23, 85, 80, 81, 24, 90, 43];
                        vm.bar.data[0] = [53, 23, 76, 26];
                        vm.pie.data = [50, 650, 150];
                        break;
                    case 4:
                        vm.line.data[0] = [12, 23, 80, 8, 15, 47, 32];
                        vm.bar.data[0] = [42, 45, 34, 88];
                        vm.pie.data = [300, 300, 300];
                        break;
                    default:
                        vm.line.data[0] = [31, 36, 23, 81, 86, 87, 10];
                        vm.bar.data[0] = [90, 46, 77, 29];
                        vm.pie.data = [400, 100, 400];
                        break;
                   }
      
                });
}





    vm.line = {
	    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
	    series: ['Empleado', 'Media'],
	    data: [
	      [0, 0, 0, 0, 0, 0, 0],
	      [28, 48, 40, 19, 86, 27, 90]
	    ],
	    onClick: function (points, evt) {
	      console.log(points, evt);
	    }
    };

    vm.bar = {
	    labels: ['Jefe inmediato', 'Subalterno', 'Colega o Par', 'Subordinado'],
		series: ['Empleado', 'Media'],

		data: [
		   [0, 0, 0, 0],
		   [28, 48, 40, 19]
		]
    	
    };


    vm.radar = {
    	labels:["Comunicación", "Desempeño", "Factor Humano", "Liderazgo", "Habilidades"],

    	data:[
    	    [0, 0, 0, 0, 0],
    	    [28, 48, 40, 19, 96]
    	]
    };

    vm.pie = {
    	labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
    	data : [300, 500, 100]
    };


    function medias() {
                   Instance.Find()
                .then(function (data) {
                    var insts = Instance.instances;
                    
                    var acumcom = 0;
                    var icom = 0;
                    var promcom = 0;                

                    var acumlid = 0;
                    var ilid = 0;
                    var promlid = 0;                 
                    
                    var acumfh = 0;
                    var ifh = 0;
                    var promfh = 0;                 

                    var acumhab = 0;
                    var ihab = 0;
                    var promhab = 0;

                    var acumdes = 0;
                    var ides = 0;
                    var promdes = 0;               

                    insts.forEach(function (inst){
                         if (inst.status === 'F'){                    
                             inst.comunicacion.forEach(function (com){
                                acumcom = acumcom + com.puntaje;
                                icom++;
                             });
                             inst.liderazgo.forEach(function (com){
                                acumlid = acumlid + com.puntaje;
                                ilid++;
                             });
                             inst.factorhumano.forEach(function (com){
                                acumfh = acumfh + com.puntaje;
                                ifh++;
                             });
                             inst.habilidades.forEach(function (com){
                                acumhab = acumhab + com.puntaje;
                                ihab++;
                             });
                             inst.desempenio.forEach(function (com){
                                acumdes = acumdes + com.puntaje;
                                ides++;
                             });
                        }
                    });
                    if (icom != 0){
                        promcom = (acumcom*5)/icom;                        
                    }
                    if (ilid != 0){
                        promlid = (acumlid*5)/ilid;
                    }
                    if (ifh != 0){
                        promfh = (acumfh*5)/ifh;
                    }
                    if (ihab != 0){
                        promhab = (acumhab*5)/ihab;
                    }
                    if (ides != 0){
                        promdes = (acumdes*5)/ides;
                    }

                   vm.radar.data[1] = [promcom, promdes, promfh, promlid, promhab];
        
      
                });
}


}]);