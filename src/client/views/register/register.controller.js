
    'use strict';

    angular
        .module('sbAdminApp')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$state', '$rootScope', 'FlashService'];
    function RegisterController(UserService, $state, $rootScope, FlashService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $state.go('login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

