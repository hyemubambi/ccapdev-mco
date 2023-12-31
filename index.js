// initialization
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const routes = require('./routes/routes.js');
const db = require('./models/db.js');
const addData = require('./add_data.js');

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));
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