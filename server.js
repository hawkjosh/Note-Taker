const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use('/api', api);
app.use(express.static('public'));

// Get route for landing page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Get route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () => console.log(`App listening at localhost:${PORT}`));