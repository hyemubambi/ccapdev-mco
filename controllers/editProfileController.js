const User = require('../models/user.js');

async function editProfileController(req, res) {
    try {   
        const username = req.query.username;
        const user = await User.findOne({ username: username });
        res.render(`editprofile`, {user});
    } catch (error){
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = editProfileController;