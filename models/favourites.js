const fs = require('fs');
const path = require('path');
const Book = require('./book');

const favBooksPath = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'favourites.json'
);

const getBooksFromFile = (cb, p) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Favourites {
  static fetchAllFavouriteBooks(cb) {
    getBooksFromFile(cb, favBooksPath);
  }

  static addToFavourite(bookId, cb) {
    getBooksFromFile((favBooks) => {
      const doesExist = favBooks.some((favBook) => favBook.id === bookId);

      if (doesExist) {
        cb(null);
      } else {
        Book.fetchAllBooks((books) => {
          const book = books.find((book) => book.id === bookId);

          // code for adding book to fav-file
          fs.writeFile(
            favBooksPath,
            JSON.stringify([...favBooks, book]),
            (err) => {
              console.log(err);
              cb(err);
            }
          );
        });
      }
    }, favBooksPath);
  }

  static removeFromFavourite(bookId, cb) {
    getBooksFromFile((favBooks) => {
      const doesExist = favBooks.some((favBook) => favBook.id === bookId);

      if (!doesExist) {
        cb(true);
      } else {
        // code for removing book from fav-file
        fs.writeFile(
          favBooksPath,
          JSON.stringify(favBooks.filter((favBook) => favBook.id !== bookId)),
          (err) => {
            console.log(err);
            cb(err);
          }
        );
      }
    }, favBooksPath);
  }
};
