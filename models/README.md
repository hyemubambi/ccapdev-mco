# Models
- db.js
- user.js
- condo.js
- review.js
- comment.js

# user.js
- username
- password
- fName : first name
- lName : last name
- uCondo : condo where user currently resides in
- bio
- pfp : profile picture, default icon is in public/images
- admin : boolean variable that determines if user is an admin or not

# condo.js
- cName : condo name
- description
- lRange : lower range of budget
- hRange : higher range of budget
- nReviews : number of reviews/ratings the condo has
- rating : overall average rating from reviews
- photo

# review.js
- title
- text : body of the review
- username : username of the user which this review belongs to
- condo : name of condo wherein this review belongs to
- rating : integer number out of 5
- date : includes date and time when the review is created
- likes : number of likes the review has
- dislikes : number of dislikes the review has
- photos : array of strings that contains the photos uploaded to the review, maximum of 4 per review

# comment.js
- text
- username : username of user which this comment belongs to
- review : id of the review wherein this comment belongs to
- date : includes date and time when the comment is created
- likes : number of likes the comment has
- dislikes : number of dislikes the comment has
