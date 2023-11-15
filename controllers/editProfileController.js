const User = require('../models/user.js');

async function editProfileController(req, res) {
    try {   
        const {user} = req.query.user;
        res.render(`/editprofile?username=${user}`);
    } catch {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = editProfileController;