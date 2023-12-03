const express = require('express');
const router = express.Router();

router.use(express.json());

router.use(express.urlencoded( { extended : true } ));

const upload = require('../controllers/uploadController');
const homepageController = require('../controllers/homepageController');
const searchController = require('../controllers/searchController');
const condolistController = require('../controllers/condolistController');
const aboutpageController = require('../controllers/aboutpageController');
const {addCondoController} = require('../controllers/addcondoController');
const {postAddCondo} = require('../controllers/addcondoController');
const {condoprofileController} = require('../controllers/condoprofileController');
const {submitReview} = require('../controllers/condoprofileController');
const {submitComment} = require('../controllers/condoprofileController');
const userProfileController = require('../controllers/userProfileController');
const {registerController} = require('../controllers/registerController');
const {postRegister} = require('../controllers/registerController');
const {loginController} = require('../controllers/loginController');
const {postLogin} = require('../controllers/loginController');
const editProfileController = require('../controllers/editProfileController');
const {renderCondoPanel} = require('../controllers/condopanelController');
const condoguestController = require('../controllers/condoguestController');
const logoutController = require('../controllers/logoutController');

// GET FUNCTIONS

router.get('/', homepageController);
router.get('/homepage', homepageController);
router.get('/searchResult', searchController);
router.get('/condolist', condolistController);
router.get('/aboutpage', aboutpageController);
router.get('/condoprofile', condoprofileController);

router.get('/addcondo', addCondoController);
router.post('/addcondo', upload.single('image'), postAddCondo);

router.get('/submitCondoReview', submitReview);
router.get('/submitReviewComment', submitComment);

router.get('/userprofile/:username', userProfileController);

router.get('/register', registerController);
router.post('/register', postRegister);
router.get('/login', loginController);
router.post('/login', postLogin);

router.get('/editprofile/:username', editProfileController);

router.get('/renderCondoPanel', renderCondoPanel);
router.get('/condoguest', condoguestController);

router.get('/logout', logoutController);

router.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).send('Not Found');
    } else {
        // Pass the error to the next error-handling middleware
        next(err);
    }
});

// Additional error handling middleware for other types of errors
router.use((err, req, res, next) => {
    // Handle other types of errors here or send a generic error response
    res.status(err.status || 500).send('Internal Server Error');
});

module.exports = router;