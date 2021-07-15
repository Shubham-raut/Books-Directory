const Book = require('../models/book');

exports.getFevourites = (req, res, next) => {
  Book.fetchAllFavouriteBooks()
    .then(([favBooks]) => {
      res.render('index', {
        path: '/favourites',
        pageTitle: 'Favourites',
        favBooks: favBooks,
      });
    })
    .catch((err) => {
      console.log('Something went wrong');
      res.send({ status: 404, err: err });
    });
};

exports.addFavourite = (req, res, next) => {
  console.log(req.body);
  Book.addToFavourite(req.body.bookId)
    .then((err) => {
      res.redirect('/favourites');
    })
    .catch((err) => {
      console.log('Something went wrong');
      res.send({ status: 404, err: err });
    });
};

exports.removeFavourite = (req, res, next) => {
  console.log(req.body);
  Book.removeFromFavourite(req.body.bookId)
    .then((err) => {
      res.redirect('/favourites');
    })
    .catch((err) => {
      console.log('Something went wrong');
      res.send({ status: 404, err: err });
    });
};
