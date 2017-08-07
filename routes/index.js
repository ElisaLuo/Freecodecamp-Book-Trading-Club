const books = require("google-books-search");
const express = require('express');
const router = express.Router();
const User = require('../models/users.model');

router.get('/', function (req, res) {
    res.render('index');
});

/*var options = {
    limit: 40
};

books.search("Professional JavaScript for Web Developers", options, function(error, results, apiResponse) {
    if ( ! error ) {
        console.log(results);
    } else {
        console.log(error);
    }
});*/

module.exports = router;