const db = require('../util/database');

module.exports = class Book {
  constructor(title, description, price) {
    this.title = title;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      'INSERT INTO BOOKS (title, description, price, isNew) VALUES (?,?,?,?)',
      [this.title, this.description, this.price, 1]
    );
  }

  static fetchAllBooks() {
    return db.execute('SELECT * FROM books');
  }

  static fetchAllNewBooks() {
    return db.execute('SELECT * FROM books WHERE isNew = 1');
  }

  static fetchAllPopularBooks() {
    return db.execute('SELECT * FROM books WHERE isPopular = 1');
  }

  static fetchAllFavouriteBooks() {
    return db.execute('SELECT * FROM books WHERE isFavourite = 1');
  }

  static addToFavourite(bookId) {
    return db.execute('UPDATE books SET isFavourite = 1 WHERE id = ?', [
      bookId,
    ]);
  }

  static removeFromFavourite(bookId) {
    return db.execute('UPDATE books SET isFavourite = 0 WHERE id = ?', [
      bookId,
    ]);
  }

  static limitNewBooks() {
    db.execute(
      'SELECT COUNT( * ) as "newBooksCount" FROM books WHERE isNew = 1'
    )
      .then(([res]) => {
        const newBooksCount = res[0].newBooksCount;
        if (newBooksCount > 5) {
          db.execute(
            'UPDATE books SET isNew = 0 WHERE isNew = 1 ORDER BY id LIMIT ?',
            [newBooksCount - 5]
          );
        }
      })
      .catch((err) => console.log('in catch', err));
  }
};
