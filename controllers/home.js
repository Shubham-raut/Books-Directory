const Book = require('../models/book');

exports.getHome = (req, res, next) => {
  Book.fetchAllBooks()
    .then(([books]) => {
      res.render('index', {
        path: '/',
        pageTitle: 'Home',
        books: books,
      });
    })
    .catch((err) => {
      console.log('Something went wrong');
      res.send({ status: 404, err: err });
    });
};
