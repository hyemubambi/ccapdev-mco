
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Condo = require('../models/condo');
const Review = require('../models/review');
const Comment = require('../models/comment');

router.use(express.json());

router.use(express.urlencoded( { extended : true } ));

// import controllers
const homepageController = require('../controllers/homepageController');
const searchController = require('../controllers/searchController');
const condolistController = require('../controllers/condolistController');
const aboutpageController = require('../controllers/aboutpageController');
const condoprofileController = require('../controllers/condoprofileController');
const addcondoController = require('../controllers/addcondoController');

// GET FUNCTIONS

router.get('/', homepageController);
router.get('/homepage', homepageController);
router.get('/searchResult', searchController);
router.get('/condolist', condolistController);
router.get('/aboutpage', aboutpageController);
router.get('/condoprofile', condoprofileController);
router.get('/addcondo', addcondoController.addCondoController);
router.get('/addcondo', addcondoController.postAddCondo);

router.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = router;