// What is node.js? node.js = a runtime that allows the user to run a javascript through
// a server on the backend, a way for web developers to write javaScripts on a server when it could
// previously be written on a web browser only

// What can node.js do? You visit the url on the internet that points to your server when the
// request is received we can use node to handle the request and read a file from the server's
// file system and then respond back to client, so they can review the html in the browser

const express = require("express"); // getting the library
const app = express(); // creating an object to reference express
const port = 3000; // port
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // middleware to parse incoming JSON data
app.use(express.static(path.join(__dirname, 'public')));
let pokedex = []; // sample in-memory database to store Pokedex data

// load existing Pokédex data from the JSON file
const loadPokedexData = () => {
    try {
        const data = fs.readFileSync('pokedex.json');
        pokedex = JSON.parse(data);
    } catch (error) {
        console.error('Error loading Pokedex data:', error);
    }
};

// save Pokedex data to the JSON file
const savePokedexData = () => {
    try {
        const jsonData = JSON.stringify(pokedex, null, 2);
        fs.writeFileSync('pokedex.json', jsonData);
    } catch (error) {
        console.error('Error saving Pokedex data:', error);
    }
};

// Endpoint to receive and store Pokédex data
app.post('/pokedex', (req, res) => {
    try {
        const newEntry = req.body;
        pokedex.push(newEntry);
        savePokedexData();
        res.status(201).json({ message: 'Pokedex entry added successfully'});
    } catch (error) {
        console.error('Error adding Pokdex entry:', error);
        res.status(500).json({ error: 'Internal server error'});
    }
});

app.get('/', (req, res) => {
    res.render('index');
    //res.status(200).sendFile('public/index.html',{root: __dirname});
    // this code snippet is regestring a new endpoint for the express server
    // endpoint is a destination to communicate with the server
    // just one slash is the root endpoint of the server
    // root directory is the parent of the folder, and it takes everything from inside the folder
    // root endpoint is the starting point of our server

    // line 54
    // res = response, we are responding with the status of 200, 200 means successful response
    // responding with the index.html
});

// Endpoint to retrieve and send saved Pokédex data to the frontend
app.get('/pokedex', (req, res) => {
    try {
        res.status(200).json(pokedex);
    } catch (error) {
        console.error('Error retrieving Pokedex data:', error);
        res.status(500).json({ error: 'Internal server error'});
    }
});

// Start the server
app.listen(port, () => {
    loadPokedexData();
    console.log(`Server is running on port ${port}!`); // starting server display console where it started on
});

