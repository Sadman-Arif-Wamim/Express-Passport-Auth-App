const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    Name:String,
    Author:String,
    User_Rating:Number,
    Review: Number,
    Price: Number,
    Year: Number,
    Genre: String,

});

const Books = mongoose.model("books", bookSchema);

module.exports = Books;