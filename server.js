const express = require('express'); // Importing Express
const expressLayouts = require('express-ejs-layouts'); // Importing Express EJS layouts for view rendering
const mongoose = require('mongoose'); // Importing Mongoose for MongoDB connection
const flash = require('connect-flash'); // Importing Connect Flash for flash messages
const session = require('express-session'); // Importing Express Session for session management
const passport = require('passport'); // Importing Passport for authentication
const BSON = require('bson');
// or
// import BSON from 'bson';

const app = express(); // Creating an instance of Express

require('./config/passport')(passport); // Requiring Passport configuration file and passing the passport instance

const db = require('./config/key').MongoURI; // Requiring MongoDB URI from configuration file

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }) // Connecting to MongoDB
    .then(() => console.log("Successfully connected to MongoDB")) // On successful connection, log the success message
    .catch(err => console.log(err)); // On error, log the error message

app.use(expressLayouts); // Using Express EJS layouts
app.use("/assets", express.static('./assets')); // Serving static files from the "assets" directory
app.set('view engine', 'ejs'); // Setting EJS as the view engine

app.use(express.urlencoded({ extended: false })); // Parsing URL-encoded data

app.use(
    session({
        secret: 'secret', // Secret used to sign the session ID cookie
        resave: true, // Forces the session to be saved back to the session store, even if no changes were made during the request
        saveUninitialized: true // Forces a session that is "uninitialized" to be saved to the store
    })
);

app.use(passport.initialize()); // Initializing Passport
app.use(passport.session()); // Using Passport for session management

app.use(flash()); // Using Connect Flash for flash messages

app.use(function(req, res, next) {
  // Setting local variables for flash messages to be accessible in templates
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


app.use('/', require('./routes/index')); // Using the routes from the "index" file
app.use('/auth', require('./routes/auth')); // Using the routes from the "auth" file

const PORT = process.env.PORT || 1432; // Setting the port for the server

app.listen(PORT, console.log(`Server running on PORT ${PORT}`)); // Starting the server and logging the success message
