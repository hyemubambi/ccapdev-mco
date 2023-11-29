const Condo = require('../models/condo.js');
const User = require('../models/user.js');

async function renderCondoPanel(req, res) {
    try {
        // const condos = await Condo.find().sort({cName: 1});
        const user = req.session.user || {};
        console.log(req.session.user);

        res.render('condopanel', {user, loggedIn: res.locals.loggedIn, admin: res.locals.admin });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    renderCondoPanel
};