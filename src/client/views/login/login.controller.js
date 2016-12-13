
    'use strict';

    angular
        .module('sbAdminApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', 'AuthenticationService', 'FlashService'];
    function LoginController($state, AuthenticationService, FlashService) {
        var vm = this;

        vm.login = login;
        vm.error = false;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password, response.user.idemployee);
                    $state.go('dashboard.home');
                } else {
                    vm.error = true;
                    FlashService.Error(response.message);

                    vm.dataLoading = false;
                }
            });
        };
    }
