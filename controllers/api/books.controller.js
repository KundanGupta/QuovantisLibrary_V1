var config = require('config.json');
var express = require('express');
var router = express.Router();
var bookService = require('services/book.service');

// routes
router.get('/getAllBooks', getAllBooks);

module.exports = router;

function getAllBooks(req, res) {
    bookService.getAll()
        .then(function (books) {
            if (books) {
                res.send(books);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}