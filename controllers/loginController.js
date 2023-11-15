const db = require('../models/db');
const User = require('../models/user');
async function loginController(req, res) {
    try {
        res.render('login');
    } catch {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
async function postLogin(req, res){

    try {
        var email = req.body.Email;
        var password = req.body.password;
        const user = await User.findOne({email: email})
        if(user){
            if(user.password === password){
                res.redirect(`/homepage?user=${user.username}`);
            }
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
    
}


module.exports = {
    loginController,
    postLogin
};