var config = require('config.json');
var express = require('express');
var router = express.Router();
var adminService = require('services/admin/admin.service');

// routes
router.post('/AddNewBookToLibrary', AddBookToLibrary);
router.get('/GetAllCategory', GetAllCategory);

module.exports = router;

function AddBookToLibrary(req, res) {
    adminService.AddBookToLibrary(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function GetAllCategory(req, res){
	adminService.GetAllCategory()
		.then(function (categories) {
			if (categories) {
                res.send(categories);
            } else {
                res.sendStatus(404);
            }
		})
		.catch(function (err){
			res.status(400).send(err);
		});
}
