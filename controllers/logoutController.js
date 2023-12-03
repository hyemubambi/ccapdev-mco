const User = require('../models/user');

async function logoutController(req, res) {
    try {
        req.session.destroy(err => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).send('Internal Server Error');
            }
            // Redirect the user to the homepage or any other appropriate page after logout
            res.redirect('/'); // Redirect to the homepage
        });
    } catch {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = logoutController;