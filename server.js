// imports express.js
const express = require('express');

// initializes an instance of express.js
const app = express();

// specifies which port the express.js server will run on
const PORT = process.env.PORT || 3001;

// imports function from htmlroutes file
require('./routes/htmlRoutes.js')(app); 

// imports function from apiroutes file
require('./routes/apiRoutes.js')(app); 

// static middleware pointing to the assets folder inside the public folder
app.use('./public/assets', express.static(__dirname + './public/assets'));

// middleware to parse the json data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// starts server
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

