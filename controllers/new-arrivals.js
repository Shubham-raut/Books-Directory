const Book = require('../models/book');

exports.getNew = (req, res, next) => {
  Book.fetchAllNewBooks()
    .then(([newBooks]) => {
      res.render('index', {
        path: '/new',
        pageTitle: 'New arrials',
        newBooks: newBooks,
      });
    })
    .catch((err) => {
      console.log('Something went wrong');
      res.send({ status: 404, err: err });
    });
};
