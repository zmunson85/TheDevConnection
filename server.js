const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('API IS UP'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Fired up on port ${PORT}`));