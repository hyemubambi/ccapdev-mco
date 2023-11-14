const Condo = require('../models/condo.js');
const Review = require('../models/review.js');

async function condoprofileController(req, res) {
    try {
        const condoName = req.query.name;
        console.log(condoName);
        const condo = await Condo.findOne({cName: condoName});
        console.log('condo: ', condo);
        if(condo){
            const reviews = await Review.find({condo: condoName});
            res.render('condoprofile', {condo, reviews});
        }
    } catch {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function submitReview(req, res) {
    try {
        // Log the request body to see what data is being received
        const {reviewCondo} = req.query;
        const {reviewUsername} = req.query;
        const {reviewTitle} = req.query;
        const {reviewRating} = req.query;
        const {reviewText} = req.query;
        const reviewDate = new Date().toISOString();

        // Create a new review instance
        const newReview = new Review({
            title: reviewTitle,
            text: reviewText,
            username: reviewUsername,
            condo: reviewCondo,
            rating: reviewRating,
            date: reviewDate,
            likes: 0,
            dislikes: 0,
            photos: [],
        });

        // Save the review to the database
        const savedReview = await newReview.save();
        console.log('Saved Review:', savedReview);

        // Redirect to the condo profile page with the saved review's condo name
        res.redirect(`/condoprofile?name=${savedReview.condo}`);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    condoprofileController,
    submitReview
};