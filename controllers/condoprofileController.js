const Condo = require('../models/condo.js');
const Review = require('../models/review.js');
const Comment = require('../models/comment.js');

async function condoprofileController(req, res) {
    try {
        let loggedIn = false;
        let user = null;

        if (req.session && req.session.user) {
            loggedIn = true;
            user = req.session.user;
        }

        const condoName = req.query.name;
        console.log(condoName);
        const condo = await Condo.findOne({cName: condoName});
        console.log('condo: ', condo);
        if(condo){
            const reviews = await Review.find({ condo: condoName });
            const reviewIds = reviews.map(review => review._id);
            const comments = await Comment.find({ review: { $in: reviewIds } });

            res.render('condoprofile', {
                condo,
                reviews,
                comments,
                loggedIn,
                user
            });
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

        const filter = { cName: savedReview.condo };
        const update = { $inc: { nReviews: 1 } };
        await Condo.updateOne(filter, update);

        // Calculate the average rating for the condo
        const reviewsForCondo = await Review.find({ condo: reviewCondo });
        const totalRatings = reviewsForCondo.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRatings / reviewsForCondo.length;

        // Update the condo's average rating in the database
        await Condo.updateOne({ cName: reviewCondo }, { $set: { rating: averageRating } });

        // Redirect to the condo profile page with the saved review's condo name
        res.redirect(`/condoprofile?name=${savedReview.condo}`);
    } catch {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function submitComment(req, res) {
    try {
        // Log the request body to see what data is being received
        const {commentText} = req.query;
        const {commentUsername} = req.query;
        const {reviewId} =req.query;
        const {commentCondo} = req.query;
        const commentDate = new Date().toISOString();

        // Create a new review instance
        const newComment = new Comment({
            text: commentText,
            username: commentUsername,
            review: reviewId,
            condo: commentCondo,
            date: commentDate,
            likes: 0,
            dislikes: 0,
        });

        // Save the review to the database
        const savedComment = await newComment.save();

        const encodedCondo = encodeURIComponent(savedComment.condo);

        // Redirect to the condo profile page with the saved review's condo name
        res.redirect(`/condoprofile?name=${encodedCondo}&reviewId=${savedComment.review}`);
    } catch {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    condoprofileController,
    submitReview,
    submitComment
};