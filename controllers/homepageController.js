const Condo = require('../models/condo');

async function homepageController(req, res) {
    try {
        const condos = await Condo.find().sort({ nReviews: -1 }).limit(5);
        const user = req.session.user || {};
        res.render('homepage', {condos, loggedIn: res.locals.loggedIn, admin: res.locals.admin, user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = homepageController;