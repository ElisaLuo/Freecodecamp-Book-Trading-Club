const books = require("google-books-search");
const express = require('express');
const router = express.Router();

var options = {
    limit: 40
};
router.get('/', function (req, res) {
    if (req.session && req.session.user) {
        books.search("javascript", options, function(error, results) {
            if ( ! error ) {
                res.render('books',{info: results, authenticated: true});
            }
            else {
                console.log(error);
            }
        });
    }
    else{
        books.search("javascript", options, function(error, results) {
            if ( ! error ) {
                res.render('books',{info: results, authenticated: false});
            }
            else {
                console.log(error);
            }
        });
    }
});

module.exports = router;