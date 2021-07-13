const express = require('express');
const { getPopular } = require('../controllers/popular');

const router = express.Router();

router.get('/popular', getPopular);

module.exports = router;
