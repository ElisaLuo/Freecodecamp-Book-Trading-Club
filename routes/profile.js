const books = require("google-books-search");
const express = require('express');
const router = express.Router();
const User = require('../models/users.model');
const Book = require('../models/books.model');

var options = {
    limit: 1
};

router.get('/', function (req, res) {
    if (req.session && req.session.user) {
        Book.find({ owner: req.session.user.username || req.session.user }, function(err, book){
            if(err){
                console.log(err);
            }
            books.search("javascript", options, function(error, results) {
                if ( ! error ) {
                    res.render("profile",{
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
        
    }
    else{
        res.status(401).send('You must be logged in to access this page');
    }
});

module.exports = router;