const Condo = require('../models/condo.js');

async function renderCondoPanel(req, res) {
    try {
        // const condos = await Condo.find().sort({cName: 1});
        res.render('condopanel');
    } catch {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    renderCondoPanel
};