const books = require("google-books-search");
const express = require('express');
const router = express.Router();
const Book = require('../models/books.model');
var bookInfo = [];

router.get('/', function (req, res) {
    bookInfo = [];
    if (req.session && req.session.user) {
        Book.find({owner: {$ne: req.session.user.username}, requestedBy: "", borrowedBy: ""}, function(err, books){
            if(err){
                console.log(err);
            }
            for(var i = 0; i < books.length; i++){
                bookInfo.push({
                    thumbnail: books[i].thumbnail,
                    title: books[i].title,
                    author: books[i].author,
                    publishedDate: books[i].publishedDate,
                    pageCount: books[i].pageCount,
                    description: books[i].description,
                });
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
                bookInfo.push({
                    thumbnail: books[i].thumbnail,
                    title: books[i].title,
                    author: books[i].author,
                    publishedDate: books[i].publishedDate,
                    pageCount: books[i].pageCount,
                    description: books[i].description
                });
            }
            res.render('books', {
                authenticated: false,
                info: bookInfo
            })
        })
    }
});

router.post("/", function(req, res){
    Book.findOneAndUpdate({title: req.body.title},    
        {
            status: "requested",
            requestedBy: req.session.user.username
        },
        {new: true},
        function(err, book){
            if(err){
                console.log(err);
            }
        }
    );
    console.log(req.body.title);
    Book.find({}, function(err, books){
            for(var i = 0; i < books.length; i++){
                bookInfo.push({
                    thumbnail: books[i].thumbnail,
                    title: books[i].title,
                    author: books[i].author,
                    publishedDate: books[i].publishedDate,
                    pageCount: books[i].pageCount,
                    description: books[i].description
                });
            }
            res.render('books', {
                authenticated: true,
                info: bookInfo
            })
        })
})
module.exports = router;