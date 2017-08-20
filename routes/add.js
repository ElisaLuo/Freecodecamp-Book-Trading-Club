const books = require("google-books-search");
const express = require('express');
const router = express.Router();
const User = require('../models/users.model');
const Book = require('../models/books.model');
var term = [];
var bookss = [];

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
    term.push(req.body.search);
    term = term.filter(Boolean);
    if(req.body.title == undefined){
        console.log("a");
    }else{
        const newBook = new Book({
            thumbnail: req.body.image,
            title: req.body.title,
            author: req.body.author,
            publishedDate: req.body.date,
            pageCount: req.body.pages,
            description: req.body.description,
            rating: req.body.rating,
            owner: req.session.user.username
        }).save(function (err, poll) {
            if (err) throw err;
        });
    }
    books.search(term[term.length - 1], options, function(error, results) {
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