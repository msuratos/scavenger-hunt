const express = require('express');
const db = require('../config/db');

const router = express.Router();

router.get('/', (req, res) => {
    db.connect((err, client, done) => {
        if (err) {
            console.log(err.stack);

            res.status(500);
            res.statusMessage = `${err.name}: ${err.message}`;

            return res.send(err.stack);
        }

        client.query("SELECT * FROM public.hunts", [], (err, result) => {
            console.log (result.rows);
            res.json(result.rows);
        });

        client.release();
    });
});

module.exports = router;