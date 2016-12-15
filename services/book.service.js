var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('Books');

var service = {};

service.getAll = getAll;


module.exports = service;


function getAll() {
    var deferred = Q.defer();

    db.Books.find().toArray(function (err, books) {

        if (err) deferred.reject(err.name + ': ' + err.message);

        if (books) {
            // return books (without hashed password)
            deferred.resolve(_.omit(books, 'hash'));
        } else {
            // books not found
            deferred.resolve();
        }
        
    });

    return deferred.promise;
}