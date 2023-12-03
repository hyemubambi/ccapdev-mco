const User = require('../models/user.js');
const Condo = require('../models/condo.js');
const Review = require('../models/review.js');
const Comment = require('../models/comment.js');

async function userProfileController(req, res) {
    try {
        let loggedIn = false;
        let userSession = null;

        if (req.session && req.session.user) {
            loggedIn = true;
            userSession = req.session.user;
        }

        const username = req.params.username;
        console.log("username: " + username);

        // Find the user by username
        const user = await User.findOne({ username: username });
        if (!user) {
            console.log('User not found');
            return res.status(404).send('User not found');
        }

        console.log('Retrieved user: ', user);

        res.render('userprofile', {
                user,
                loggedIn,
                userSession
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = userProfileController;
