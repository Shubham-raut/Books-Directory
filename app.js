const path = require('path');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const homeRoutes = require('./routes/home');
const new_arrivalsRoutes = require('./routes/new-arrivals');
const popularRoutes = require('./routes/popular');
const favouritesRoutes = require('./routes/favourites');
const addBookRoutes = require('./routes/add-book');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(homeRoutes);
app.use(new_arrivalsRoutes);
app.use(popularRoutes);
app.use(favouritesRoutes);
app.use(addBookRoutes);

app.listen(4000);
