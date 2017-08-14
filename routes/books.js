const books = require("google-books-search");
const express = require('express');
const router = express.Router();
const Book = require('../models/books.model');
var bookInfo = [];

router.get('/', function (req, res) {
    bookInfo = [];
    if (req.session && req.session.user) {
        Book.find({owner: {$ne: req.session.user.username}}, function(err, books){
            if(err){
                console.log(err);
            }
            for(var i = 0; i < books.length; i++){
                bookInfo.push(books[i].bookInfo);
            }
            res.render('books', {
                authenticated: true,
                info: bookInfo
            })
        })
    }
    else{
        bookInfo = [];
        Book.find({}, function(err, books){
            for(var i = 0; i < books.length; i++){
                bookInfo.push(books[i].bookInfo);
            }
            res.render('books', {
                authenticated: false,
                info: bookInfo
            })
        })
    }
});

module.exports = router;