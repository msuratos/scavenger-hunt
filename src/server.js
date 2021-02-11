const express = require('express');

const rooteRoute = require('./routes/root-route');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send('Root endpoint of Valentine Hunt Api');
});

app.use('/api/v1', rooteRoute);

app.listen(() => {
    console.log(`Backend Api for Valentine Hunt is listening at on ${port}`);
});