require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const routes = require('./routes/routes.js');
const db = require('./models/db.js');
const path = require('path');

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use('/', routes);
app.use(function (req, res) {
    res.render('error');
});

db.connect();

app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000");
});