const Book = require('../models/book');

exports.getNew = (req, res, next) => {
  Book.fetchAllNewBooks((newBooks) => {
    res.render('index', {
      path: '/new',
      pageTitle: 'New arrials',
      newBooks: newBooks,
    });
  });
};
