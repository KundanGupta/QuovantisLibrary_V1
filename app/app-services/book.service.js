(function () {
    'use strict';

    angular
        .module('app')
        .factory('BookService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetAllBooks = GetAllBooks;

        return service;


        function GetAllBooks() {
            return $http.get('/api/books/getAllBooks').then(handleSuccess, handleError);
        }

        


        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }

    }

})();
