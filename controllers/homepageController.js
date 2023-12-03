const Condo = require('../models/condo');

async function homepageController(req, res) {
    try {
        const condos = await Condo.find().sort({ nReviews: -1 }).limit(5);
        
        let loggedIn = false;
        let user = null;

        if (req.session && req.session.user) {
            loggedIn = true;
            user = req.session.user;
        }

        res.render('homepage', {
            condos,
            loggedIn,
            user
        });
        console.log("Logged in?: ", loggedIn);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = homepageController;