exports.getHome = (req, res, next) => {
  console.log('Get Home');
  req.user
    .getBooks()
    .then((books) => {
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
