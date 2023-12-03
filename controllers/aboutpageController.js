async function aboutpageController(req, res) {
    try {
        let loggedIn = false;
        let user = null;

        if (req.session && req.session.user) {
            loggedIn = true;
            user = req.session.user;
        }

        res.render('aboutpage', {
            loggedIn,
            user
        });
    } catch {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = aboutpageController;