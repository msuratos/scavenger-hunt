const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rooteRoute = require('./routes/root-route');

const path = __dirname + '/build/';
const port = process.env.PORT || 3001;
const app = express();

app.use(express.static(path));
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.get('/', (req,res) => {
    res.sendFile(path + "index.html");
});

app.use('/api/v1', rooteRoute);

app.get('/*', (req, res) => {
    res.sendFile(path + "index.html");
})

app.listen(port, () => {
    console.log(`Backend Api for Valentine Hunt is listening at ${port}`);
});