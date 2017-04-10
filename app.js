const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to database
mongoose.connect(config.database);

//On connection
mongoose.connection.on('connected', () => {
    console.log('connected to database' + config.database);
})

//Error connection
mongoose.connection.on('error', (err) => {
    console.log('database error' + err);
})

const app = express();
const users = require('./routes/users');

//PORT Number
const port = 3000;

//CORS Middleware
app.use(cors());

//Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Bdy Parser Middleware
app.use(bodyParser.json());

//passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//Index Route
app.get('/', (req, res) => {
    res.send('123');
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

//Start Serve 
app.listen(port, () => {
    console.log('listen on port ' + port);
})