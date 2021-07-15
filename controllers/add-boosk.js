const Book = require('../models/book');

exports.getAddBook = (req, res, next) => {
  res.render('index', {
    path: '/add-book',
    pageTitle: 'Add Book',
  });
};

exports.postAddBook = (req, res, next) => {
  const { title, description, price } = req.body;
  console.log(title, description, price);

  const book = new Book(title, description, price);

  book
    .save()
    .then(() => {
      res.redirect('/');
      Book.limitNewBooks();
    })
    .catch((err) => {
      console.log('Something went wrong');
      res.send({ status: 404, err: err });
    });
};
