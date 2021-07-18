const Book = require('../models/book');

exports.getFavourite = (req, res, next) => {
  req.user
    .getFavourite()
    .then((favourite) => {
      return favourite
        .getBooks()
        .then((books) => {
          res.render('index', {
            path: '/favourite',
            pageTitle: 'Favourite',
            favBooks: books,
          });
        })
        .catch((err) => {
          console.log('Something went wrong');
          res.send({ status: 404, err: err });
        });
    })
    .catch((err) => {
      console.log('Something went wrong');
      res.send({ status: 404, err: err });
    });
};

exports.addFavourite = (req, res, next) => {
  const bookId = req.body.bookId;
  let fetchedFavourite;

  req.user
    .getFavourite()
    .then((favourite) => {
      fetchedFavourite = favourite;
      console.log('book id', bookId);
      return Book.findByPk(bookId);
    })
    .then((book) => {
      return fetchedFavourite.addBook(book);
    })
    .then(() => {
      res.redirect('/favourite');
    })
    .catch((err) => {
      console.log('Something went wrong', err);
      res.send({ status: 404, err: err });
    });
};

exports.removeFavourite = (req, res, next) => {
  const bookId = req.body.bookId;

  req.user
    .getFavourite()
    .then((favourite) => {
      return favourite.getBooks({ where: { id: bookId } });
    })
    .then(([book]) => {
      return book.favouriteBook.destroy();
    })
    .then(() => {
      res.redirect('/favourite');
    })
    .catch((err) => {
      console.log('Something went wrong', err);
      res.send({ status: 404, err: err });
    });
};
