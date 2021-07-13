const express = require('express');
const { getAddBook, postAddBook } = require('../controllers/add-boosk');

const router = express.Router();

router.get('/add-book', getAddBook);

router.post('/add-book', postAddBook);

module.exports = router;
