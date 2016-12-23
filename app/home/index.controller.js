(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller(UserService) {
        var vm = this;

        vm.user = null;
        vm.showAdmin = false;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
                // if(user.FK_RoleId == 1){
                //     vm.showAdmin = true;    
                // }

            });
        }
    }

})();