const books = require("google-books-search");
const express = require('express');
const router = express.Router();
const User = require('../models/users.model');
const Book = require('../models/books.model');

var options = {
    limit: 40
};

router.get('/', function (req, res) {
    if (req.session && req.session.user) {
        res.render("add",{
            authenticated: true,
            info: books,
            results: {}
        });
    }
    else{
        res.status(401).send('You must be logged in to access this page');
    }
});
router.post("/", function(req,res){
    console.log(res.body);
        books.search(req.body.search, options, function(error, results) {
            if ( ! error ) {
                res.render("add",{
                    authenticated: true,
                    info: books,
                    results: results
                });    
            }
            else {
                console.log(error);
            }
        });
});
module.exports = router;