// imports built-in node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

// get requests that return the homepage and the notes page
module.exports = function(app) {
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    app.get('/notes', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
}

