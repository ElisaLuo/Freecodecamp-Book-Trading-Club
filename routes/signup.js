const express = require('express');
const router = express.Router();
const User = require("../models/users.model");

router.get('/', function (req, res) {
    if (req.session && req.session.user) {
        res.status(401).send('You are already logged in');
    } else {
        res.render('signup', { authenticated: false, error: false });
    }
});

router.post('/', function (req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {
        if(err){
            console.log(err);
        }
        if (!user) {
            const newMember = new User({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                location: req.body.place
            }).save(function (err, user) {
                if(err){
                    console.log(err);
                }
                req.session.user = user; //Sets user up in local cookie
                res.redirect('/');
            });
        }
        else if(user) {
            res.render('signup', {
                error: true,
                errorMessage: 'Username already exists',
                authenticated: false
            });
        }
    });

});


module.exports = router;