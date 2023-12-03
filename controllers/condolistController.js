const Condo = require('../models/condo.js');

async function condolistController(req, res) {
    try {
        let loggedIn = false;
        let user = null;

        if (req.session && req.session.user) {
            loggedIn = true;
            user = req.session.user;
        }

        const condos = await Condo.find().sort({ cName: 1 });
        res.render('condolist', {
            condos,
            loggedIn,
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = condolistController;
