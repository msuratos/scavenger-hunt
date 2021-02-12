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

        // Validate huntid
        if (huntid === undefined || huntid === '' || huntid === null) {
            res.status(404);
            res.statusMessage = 'HuntId can not be null or empty. Please enter valid HuntId';

            return res.send('Invalid HuntId. Please try again.');
        }

        const getCluesQuery = ` SELECT clues.cluesid, clues.clues, clues.createdby, clues.createddate,
                                clues.fk_huntid, image,
                                hunts.hunt FROM public.clues
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

router.post('/:huntid', (req, res) => {
    const { clues, createdby, image } = req.body;

    db.connect(async (err, client, done) => {
        if (err) {
            console.log(err.stack);
    
            res.status(500);
            res.statusMessage = `${err.name}: ${err.message}`;
    
            return res.send(err.stack);
        }

        const huntid = req.params.huntid;

        // Validate huntid
        if (huntid === undefined || huntid === '' || huntid === null) {
            res.status(404);
            res.statusMessage = 'HuntId can not be null or empty. Please enter valid HuntId';

            return res.send('Invalid HuntId. Please try again.');
        } else {
            var hunt = await client.query('select huntid from public.hunts where huntid = $1', [huntid]);

            if (!hunt) {
                res.status(404);
                res.statusMessage = `Invalid huntid, could not find ${huntid}`;
        
                return res.end();
            }
        }

        // Insert values
        try {
            await client.query('BEGIN');
            const insertClue = 'INSERT INTO public.clues(clues, createdby, createddate, fk_huntid, image) VALUES ($1, $2, CURRENT_TIMESTAMP, $3, $4)';
            const insertClueValues = [clues, createdby, huntid, image];
            await client.query(insertClue, insertClueValues);
            await client.query('COMMIT');

            res.sendStatus(200);
        } catch (e) {
            await client.query('ROLLBACK')
            
            res.status(500);
            res.statusMessage = `Could not insert new clue record for hunt ${huntid}`;

            res.end();

        } finally {
            client.release();
        }
    });
})

module.exports = router;