const User = require('../models/user.js');
const Condo = require('../models/condo.js');
const Review = require('../models/review.js');
const Comment = require('../models/comment.js');

async function userProfileController(req, res) {
    try {
        const username = req.query.username;
        console.log("username" + username);

        // Find the user by username
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).send('User not found');
        }

        console.log('user: ', user);

        // Find reviews made by the user
        const userReviews = await Review.find({ username: username });

        // Find reviews that have comments made by the user
        const userCommentedReviewIds = (await Comment.find({ username: username })).map(comment => comment.review);
        const reviewsWithUserComments = await Review.find({ _id: { $in: userCommentedReviewIds } });

        const uCondo = user.uCondo;
        const condo = await Condo.findOne({ cName: uCondo });

        if (condo) {
            res.render('userprofile', { user, condo, reviews: userReviews, comments: reviewsWithUserComments });
        }
    } catch (error) {
        // Properly log the error
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = userProfileController;
