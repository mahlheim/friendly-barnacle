// imports file system module, creates data variable that parses the notes saved in db.json
const fs = require('fs');
let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

// creates routes and exports them
module.exports = function(app) {

// get requests for all notes, or note by id
app.get('/api/notes', function(req, res) {
    res.json(data);
});

app.get('/api/notes/:id', function(req, res) {
    res.json(data[Number(req.params.id)]);
});

// post request
app.post('/api/notes', function(req, res) {
    let newNote = req.body;
    let newId = (data.length).toString();
    newNote.id = newId;
    data.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(data), function(err) {
        if (err) throw (err);        
    }); 
    res.json(data);    
});

// BONUS delete request
app.delete('/api/notes/:id', function(req, res) {
    let noteId = req.params.id;
    let updatedId = 0;
    console.log(`Your note, ID: ${noteId}, has been succesfully deleted!`);
    data = data.filter(currentNote => {
        return currentNote.id != noteId;
    });
    for (currentNote of data) {
        currentNote.id = updatedId.toString();
        updatedId++;
    }
    fs.writeFileSync('./db/db.json', JSON.stringify(data));
    res.json(data);
}); 
}