const express = require('express');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const userRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

const updateBookAvailability = (dbConnect, bookId, res) => {
  dbConnect
    .collection('books')
    .findOneAndUpdate(
      { id: bookId },
      { $set: { available: false } },
      { upsert: true },
      (err, _) => {
        if (err) {
          res.status(400).send(`Error updating availability, ${err}`);
        } else {
          res.status(200).send(`updated book availability`); // This error messages return [object, object], If I had time I would
        }
      }
    );
};

userRoutes.route('/users/books').get(async (req, res) => {
  const dbConnect = dbo.getDb();
  const user = await dbConnect
    .collection('users')
    .findOne({ username: req.query.username });

  if (!user) {
    res.status(200).send(`This user does not exist`);
    return;
  }

  //Fetch the book names. I want to make sure we don't have many sources of truth, that's why I didn't add the name of the book to the user.reservedBooks array
  const bookIdAndTitleArray = [];

  for (let i = 0; i < user.reservedBooks.length; i++) {
    const bookId = Number(user.reservedBooks[i]); //Making sure we have number returned. //Could be redundant.
    const book = await dbConnect.collection('books').findOne({ id: bookId });

    bookIdAndTitleArray.push({ bookId: book.id, bookName: book.title });
  }

  res.status(200).send(bookIdAndTitleArray);
});

// This section will help you update a record by id.
// Putting everything into individual decoupled functions would be nice.
userRoutes.route('/users/reservation').post(async (req, res) => {
  const dbConnect = dbo.getDb();
  const { username, bookId } = req.query; //It says it needs the book first author and title, I decided to use ID instead because of time.
  const bookIdNumber = Number(bookId); // This should not be neccessary??
  if (!username || !bookIdNumber) {
    res
      .status(200)
      .send(`Missing username: ${username} or bookId: ${bookIdNumber}`);
    return;
  }

  const existingUser = await dbConnect
    .collection('users')
    .findOne({ username: username });

  const book = await dbConnect
    .collection('books')
    .findOne({ id: bookIdNumber });

  if (!book) {
    res.status(200).send(`That book does not exist`);
    return;
  }

  if (!book.available) {
    res
      .status(200)
      .send(
        `This book is not available, ask your librarian to pressure whoever has it.`
      );
    return;
  }

  if (!existingUser) {
    const newUser = {
      username: username,
      reservedBooks: [bookIdNumber],
    };

    await dbConnect.collection('users').insertOne(newUser, (err, _) => {
      if (err) {
        res.status(400).send('Error inserting username!');
        return; //CHECK IF NEEDED
      } else {
        return updateBookAvailability(dbConnect, bookIdNumber, res);
      }
    });
    return;
  } else {
    // COULD REMOVE WITH RETURN???, BUT NEEDS TESTING.
    dbConnect
      .collection('users')
      .findOneAndUpdate(
        { username: username },
        {
          $set: {
            reservedBooks: [...existingUser.reservedBooks, bookIdNumber],
          },
        },
        { upsert: true },
        (err, _) => {
          if (err) {
            res.status(400).send('Error inserting username!');
          } else {
            return updateBookAvailability(dbConnect, bookIdNumber, res);
          }
        }
      );
  }
});

module.exports = userRoutes;
