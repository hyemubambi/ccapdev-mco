const User = require('../models/user.js');
const Condo = require('../models/condo.js');
const Review = require('../models/review.js');
const Comment = require('../models/comment.js');

async function userProfileController(req, res) {
    try {
        let loggedIn = false;
        let user = null;

        if (req.session && req.session.user) {
            loggedIn = true;
            user = req.session.user;
        } else {
            return res.redirect('/homepage');
        }

        const username = req.params.username;
        console.log("username: " + username);

        const userProfile = await User.findOne({ username: username });
        if (!userProfile) {
            console.log('User not found');
            return res.status(404).send('User not found');
        }

        console.log('Retrieved user: ', userProfile);
        const reviews = await Review.find({ username: username });
        const reviewIds = reviews.map(review => review._id);
        const comments = await Comment.find({ review: { $in: reviewIds } });

        res.render('userprofile', {
                user,
                loggedIn,
                userProfile,
                reviews,
                comments
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function editPfp(req, res) {
    const username = req.session.user.username;
    const photo = "uploads/" + req.file.filename;

    try {
        let loggedIn = false;
        let user = null;

        if (req.session && req.session.user) {
            loggedIn = true;
            user = req.session.user;
        }

        console.log('Received request to editPfp');

        console.log("Username: ", username);
        console.log("File: ", photo);

        const userProfile = await User.findOneAndUpdate({username}, { pfp: photo });

        if (!userProfile) {
            return res.status(200).send('User not found. Please refresh the page.');
        }

        res.render('userprofile', {
            loggedIn,
            user,
            userProfile
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function loadReviews(req, res) {
    try {
        let loggedIn = false;
        let user = null;

        if (req.session && req.session.user) {
            loggedIn = true;
            user = req.session.user;
        }

        const username = req.params.username;
        const reviews = await Review.find({ username: username });
        const reviewIds = reviews.map(review => review._id);
        const comments = await Comment.find({ review: { $in: reviewIds } });
        const userProfile = await User.findOne({ username: username });

        res.render('userprofile', {
            user,
            loggedIn,
            comments,
            userProfile,
            reviews
        });

        
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function loadComments(req, res) {
    try {
        let loggedIn = false;
        let user = null;

        if (req.session && req.session.user) {
            loggedIn = true;
            user = req.session.user;
        }

        const username = req.params.username;
        const reviews = await Review.find({ username: username });
        const reviewIds = reviews.map(review => review._id);
        const comments = await Comment.find({ review: { $in: reviewIds } });
        const userProfile = await User.findOne({ username: username });

        res.render('userprofile', {
            user,
            loggedIn,
            comments,
            userProfile,
            reviews
        });

        
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    userProfileController,
    editPfp,
    loadReviews,
    loadComments
};