const Condo = require('../models/condo.js');
const User = require('../models/user.js');

async function renderCondoPanel(req, res) {
    try {
        const condos = await Condo.find().sort({cName: 1});
        let loggedIn = false;
        let user = null;

        if (req.session && req.session.user) {
            loggedIn = true;
            user = req.session.user;

            if (!user.admin) {
                return res.redirect('/homepage');
            }
        } else {
            return res.redirect('/homepage');
        }

        res.render('condopanel', {
            condos,
            loggedIn,
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    renderCondoPanel
};