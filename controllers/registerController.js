const db = require('../models/db');
const User = require('../models/user');
async function registerController(req, res) {
    try {
        res.render('register');
    } catch {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
async function postRegister(req, res){

    try {
        var email = req.body.Email;
        var password = req.body.password;
        var username = req.body.username;
 
    
        var newUser = {
            username: username,
            password: password,
            email: email,
            fName: "",
            lName: "",
            uCondo: "",
            bio: ""
        }

        var response = await db.insertOne(User, newUser);
        console.log('New User: ', response);
       res.redirect(`homepage`);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
    
}


module.exports = {
    registerController,
    postRegister
};