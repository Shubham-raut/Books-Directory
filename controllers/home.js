const Book = require('../models/book');

exports.getHome = (req, res, next) => {
  Book.fetchAllBooks((books) => {
    res.render('index', {
      path: '/',
      pageTitle: 'Home',
      books: books,
    });
  });
};
