const Book = require('../models/book');

exports.getAddBook = (req, res, next) => {
  res.render('index', {
    path: '/add-book',
    pageTitle: 'Add Book',
  });
};

exports.postAddBook = (req, res, next) => {
  const { title, description } = req.body;
  console.log(title, description);
  const id = Math.random().toString();
  const book = new Book(id, title, description);

  book.save((err) => {
    if (err) {
      console.log('Something went wrong');
      res.send({ status: 404, err: 'Something went wrong' });
    } else {
      res.redirect('/');
    }
  });
};
