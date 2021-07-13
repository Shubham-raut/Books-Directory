const express = require('express');
const { getNew } = require('../controllers/new-arrivals');

const router = express.Router();

router.get('/new', getNew);

module.exports = router;
