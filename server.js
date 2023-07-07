// imports express.js
const express = require('express');

// initializes an instance of express.js
const app = express();

// imports modules from apiRoutes and htmlRoutes files
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// specifies which port the express.js server will run on
const PORT = process.env.PORT || 3001;

// static middleware to pull in css and js
app.use(express.static('public'));

// imports function from htmlroutes and apiroutes file
app.use('/api', apiRoutes); 
app.use('/', htmlRoutes); 

// middleware to parse the json data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// starts server
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

module.exports = app;