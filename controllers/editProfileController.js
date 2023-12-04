const User = require('../models/user.js');
const Condo = require('../models/condo.js');
const Review = require('../models/review.js');
const Comment = require('../models/comment.js');

async function editProfileController(req, res) {
    try {
        let loggedIn = false;
        let userSession = null;
        let user = null;

        if (req.session && req.session.user) {
            loggedIn = true;
            userSession = req.session.user;

            const username = req.session.user.username;
            user = await User.findOne({ username: username });
        }

        res.render('editprofile', {
            user,
            loggedIn,
            userSession
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
async function postEditPersonalInfo(req, res){
    try{
        const {fName, lName} = req.body;
        const userID = req.params.userID;


        const updateUser = await User.findByIdAndUpdate(userID, {fName, lName}, {new:true});
        if (!updateUser) {
            // Handle the case where the user is not found
            return res.status(404).send('User not found');
        }
        loggedIn = true;
        const user = req.session.user;
        const username = user.username;
        const userProfile = await User.findOne({ username: username });
        const reviews = await Review.find({ username: username });
        const reviewIds = reviews.map(review => review._id);
        const comments = await Comment.find({ review: { $in: reviewIds } });
        res.render('userprofile', {
            loggedIn, 
            user, 
            userProfile, 
            reviews,
            comments});
    }catch (error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
}
async function postEditAccountDetails(req, res){
    try{
        const {username} = req.body;
        const userID = req.params.userID;


        const updateUser = await User.findByIdAndUpdate(userID, {username}, {new:true});
        if (!updateUser) {
            // Handle the case where the user is not found
            return res.status(404).send('User not found');
        }
        loggedIn = true;
        const user = req.session.user;
        const userProfile = await User.findOne({ username: username });
        const reviews = await Review.find({ username: username });
        const reviewIds = reviews.map(review => review._id);
        const comments = await Comment.find({ review: { $in: reviewIds } });
        res.render('userprofile', {
            loggedIn, 
            user, 
            userProfile, 
            reviews,
            comments});
    }catch (error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// async function postAdditionalInfo(req, res){
//     try{
//         const {bio, uCondo} = req.body;
//         const userID = req.params.userID;


//         const updateUser = await User.findByIdAndUpdate(userID, {bio, uCondo}, {new:true});
//         if (!updateUser) {
//             // Handle the case where the user is not found
//             return res.status(404).send('User not found');
//         }
//         loggedIn = true;
//         const user = req.session.user;
//         const username = user.username;
//         const userProfile = await User.findOne({ username: username });
//         const reviews = await Review.find({ username: username });
//         const reviewIds = reviews.map(review => review._id);
//         const comments = await Comment.find({ review: { $in: reviewIds } });
//         res.render('userprofile', {
//             loggedIn, 
//             user, 
//             userProfile, 
//             reviews,
//             comments});
//     }catch (error){
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

module.exports = {
    editProfileController,
    postEditPersonalInfo,
    postEditAccountDetails,
};
