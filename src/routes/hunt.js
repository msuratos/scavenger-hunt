const express = require('express');
const db = require('../config/db');

const router = express.Router();

router.get('/', (req, res) => {
    db.connect((err, client, done) => {
        if (err) {
            console.log(`Error occured in GET /hunt: ${err.name}`, err.message);

            res.status(500);
            res.statusMessage = err.message + '\n' + err.stack;
            res.send(err.name);
        }

        client.query("SELECT * FROM public.hunts", [], (err, result) => {
            console.log (result.rows);
            res.json(result.rows);
        });
    });
});

module.exports = router;