const User = require('../models/user.js');

async function editProfileController(req, res) {
    try {
        let loggedIn = false;
        let userSession = null;
        let user = null;

        if (req.session && req.session.user) {
            loggedIn = true;
            userSession = req.session.user;

            const username = req.session.user.username;
            user = await User.findOne({ username: username });
        }

        res.render('editprofile', {
            user,
            loggedIn,
            userSession
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = editProfileController;
