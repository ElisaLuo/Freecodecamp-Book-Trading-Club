const books = require("google-books-search");
const express = require('express');
const router = express.Router();
const User = require('../models/users.model');
const Book = require('../models/books.model');
var myBooks = [];
var requestedBooks = [];
var requestes = [];
var borrowed = [];

var options = {
    limit: 40
};

router.get('/', function (req, res) {
    if (req.session && req.session.user) { 
        //Get my books
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
        //Get requested books
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
                    description: books[i].description
                });
            }
            requestedBooks = requestedBooks.filter(Boolean);
        });
        //Get requests
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
                    description: books[i].description
                });
            }
            requestes = requestes.filter(Boolean);
        });
        //Get borrowed books
        Book.find({"borrowedBy": req.session.user.username}, function(err, books){
            if(err){
                console.log(err)
            }
            borrowed = [];
            for(var i = 0; i < books.length; i++){
                borrowed.push({
                    thumbnail: books[i].thumbnail,
                    title: books[i].title,
                    author: books[i].author,
                    publishedDate: books[i].publishedDate,
                    pageCount: books[i].pageCount,
                    description: books[i].description
                })
            }
            borrowed = borrowed.filter(Boolean);
            res.render("profile",{
                authenticated: true,
                info: myBooks,
                requested: requestedBooks,
                requests: requestes,
                borrowed: borrowed
            });
        })
        
    }
    else{
        res.status(401).send('You must be logged in to access this page');
    }
});
router.delete('/', function (req, res) {
    //My book delete 
    if(req.headers.book !== ""){
        Book.remove({owner: req.session.user.username, title: req.headers.book}, function(err){
            if(err){
                console.log(err);
            }
        });
    }
    //Requested take back and ignore request
    if(req.headers.requested !== ""){
        Book.findOneAndUpdate({title: req.headers.requested, status: "requested"},
        {$set:{'requestedBy': "", 'status': ""}}, {new: true}, function(err){
            if(err){
                console.log(err);
            }
        })
    }
    //Allow others to borrow
    if(req.headers.allow !== ""){
        Book.findOneAndUpdate({title: req.headers.allow, status: "requested"},
        {$set: {'requestedBy': "", 'status': "borrowed", 'borrowedBy': req.session.user.username}}, {new: true}, function(err){
            if(err){
                console.log(err);
            }
        })
    }
    res.render("profile",{
        authenticated: true,
        info: myBooks,
        requested: requestedBooks,
        requests: requestes
    });
});
module.exports = router;