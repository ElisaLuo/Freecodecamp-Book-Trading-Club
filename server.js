//Imports dependencies, and function files
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const session = require('client-sessions');
const index = require('./routes/index');
const login = require('./routes/login');
const signUp = require('./routes/signup');
const logout = require('./routes/logout');
const books = require('./routes/books');

process.env.NODE_ENV = 'production';

//connects to mLab with mongoose
mongoose.connect('mongodb://elisal:pdnlxx021@ds039880.mlab.com:39880/book-club');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('Connection to the database successful');
});

//Sets up local cookie (see https://www.npmjs.com/package/client-sessions)
app.use(express.static('public'));
app.use(session({
  cookieName: 'session',
  secret: 'aewoiv0923lkcvxio2xd08f3wh',
  duration: 24 * 60 * 60 * 1000
}));

app.set('port', process.env.PORT || process.env.IP );
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Sets up links for different sites
app.use("/", index);
app.use("/books", books);
app.use("/login", login);
app.use("/signup", signUp);
app.use("/logout", logout); //Creates link for logout so function could be run

//Starts port
var port = process.env.PORT || 3000;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
