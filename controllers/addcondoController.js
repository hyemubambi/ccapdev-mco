const Condo = require('../models/condo.js');
const db = require('../models/db.js');


async function addCondoController(req, res){
    try {
        res.render('addcondo');
    } catch {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function postAddCondo(req, res){

    try {
        var cName = req.body.name;
        var description = req.body.description;
        var lRange = req.body.budgetLower;
        var hRange = req.body.budgetUpper;
        const photo = "uploads/" + req.file.filename;
    
        var newCondo = {
            cName: cName,
            description: description,
            lRange: lRange,
            hRange: hRange,
            photo: photo
        }

        var response = await db.insertOne(Condo, newCondo);
        console.log('New Condo: ', response);

        res.redirect(`/condoprofile?name=${newCondo.cName}`);
    } catch {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
    
}

module.exports = {
    addCondoController,
    postAddCondo
};