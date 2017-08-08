const books = require("google-books-search");
const express = require('express');
const router = express.Router();

var options = {
    limit: 40
};
router.get('/', function (req, res) {
    books.search("javascript", options, function(error, results) {
        if ( ! error ) {
            res.render('books',{info: results});
        }
        else {
            console.log(error);
        }
    });
});

router.post('/', function (req, res) {
    books.search(req.body.search, options, function(error, results) {
        if ( ! error ) {
            res.render('books',{info: results});
        }
        else {
            console.log(error);
        }
    });
});


module.exports = router;