const Condo = require('../models/condo.js');

async function condoguestController(req, res) {
    try {
        const condoName = req.query.name;
        const condo = await Condo.findOne({cName: condoName});
        res.render('condoguest', { condo });
    } catch {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = condoguestController;