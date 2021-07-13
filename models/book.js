const fs = require('fs');
const path = require('path');

const booksPath = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'books.json'
);

const favBooksPath = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'favourites.json'
);

const newBooksPath = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'new-arrivals.json'
);

const popularBooksPath = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'popular.json'
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

module.exports = class Book {
  constructor(id, title, desc) {
    this.id = id;
    this.title = title;
    this.desc = desc;
  }

  static fetchAllBooks(cb) {
    getBooksFromFile(cb, booksPath);
  }

  static fetchAllNewBooks(cb) {
    getBooksFromFile(cb, newBooksPath);
  }

  static fetchAllPopularBooks(cb) {
    getBooksFromFile(cb, popularBooksPath);
  }

  static addBookToFile = (newBook, cb) => {
    getBooksFromFile((books) => {
      const doesExist = books.some((book) => book.title === newBook.title);
      console.log(books, newBook);
      if (doesExist) {
        cb(true);
      } else {
        fs.writeFile(booksPath, JSON.stringify([...books, newBook]), (err) => {
          if (err) return cb(true);

          getBooksFromFile((books) => {
            fs.writeFile(
              newBooksPath,
              JSON.stringify([...books, newBook]),
              (err) => {
                cb(err);
              }
            );
          }, newBooksPath);
        });
      }
    }, booksPath);
  };
};
