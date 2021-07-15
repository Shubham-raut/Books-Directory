const Book = require('../models/book');

exports.getPopular = (req, res, next) => {
  Book.fetchAllPopularBooks()
    .then(([popularBooks]) => {
      res.render('index', {
        path: '/popular',
        pageTitle: 'Popular',
        popularBooks: popularBooks,
      });
    })
    .catch((err) => {
      console.log('Something went wrong');
      res.send({ status: 404, err: err });
    });
};
