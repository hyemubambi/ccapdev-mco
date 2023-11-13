const Condo = require('../models/condo');

async function homepageController(req, res) {
    try {
        const condos = await Condo.find().sort({ nReviews: -1 }).limit(5);
        res.render('homepage', {condos});
    } catch {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = homepageController;