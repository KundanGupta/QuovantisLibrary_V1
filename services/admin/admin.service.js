var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('Books');
db.bind('Category');

var service = {};

service.AddBookToLibrary = AddBookToLibrary;
service.GetAllCategory = GetAllCategory;

module.exports = service;


function AddBookToLibrary(bookParam) {
    var deferred = Q.defer();

    // validation
    db.Books.findOne(
        { ISBN: bookParam.ISBN },
        function (err, book) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (book) {
                // ISBN already exists
                deferred.reject('ISBN "' + bookParam.ISBN + '" is already taken');
            } else {
                addNewBook();
            }
        });

    function addNewBook() {
        // set book object to bookParam without the cleartext password
        var book = _.omit(bookParam);

        // add hashed password to book object
        //book.hash = bcrypt.hashSync(bookParam.password, 10);

        db.Books.insert(
            book,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function GetAllCategory(){
    var deferred = Q.defer();

    db.Category.find().toArray(function (err, categories) {

        if (err) deferred.reject(err.name + ': ' + err.message);

        if (categories) {
            deferred.resolve(_.omit(categories));
        } else {
            // categories not found
            deferred.resolve();
        }
        
    });

    return deferred.promise;
}