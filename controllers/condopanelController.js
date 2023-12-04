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
async function editCondoProfile(req, res) {
    const { cName } = req.body;
    const { name, description, budgetLower, budgetUpper, image } = req.body;
    let user = null;
  
    // Get the uploaded file information
    const uploadedFile = "uploads/" + req.file.filename;
  
    // Find the condo by its cName and update it
    const condo = await Condo.findOneAndUpdate({ cName }, { name, description, lRange: budgetLower, hRange: budgetUpper, photo: uploadedFile }, { new: true });
  
    // Fetch the list of condos
    const condos = await Condo.find().sort({cName: 1});
  
    loggedIn = true;
    user = req.session.user;
  
    if (!condo) {
        return res.status(404).send('Condo not found');
    }
  
    res.render('condopanel', {
        condos,
        loggedIn,
        user
    });
  }
  
 

  async function deleteCondoProfile(req, res) {
    const { cName } = req.body;
    let user = null;
    const condos = await Condo.find().sort({cName: 1});
    loggedIn = true;
    user = req.session.user;
    // Find the condo by its cName and remove it
    const condo = await Condo.findOneAndDelete({ cName });
   
    if (!condo) {
        return res.status(404).send('Condo not found');
    }
   
    res.render('condopanel', {
        condos,
        loggedIn,
        user
    });
   }
   
   module.exports = {
    renderCondoPanel,
    editCondoProfile,
    deleteCondoProfile
};
