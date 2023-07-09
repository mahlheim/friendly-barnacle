// imports express and fs
const express = require('express');
const fs = require('fs');

//  initializes an instance of express.js and specifies port 
var app = express();
var PORT = process.env.PORT || 3001

// allows express app to handle data parsing and allow access to content in public folder
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// imports routes from files in the routes folder
require('./routes/htmlRoutes.js')(app);
require('./routes/apiRoutes.js')(app);

// starts server
app.listen(PORT, () =>
   console.log(`Example app listening at http://localhost:${PORT}`)
); 