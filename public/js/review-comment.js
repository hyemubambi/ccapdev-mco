$(document).ready(function() {
    $(".comment-input").hide();
    $(".comment-line").hide();

    const dateToday = new Date();
    const optionsDate = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const formattedDate = dateToday.toLocaleString('en-US', optionsDate);

    const optionsTime = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };
    const formattedTime = dateToday.toLocaleString('en-US', optionsTime).replace(' ', '');

    const formattedDateTime = formattedDate + ' ' + formattedTime;

    $('.review-date-time').text(formattedDateTime);
    $('.comment-date-time').text(formattedDateTime);

    var likeClicked = false;
    $(".like-button").click(function() {
        likeClicked = !likeClicked;
        var likeCounter = parseInt($(".like-counter").text());
        $(".like-counter").text(likeCounter + 1);

        if (likeClicked) {
            $(".like-counter").text(likeCounter + 1);
        } else {
            $(".like-counter").text(likeCounter - 1);
        }
    });

    var commLikeClicked = false;
    $(".comment-like-button").click(function() {
        commLikeClicked = !commLikeClicked;
        var commLikeCounter = parseInt($(".comment-like-counter").text());
        $(".comment-like-counter").text(commLikeCounter + 1);
        $(".comment-like-button .svg-fill").toggleClass("clicked");
        if (commLikeClicked) {
            $(".comment-like-counter").text(commLikeCounter + 1);
        } else {
            $(".comment-like-counter").text(commLikeCounter - 1);
        }
    });

    var dislikeClicked = false;
    $(".dislike-button").click(function() {
        dislikeClicked = !dislikeClicked;
        var dislikeCounter = parseInt($(".dislike-counter").text());
        $(".dislike-counter").text(dislikeCounter + 1);

        $(".dislike-button .svg-fill").toggleClass("clicked");

        if (dislikeClicked) {
            $(".dislike-counter").text(dislikeCounter + 1);
        } else {
            $(".dislike-counter").text(dislikeCounter - 1);
        }
    });

    var commDislikeClicked = false;
    $(".comment-dislike-button").click(function() {
        commDislikeClicked = !commDislikeClicked;
        var commDislikeCounter = parseInt($(".comment-dislike-counter").text());
        $(".comment-dislike-counter").text(commDislikeCounter + 1);

        $(".comment-dislike-button .svg-fill").toggleClass("clicked");

        if (commDislikeClicked) {
            $(".comment-dislike-counter").text(commDislikeCounter + 1);
        } else {
            $(".comment-dislike-counter").text(commDislikeCounter - 1);
        }
    });

    var commentButtonClicked = false;
    $(".comment-button").click(function() {
        commentButtonClicked = !commentButtonClicked;
        $(".comment-button .svg-fill").toggleClass("clicked");
        
        if (commentButtonClicked) {
            $(".comment-input").show();
            $(".comment-line").show();
        } else {
            $(".comment-input").hide();
            $(".comment-line").hide();
        }
    });

    $(document).on("click", ".review-delete-button", function(e) {
        const postBox = e.target.closest('.review');

        if (postBox) {
            postBox.remove();
    }
    });

    $(document).on("click", ".comment-delete-button", function(e) {
        const postBox = e.target.closest('.comment');

        if (postBox) {
            postBox.remove();
        }
    });

    $('#review-container').on('click', '.review-edit-button', function() {
        const reviewDiv = $(this).closest('.review');
        const reviewBody = reviewDiv.find('.review-body');
        const reviewText = reviewBody.text().trim();
        
        // Create an editable textarea and a save button
        const textarea = $('<textarea>').val(reviewText);
        const saveButton = $('<button>').text('Save');
  
        saveButton.on('click', function() {
          const newReviewText = textarea.val();
          reviewBody.text(newReviewText);
          textarea.remove();
          saveButton.remove();
        });
  
        reviewBody.after(textarea, saveButton);
    });

    $('.review-comments-container').on('click', '.comment-edit-button', function() {
        const commentDiv = $(this).closest('.comment');
        const commentBody = commentDiv.find('.comment-body');
        const commentText = commentBody.text().trim();
        
        // Create an editable textarea and a save button
        const textarea = $('<textarea>').val(commentText);
        const saveButton = $('<button>').text('Save');
  
        saveButton.on('click', function() {
          const newCommentText = textarea.val();
          commentBody.text(newCommentText);
          textarea.remove();
          saveButton.remove();
        });
  
        commentBody.after(textarea, saveButton);
    });

});