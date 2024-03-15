const express = require('express');
const router = express.Router();
const passport = require('../config/passport-config');
const bcrypt = require('bcrypt');
const Books = require('../models/book');

router.get('/all-books-from-database', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      if (req.user.role !== 'admin' && req.user.role !== 'premium' && req.user.role !== 'regular') {
        return res.status(403).json({ error: 'Not authorized' });
      }
  
      const books = await Books.find({});
      res.json(books);
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.post('/add-book-to-database', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized' });
          }
      const { Name, Author, User_Rating, Review, Price, Year } = req.body;
      const existingUser = await Books.findOne({ Name });
  
      if (existingUser) {
        return res.status(400).json({ error: 'Book already exists!' });
      }
  
      const bookLog = new Books({
        Name,
        Author,
        User_Rating,
        Review,
        Price,
        Year
      });
  
      await bookLog.save();
  
      res.status(201).json({ message: 'Book added successfully' });
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.put('/update-book-in-database/:bookname', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized' });
        }
  
        const { bookname } = req.params;
        const decodedBookName = decodeURIComponent(bookname);
        const { Name, Author, User_Rating, Review, Price, Year, Genre } = req.body;
  
        if (Name || Author || User_Rating || Review || Price || Year || Genre) {
            const updateFields = {};
            if (Name) {
                updateFields.Name = Name;
            }
            if (Author) {
                updateFields.Author = Author;
            }
            if (User_Rating >= 0 && User_Rating <=5) {
                updateFields.User_Rating = User_Rating;
            }
            else {
                return res.status(401).json({ error: 'User Rating must be between 0 and 5 stars!' });
            }
            if (Review >= 0) {
                updateFields.User_Rating = User_Rating;
            }
            else {
                return res.status(401).json({ error: 'Reviews must be a positive value!' });
            }
            if (Price > 0) {
                updateFields.Review = Review;
            }
            else {
                return res.status(401).json({ error: 'Price must be a positive value!' });
            }
            if (Year >= 1800 && Year <= 2030) {
                updateFields.Year = Year;
            }
            else {
                return res.status(401).json({ error: 'Year must be valid!' });
            }
            if (Genre) {
                updateFields.Genre = Genre;
            }
            await Books.findOneAndUpdate(
                { decodedBookName },
                { $set: updateFields }
            );
        }
  
        res.json({ message: 'Book details updated successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  });



  router.delete('/delete-book-from-database/:bookname', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {       
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized' });
        }

        const { bookname } = req.params;
        const decodedBookName = decodeURIComponent(bookname);
  
        const existingBook = await Books.findOne({ Name: decodedBookName });

        if (!existingBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
  
        await Books.findOneAndDelete({ decodedBookName });
  
        res.json({ message: 'Book deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  });


  
  module.exports = router;


