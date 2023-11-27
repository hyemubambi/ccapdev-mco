// initialization
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const routes = require('./routes/routes.js');
const db = require('./models/db.js');
const addData = require('./add_data.js');
const path = require('path');

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
        saveUninitialized: false,
    })
);

// initialize passport and session management
app.use(passport.initialize());
app.use(passport.session());

// import and configure your user model
const User = require('./models/user.js');

// configure passport strategies
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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