require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const routes = require('./routes/routes.js');
const db = require('./models/db.js');
const addData = require('./add_data.js');
const path = require('path');

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use('/', routes);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).render('error', { err, error: err.message });
});

db.connect();

//just call the function here
addData.populateCondo();

app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000");
});