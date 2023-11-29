// initialization
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const routes = require('./routes/routes.js');
const db = require('./models/db.js');
const addData = require('./add_data.js');

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// connect to mongodb database
db.connect();

// session middleware
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

// initialize passport and session management
app.use(passport.initialize());
app.use(passport.session());

// import and configure your user model
const User = require('./models/user.js');

// configure passport strategies
// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy({
    usernameField: 'username', // Assuming 'email' is the field for username
    passwordField: 'password' // Assuming 'password' is the field for the password
 },
 function(username, password, done) {
    // Logic to find and authenticate user based on email and password
    User.findOne({ username: username })
        .then(user => {
            if (!user || !user.validPassword(password)) { // Assuming a method to check password validity
                return done(null, false, { message: 'Incorrect username or password.' });
            }
            return done(null, user);
        })
        .catch(err => done(err));
 }));
 
 passport.serializeUser(function(user, done) {
    done(null, user.id); // Using the user's ID for serialization
 });
 
 passport.deserializeUser(function(id, done) {
    User.findById(id)
        .then(user => done(null, user))
        .catch(err => done(err));
 });
 


// routes
app.use('/', routes);

// error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).render('error', { err, error: err.message });
});


// populating data functions
// addData.populateCondo();
// addData.populateUsers();

// start the server
app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000");
});