const fs = require('fs');
const util = require('util');

const readNote = util.promisify(fs.readFile);

const writeNote = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (error) => {
    if (error) {
      return;
    }
  });

  const updateNote = (content, file) => {
    fs.readFile(file, 'utf8', (error, data) => {
    if (error) {
      return;
    } else {
        const jsonParse = JSON.parse(data);
        jsonParse.push(content);
        writeNote(file, jsonParse);
      }
  });
};

module.exports = { readNote, writeNote, updateNote };