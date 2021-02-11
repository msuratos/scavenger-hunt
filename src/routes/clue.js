const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.send('get clue api'));

module.exports = router;