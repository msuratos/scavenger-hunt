const express = require('express');
const db = require('../config/db');

const router = express.Router();

router.get('/:huntid', (req, res) => {
    db.connect((err, client, done) => {
        if (err) {
            console.log(err.stack);
    
            res.status(500);
            res.statusMessage = `${err.name}: ${err.message}`;
    
            return res.send(err.stack);
        }

        const huntid = req.params.huntid;

        if (huntid === undefined || huntid === '' || huntid === null) {
            res.status(404);
            res.statusMessage = 'HuntId can not be null or empty. Please enter valid HuntId';

            return res.send('Invalid HuntId. Please try again.');
        }

        const getCluesQuery = `SELECT clues.*, hunts.hunt FROM public.clues
                                INNER JOIN public.hunts ON public.clues.fk_huntid = public.hunts.huntid
                                WHERE hunts.huntid = '${huntid}'`;
    
        client.query(getCluesQuery, [], (err, result) => {
            if (err) {
                console.log(err.stack);

                res.status(500);
                res.statusMessage = `${err.name}`;
        
                return res.send(`${err.stack}`);
            }

            console.log (result.rows);
            res.json(result.rows);
        });
    });
});

module.exports = router;