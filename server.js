// imports express.js
const express = require('express');

// imports built-in node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

// initializes an instance of express.js
const app = express();

// specifies which port the express.js server will run on
const PORT = 3001;

// imports htmlroutes file
const htmlRoutes = require('./routes/htmlRoutes');

// imports apiroutes file
const apiRoutes = require('./routes/apiRoutes');

// static middleware pointing to the public folder
app.use(express.static('public'));

// middleware to parse the json data
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// routes
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);



app.get('/text', (req, res) => res.send('I have now created a GET route!'));

app.post('/create', (req, res) => {
    const {firstName, lastName, email} = req.body;
    // console.log(`----request body----`);
    // console.log(requestBody);
    // res.send('I have now created a POST route!')
    // res.json(requestBody);

    // If all the required properties are present
  if (firstName && lastName && email) {
    // Variable for the object we will save
    const newAccount = {
      firstName,
      lastName,
      email,
    };

    // Convert the data to a string so we can save it
    const accountString = JSON.stringify(newAccount);

    const response = {
      status: 'success',
      body: newAccount,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in creating account');
  }
});

app.put('/change', (req, res) => res.send('I have now created a PUT route!'));

app.delete('/remove', (req, res) => res.send('I have now created a DELETE route!'));

// starts server
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
