const Condo = require('../models/condo.js');

async function condoprofileController(req, res) {
    try {
        const condoName = req.query.name;
        console.log(condoName);
        const condo = await Condo.findOne({cName: condoName});
        console.log('condo: ', condo);
        if(condo){
            res.render('condoprofile', {condo});
        }
    } catch {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = condoprofileController;