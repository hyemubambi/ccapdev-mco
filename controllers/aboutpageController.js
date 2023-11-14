async function aboutpageController(req, res) {
    try {
        res.render('aboutpage');
    } catch {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = aboutpageController;