// imports file system module
const fs = require('fs');
const util = require('util');
const app = require('express').Router();
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
let notesData;

// get request
app.get('/notes', (req, res) => {
    readFileAsync('db/db.json', 'utf8').then(function(data) {
        notesData = JSON.parse(data);
        res.json(notesData);
    });
});

// post request
app.post('/notes', (req, res) => {
    readFileAsync('db/db.json', 'utf8').then(function(data) {
        notesData = JSON.parse(data);
        let newNote = req.body;
        let currentID = notesData.length;
        newNote.id = currentID + 1;
        notesData.push(newNote);
        notesData = JSON.stringify(notesData);
        writeFileAsync('db/db.json', notesData).then(function(data) {
            console.log('Your note has been successfully added!');
        });
        res.json(notesData);
    });
});

// delete request
app.delete('/notes/:id', (req, res) => {
    let deleteID = parseInt(req.params.id);
    for (let i = 0; i < notesData.length; i++) {
        if (deleteID === notesData[i].id) {
            notesData.splice(i, 1);
            let noteJSON = JSON.stringify(notesData, null, 2);

            writeFileAsync('db/db.json', noteJSON).then(function () {
                console.log('Your note has been successfully deleted!');
            });
        }
    }
    res.json(notesData);
})

module.exports = app;