const Condo = require('../models/condo.js');

async function condoguestController(req, res) {
    try {
        let loggedIn = false;
        let user = null;

        if (req.session && req.session.user) {
            loggedIn = true;
            user = req.session.user;
        }

        const condoName = req.query.name;
        const condo = await Condo.findOne({cName: condoName});
        res.render('condoguest', {
            condo,
            loggedIn,
            user
        });
    } catch {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = condoguestController;