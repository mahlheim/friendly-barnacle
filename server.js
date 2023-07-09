// imports express and fs
const express = require('express');
const fs = require('fs');

//  initializes an instance of express.js and specifies port 
var app = express();
var PORT = process.env.PORT || 3001

// allows express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));

// imports routes from files in the routes folder
require('./routes/htmlRoutes')(app);
require('./routes/apiRoutes')(app);

// starts server
app.listen(PORT, () =>
   console.log(`Example app listening at http://localhost:${PORT}`)
); 