const express = require('express');
const cors = require('cors');
const rooteRoute = require('./routes/root-route');

const path = __dirname + '/build/';
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path));
app.use(cors());

app.get('/', (req,res) => {
    res.sendFile(path + "index.html");
});

app.use('/api/v1', rooteRoute);

app.listen(port, () => {
    console.log(`Backend Api for Valentine Hunt is listening at ${port}`);
});