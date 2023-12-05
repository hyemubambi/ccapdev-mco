const Condo = require('../models/condo.js');
const Review = require('../models/review.js');
const Comment = require('../models/comment.js');
const User = require('../models/user.js');

async function condoprofileController(req, res) {
    try {
        let loggedIn = false;
        let user = null;

        if (req.session && req.session.user) {
            loggedIn = true;
            user = req.session.user;

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
                    user,
                });
            }
        } else {

            const condoName = req.query.name;
            console.log(condoName);
            const condo = await Condo.findOne({cName: condoName});
            console.log('condo: ', condo);
            if(condo){

                res.render('condoguest', {
                    condo,
                    loggedIn,
                    user,
                });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
        console.log(error);
    }
}

async function submitReview(req, res) {
    try {
        const { reviewCondo, reviewUsername, reviewTitle, reviewRating, reviewText } = req.body;
        const reviewDate = new Date().toISOString();

        console.log("USERNAME: ", reviewUsername);
 
        const userProfile = await User.findOne({ username: reviewUsername });

        if (!userProfile) {
            console.error('User not found:', reviewUsername);
            res.status(404).send('User not found');
            return;
        }
 
        // Extract file details from req.files
        const fileDetails = req.files['review-photos'].map(file => {
            return file.filename; // Extracting only the filename
        });
 
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
            photos: fileDetails, // Add uploaded file details to the review
            reviewPfp: userProfile.pfp,
            reviewFirstName: userProfile.fName,
            reviewLastName: userProfile.lName,
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
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}


async function submitComment(req, res) {
    try {
        // Log the request body to see what data is being received
        const {commentText} = req.query;
        const {commentUsername} = req.query;
        const {reviewId} = req.query;
        const {commentCondo} = req.query;
        const commentDate = new Date().toISOString();

        const userProfile = await User.findOne({ username: commentUsername });

        // Create a new review instance
        const newComment = new Comment({
            text: commentText,
            username: commentUsername,
            review: reviewId,
            condo: commentCondo,
            date: commentDate,
            likes: 0,
            dislikes: 0,
            commentPfp: userProfile.pfp,
            commentFirstName: userProfile.fName,
            commentLastName: userProfile.lName,
        });

        // Save the review to the database
        const savedComment = await newComment.save();

        const encodedCondo = encodeURIComponent(savedComment.condo);

        // Redirect to the condo profile page with the saved review's condo name
        res.redirect(`/condoprofile?name=${encodedCondo}&reviewId=${savedComment.review}`);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}



async function postDeleteReview(req, res){
    try{
        const reviewID = req.params.reviewID;
        const review = await Review.findById(reviewID);

        if (!review) {
            throw new Error('Review not found');
        }

        const condoName = review.condo;
        const condo = await Condo.findOne({ cName: condoName });

        if (!condo) {
            throw new Error('Condo not found');
        }
        
        const totalRatings = Math.round((condo.nReviews * condo.rating) - review.rating);
        condo.nReviews -= 1;
        if(condo.nReviews == 0){
            condo.rating = 0;
        }else{
            condo.rating = totalRatings / condo.nReviews;
        }
        await condo.save();

        await Review.findByIdAndDelete(reviewID);
        res.send('Review deleted Successfully');
    }catch (error){
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
async function postDeleteComment(req, res){
    try{
        const commentID = req.params.commentID;

        await Comment.findByIdAndDelete(commentID);
        res.send('Comment deleted Successfully');
    }catch (error){
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
async function updateReview(req, res){
    try{
        const reviewID = req.params.reviewID;
        const newText = req.body.newText;
        const updatedReview = await Review.findByIdAndUpdate(reviewID,
            {$set: {text: newText}},
            {new: true}
            );
        res.json({message: 'review updated Successfully', review: updatedReview})
    }catch (error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function updateComment(req, res){
    try{
        const commentID = req.params.commentID;
        const newText = req.body.newText;
        const updatedComment = await Comment.findByIdAndUpdate(commentID,
            {$set: {text: newText}},
            {new: true}
            );
        res.json({message: 'Comment updated Successfully', comment: updatedComment})
    }catch (error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function updateLikesDislikes(req, res){
    try{

        const {ID, action } = req.body;
        if(action === 'likeReview'){
            const review = await Review.findById(ID);
            review.likes += 1;
            await review.save();
        }else if (action === 'dislikeReview'){
            const review = await Review.findById(ID);
            review.dislikes += 1;
            await review.save();
        }else if(action === 'likeComment'){
            const comment = await Comment.findById(ID);
            comment.likes += 1;
            await comment.save();
        }else if (action === 'dislikeComment'){
            const comment = await Comment.findById(ID);
            comment.dislikes += 1;
            await comment.save();
        }

        res.status(200).json({ success: true, message: 'Likes and dislikes updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = {
    condoprofileController,
    submitReview,
    submitComment,
    postDeleteReview,
    postDeleteComment,
    updateReview,
    updateComment,
    updateLikesDislikes

};