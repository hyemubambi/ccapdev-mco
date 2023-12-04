const express = require('express');
const router = express.Router();

router.use(express.json());

router.use(express.urlencoded( { extended : true } ));

const {singleUploadController} = require('../controllers/uploadController');
const {uploadController} = require('../controllers/uploadController');

const homepageController = require('../controllers/homepageController');
const searchController = require('../controllers/searchController');
const condolistController = require('../controllers/condolistController');
const aboutpageController = require('../controllers/aboutpageController');
const {postAddCondo} = require('../controllers/addcondoController');
const {condoprofileController} = require('../controllers/condoprofileController');
const {submitReview} = require('../controllers/condoprofileController');
const {submitComment} = require('../controllers/condoprofileController');
const {postDeleteReview} = require('../controllers/condoprofileController');
const {updateReview} = require('../controllers/condoprofileController');
const {postDeleteComment} = require('../controllers/condoprofileController');
const {updateComment} = require('../controllers/condoprofileController');
const {userProfileController} = require('../controllers/userProfileController');
const {registerController} = require('../controllers/registerController');
const {postRegister} = require('../controllers/registerController');
const {loginController} = require('../controllers/loginController');
const {postLogin} = require('../controllers/loginController');
const {editProfileController, postEditAccountDetails} = require('../controllers/editProfileController');
const {postEditPersonalInfo} = require('../controllers/editProfileController');
const {renderCondoPanel, editCondoProfile, deleteCondoProfile} = require('../controllers/condopanelController');
const condoguestController = require('../controllers/condoguestController');
const logoutController = require('../controllers/logoutController');
const {editPfp} = require('../controllers/userProfileController');
const {loadReviews} = require('../controllers/userProfileController');
const {loadComments} = require('../controllers/userProfileController');

// GET FUNCTIONS

router.get('/', homepageController);
router.get('/homepage', homepageController);
router.get('/searchResult', searchController);
router.get('/condolist', condolistController);
router.get('/aboutpage', aboutpageController);
router.get('/condoprofile', condoprofileController);

router.post('/addcondo', singleUploadController, postAddCondo);

router.post('/submitCondoReview', uploadController, submitReview);
router.get('/submitReviewComment', submitComment);
router.post('/deleteReview/:reviewID', postDeleteReview);
router.patch('/editReview/:reviewID', updateReview);
router.post('/deleteComment/:commentID', postDeleteComment);
router.patch('/editComment/:commentID', updateComment);

router.get('/userprofile/:username', userProfileController);

router.get('/register', registerController);
router.post('/register', postRegister);
router.get('/login', loginController);
router.post('/login', postLogin);

router.get('/editprofile/:username', editProfileController);
router.post('/editPersonalInfo/:userID', postEditPersonalInfo);
router.post('/editAccountDetails/:userID', postEditAccountDetails);
router.get('/renderCondoPanel', renderCondoPanel);
router.get('/condoguest', condoguestController);

router.get('/logout', logoutController);

router.post('/editPfp/:username', singleUploadController, editPfp);

router.post('/editcondoprofile', singleUploadController, editCondoProfile);
router.post('/deletecondoprofile', deleteCondoProfile);

router.get('/userprofile/:username/loadReviews', loadReviews);
router.get('/userprofile/:username/loadComments', loadComments);

router.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).send('Not Found');
    } else {
        // Pass the error to the next error-handling middleware
        next(err);
    }
});

module.exports = router;
