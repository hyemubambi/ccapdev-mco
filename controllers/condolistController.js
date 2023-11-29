const Condo = require('../models/condo.js');

async function condolistController(req, res) {
    try {
        const condos = await Condo.find().sort({ cName: 1 });
        res.render('condolist', { condos });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = condolistController;
