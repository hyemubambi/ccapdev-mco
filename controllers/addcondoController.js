const Condo = require('../models/condo.js');
const db = require('../models/db.js');
const cloudinary = require('./cloudinary');

async function postAddCondo(req, res){

    try {
        var cName = req.body.name;
        var description = req.body.description;
        var lRange = req.body.budgetLower;
        var hRange = req.body.budgetUpper;
        const photo = req.file.path;
    
        const result = await cloudinary.uploader.upload(photo);

        var newCondo = {
            cName: cName,
            description: description,
            lRange: lRange,
            hRange: hRange,
            photo: result.secure_url
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
    postAddCondo
};