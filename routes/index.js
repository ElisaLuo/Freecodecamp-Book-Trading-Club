const express = require('express');
const router = express.Router();
const User = require('../models/users.model');


router.get('/', function (req, res) {
    if (req.session && req.session.user) {
        User.findOne({ username: req.session.user.username }, function (err, user) {
            res.locals.user = user || req.session.user;
            res.render('index', { authenticated: true });
        });
    } else {
        res.locals.authenticated = false;
        res.render('index');
    }

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