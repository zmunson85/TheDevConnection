const express = require('express');


const app = express();

//connect db
const connectDB = require('./config/db');

connectDB();

app.get('/', (req, res) => res.send('API IS UP'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Fired up on port ${PORT}`));