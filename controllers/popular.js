const Book = require('../models/book');

exports.getPopular = (req, res, next) => {
  Book.fetchAllPopularBooks((popularBooks) => {
    res.render('index', {
      path: '/popular',
      pageTitle: 'Popular',
      popularBooks: popularBooks,
    });
  });
};
