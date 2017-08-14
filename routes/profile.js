const books = require("google-books-search");
const express = require('express');
const router = express.Router();
const User = require('../models/users.model');
const Book = require('../models/books.model');
var myBooks = [];
var requestedBooks = [];
var requestes = [];

var options = {
    limit: 40
};

router.get('/', function (req, res) {
    if (req.session && req.session.user) {
        Book.find({ owner: req.session.user.username || req.session.user }, function(err, books){
            if(err){
                console.log(err);
            }
            myBooks = [];
            for(var i = 0; i < books.length; i++){
                myBooks.push({
                    thumbnail: books[i].thumbnail,
                    title: books[i].title,
                    author: books[i].author,
                    publishedDate: books[i].publishedDate,
                    pageCount: books[i].pageCount,
                    description: books[i].description,
                });
            }
            myBooks = myBooks.filter(Boolean);
        });
        Book.find({ requestedBy: req.session.user.username || req.session.user }, function(err, books){
            if(err){
                console.log(err);
            }
            requestedBooks = [];
            for(var i = 0; i < books.length; i++){
                requestedBooks.push({
                    thumbnail: books[i].thumbnail,
                    title: books[i].title,
                    author: books[i].author,
                    publishedDate: books[i].publishedDate,
                    pageCount: books[i].pageCount,
                    description: books[i].description,
                });
            }
            requestedBooks = requestedBooks.filter(Boolean);
        });
        Book.find({owner: req.session.user.username, status: "requested"}, function(err, books){
            if(err){
                console.log(err);
            }
            requestes = [];
            for(var i = 0; i < books.length; i++){
                requestes.push({
                    thumbnail: books[i].thumbnail,
                    title: books[i].title,
                    author: books[i].author,
                    publishedDate: books[i].publishedDate,
                    pageCount: books[i].pageCount,
                    description: books[i].description,
                });
            }
            requestes = requestes.filter(Boolean);
            res.render("profile",{
                authenticated: true,
                info: myBooks,
                requested: requestedBooks,
                requests: requestes
            });
        });
        
    }
    else{
        res.status(401).send('You must be logged in to access this page');
    }
});
router.delete('/', function (req, res) {
    console.log(req.headers);
    if(req.headers.book !== ""){
        Book.remove({owner: req.session.user.username, title: req.headers.book}, function(err){
            if(err){
                console.log(err);
            }
        });
    }
    
    res.render("profile",{
        authenticated: true,
        info: myBooks,
        requested: requestedBooks,
        requests: requestes
    });
});
module.exports = router;