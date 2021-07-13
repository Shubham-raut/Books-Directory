const express = require('express');
const {
  getFevourites,
  addFavourite,
  removeFavourite,
} = require('../controllers/favourite');

const router = express.Router();

router.get('/favourites', getFevourites);

router.post('/add-favourite', addFavourite);

router.post('/remove-favourite', removeFavourite);

module.exports = router;
