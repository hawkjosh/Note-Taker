const notes = require('express').Router();
const { readNote, writeNote, updateNote } = require('../helpers/fsUtilities.js');
const { v4: uuidv4 } = require('uuid');

// Route for retrieving all notes
notes.get('/', (req, res) => {
  readNote('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Route for retrieving specific note
notes.get('/:id', (req, res) => {
  const noteId = req.params.id;
  readNote('./db/db.json').then((data) => JSON.parse(data)).then((json) => {
    const result = json.filter((note) => note.id === noteId);
    return result.length > 0 ? res.json(result) : res.json('No note with that ID');
  });
});

// Route for deleting specific note
notes.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  readNote('./db/db.json').then((data) => JSON.parse(data)).then((json) => {
    const result = json.filter((note) => note.id !== noteId);
    writeNote('./db/db.json', result);
    res.json(`Item ${noteId} has been deleted`);
  });
});

// Route for posting new note
notes.post('/', (req, res) => {
  const { title, text } = req.body;
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4()
    };
    const noteId = req.params.id;
    updateNote(newNote, './db/db.json');
    res.json(`Note ${noteId} has been posted`);
  } 
});

module.exports = notes;