// imports file system module
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

module.exports = function(app) {
    app.get('/api/notes', function(req, res) {
        res.JSON(data);
    });

    app.get('/api/notes/:id', function(req, res) {
        res.JSON(data[Number(req.params.id)]);
    });

    app.post('/api/notes', function(req, res) {
        let newNote = req.body;
        let newID = (data.length).toString();
        console.log(newID);
        newNote.id = newID;
        data.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(data), function(err) {
            if (err) {
                throw (err);
            }
        });
        res.JSON(data);
    });

    app.delete('/api/notes/:id', function(req, res) {
        let noteID = req.params.id;
        let newNewID = 0;
        data = data.filter(currentNote => {
            return currentNote.id != noteID;
        });
        for (currentNote of data) {
            currentNote.id = newNewID.toString();
            newNewID++;
        }
        fs.writeFileSync('./db/db.json', JSON.stringify(data));
        res.JSON(data);
    });
}
