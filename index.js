const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());



// basic run structure on server side

app.get('/', async (req, res) => {
    res.send(`The smart sale stall is running on ${port} port`);
});

app.listen(port, () => {
    console.log(`It is running on ${port} port`);
})