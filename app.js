const path = require('path');
const express = require('express');

const sequelize = require('./util/database');
const Book = require('./models/book');
const User = require('./models/user');
const Favourite = require('./models/favourite');
const FavouriteBook = require('./models/favourite-book');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const homeRoutes = require('./routes/home');
// const new_arrivalsRoutes = require('./routes/new-arrivals');
// const popularRoutes = require('./routes/popular');
const favouriteRoutes = require('./routes/favourite');
const addBookRoutes = require('./routes/add-book');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use(homeRoutes);
// app.use(new_arrivalsRoutes);
// app.use(popularRoutes);
app.use(favouriteRoutes);
app.use(addBookRoutes);

Book.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Book);
User.hasOne(Favourite);
Favourite.belongsTo(User);
Favourite.belongsToMany(Book, { through: FavouriteBook });
Book.belongsToMany(Favourite, { through: FavouriteBook });

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: 'Shubham', email: 'test@test.com' });
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    return user.createFavourite();
  })
  .then((favourite) => {
    app.listen(4000, () => {
      console.log('App startded on 4000');
    });
  })
  .catch((err) => {
    console.log('Error', err);
  });
