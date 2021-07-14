const fs = require('fs');
const path = require('path');

const booksPath = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'books.json'
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

  save(cb) {
    getBooksFromFile((books) => {
      const doesExist = books.some((book) => book.title === this.title);
      console.log(books, this);
      if (doesExist) {
        cb(true);
      } else {
        books.push(this);

        fs.writeFile(booksPath, JSON.stringify(books), (err) => {
          if (err) return cb(true);

          getBooksFromFile((books) => {
            books.push(this);
            fs.writeFile(newBooksPath, JSON.stringify(books), (err) => {
              cb(err);
            });
          }, newBooksPath);
        });
      }
    }, booksPath);
  }
};
