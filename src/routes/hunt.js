const express = require('express');

const router = express.Router();

router.route('/')
    .get((req, res) => res.send('get hunt api'));

module.exports = router;