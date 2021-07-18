exports.getAddBook = (req, res, next) => {
  res.render('index', {
    path: '/add-book',
    pageTitle: 'Add Book',
  });
};

exports.postAddBook = (req, res, next) => {
  const { title, description, price } = req.body;
  console.log(title, description, price);

  req.user
    .createBook({ title, description, price })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log('Something went wrong');
      res.send({ status: 404, err: err });
    });
};
