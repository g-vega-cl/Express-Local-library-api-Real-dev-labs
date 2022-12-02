var express = require('express');
var dbo = require('../db/conn');
var axios = require('axios');
var fetchBooksRoutes = express.Router();

// Interfaces if we were using typescript
// interface IGutenmbergAuthor {
//     name: string;
//     birth_year: number;
//     death_year: any; // figure out what happens if author is still alive.
//   }

//   interface IGutenbergBook {
//     "id": number;
//     "title": string;
//     "authors": IGutenmbergAuthor[];
//     "translators": any;
//     "subjects": any;
//     "bookshelves": any;
//     "languages": string[];
//     "copyright": boolean;
//     "media_type": string;
//     "formats": any;
//     "download_count": number;
//   }

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
