const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Condo = require('../models/condo');
const Review = require('../models/review');
const Comment = require('../models/comment');

router.use(express.json());

router.use(express.urlencoded( { extended : true } ));

// import controllers

// GET FUNCTIONS

router.get('/', (req, res) => {
    res.render('homepage');
});

router.get('/homepage', (req, res) => {
    res.render('homepage');
});

router.use((req, res, next) => {
    // Create a 404 Not Found error
    const err = new Error('Not Found');
    err.status = 404;
    // Pass the error to the error-handling middleware
    next(err);
});

module.exports = router;