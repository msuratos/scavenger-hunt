const express = require('express');
const huntRoute = require('./hunt');
const clueRoute = require('./clue');
// const verifyToken = require('../verify-token');

const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/api/v1/hunt');
});

router.use('/hunt', huntRoute);
router.use('/clue', clueRoute);

module.exports = router;