(function () {
    'use strict';

    angular
        .module('app')
        .controller('Book.IndexController', Controller);

    function Controller(BookService) {
        var vm = this;

        vm.books = null;

        initController();

        function initController() {
            // get all books
            BookService.GetAllBooks().then(function (books) {
                vm.books = books;
            });
        }
        // Private Methods
        vm.IsBookAvailable= function(isAvailable){
            return (isAvailable) ? 'available' : 'not-available';
        }

    }

})();