// imports built-in node.js package 'path' to resolve path of files that are located on the server
const path = require('path');
// creates new router object, handles requests
const router = require('express').Router();

// get requests that return the homepage and the notes page
    router.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    router.get('/notes', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });

module.exports = router;