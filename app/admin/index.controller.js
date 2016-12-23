(function () {
    'use strict';

    angular
        .module('app')
        .controller('Admin.IndexController', Controller);

    function Controller($window, AdminService, BookService, FlashService) {
        var vm = this;

        vm.books = null;
        vm.book = null;
        vm.categories = null;
        vm.saveBook = saveBook;
        vm.deleteBook = deleteBook;

        initController();

        function initController() {
            // get all books
            // BookService.GetAllBooks().then(function (books) {
            //     vm.books = books;
            // });

            // get all category
            AdminService.GetAllCategory().then(function(categories){
                vm.categories = categories;
            });
        }

        function saveBook() {
            AdminService.AddBook(vm.book)
                .then(function () {
                    FlashService.Success('Book added');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function deleteBook() {
            AdminService.Delete(vm.user._id)
                .then(function () {
                    // log user out
                    $window.location = '/login';
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
        
    }

})();