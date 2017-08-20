const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    thumbnail: { type: String },
    title: { type: String },
    author: { type: String },
    publishedDate: { type: String },
    pageCount: { type: String },
    description: { type: String },
    rating: {type: String},
    owner: { type: String },
    requestedBy: { type: String, default: ''},
    status: { type: String, default: ''}
});

const Book = mongoose.model('book', bookSchema);

module.exports = Book;