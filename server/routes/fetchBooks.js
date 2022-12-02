var express = require('express');
var dbo = require('../db/conn');
var axios = require('axios');
var fetchBooksRoutes = express.Router();

fetchBooksRoutes.route('/books').get(async (req, res) => {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection('books')
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching books!');
      } else {
        res.status(200).json(result);
      }
    });
});

// This route should only run once when populating the database.
fetchBooksRoutes.route('/fetchBooks').get(async (_req, res) => {
  var dbConnect = dbo.getDb();
  const books = await axios
    .get('https://gutendex.com/books')
    .then(function (response) {
      return response.data.results;
    });
  const booksToSave = [];
  books.forEach((book) => {
    const trimmedBook = {
      id: book.id,
      title: book.title,
      firstAuthor: book.authors[0].name, //Assuming books have at least one author.
      available: true, //The users need to check for returned.
    };
    booksToSave.push(trimmedBook);
  });

  dbConnect.collection('books').insertMany(booksToSave, (err, result) => {
    if (err) {
      res.status(400).send('Error inserting books!');
    } else {
      res.status(204).send(`Books added ${result}`);
    }
  });
});

module.exports = fetchBooksRoutes;
