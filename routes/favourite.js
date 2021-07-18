const express = require('express');
const {
  getFavourite,
  addFavourite,
  removeFavourite,
} = require('../controllers/favourite');

const router = express.Router();

router.get('/favourite', getFavourite);

router.post('/add-favourite', addFavourite);

router.post('/remove-favourite', removeFavourite);

module.exports = router;
