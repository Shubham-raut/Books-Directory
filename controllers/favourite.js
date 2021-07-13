const Favourites = require('../models/favourites');
const Book = require('../models/favourites');

exports.getFevourites = (req, res, next) => {
  Book.fetchAllFavouriteBooks((favBooks) => {
    res.render('index', {
      path: '/favourites',
      pageTitle: 'Favourites',
      favBooks: favBooks,
    });
  });
};

exports.addFavourite = (req, res, next) => {
  console.log(req.body);
  Favourites.addToFavourite(req.body.bookId, (err) => {
    if (err) {
      console.log('Something went wrong');
    } else {
      res.redirect('/favourites');
    }
  });
};

exports.removeFavourite = (req, res, next) => {
  console.log(req.body);
  Favourites.removeFromFavourite(req.body.bookId, (err) => {
    if (err) {
      console.log('Something went wrong');
    } else {
      res.redirect('/favourites');
    }
  });
};
