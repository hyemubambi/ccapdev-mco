const Search = require('../models/condo');

async function searchController(req, res) {
    try {
        let loggedIn = false;
        let user = null;

        if (req.session && req.session.user) {
            loggedIn = true;
            user = req.session.user;
        }

        const {keyword} = req.query;

        if (!keyword || keyword.trim() === '') {
            return;
        }

        const condos = await Search.find({ cName: { $regex: new RegExp(keyword, 'i') } }).select('cName description lRange hRange nReviews rating photo');

        console.log('Search Keyword:', keyword);
        console.log('Number of Matching Condos:', condos.length);
        console.log('Search Results:', condos);

        res.render('searchCondo', {
            condos,
            loggedIn,
            user
        });
    } catch {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = searchController;
