$(document).ready(function() {
    $(".comment-input").hide();
    $(".comment-line").hide();

    $(".like-button").click(function() {
        var likeCounter = $(this).siblings(".like-counter");
        var currentCount = parseInt(likeCounter.text());
        var likeClicked = $(this).data('clicked');
        
        if (!likeClicked) {
            likeCounter.text(currentCount + 1);
        } else {
            likeCounter.text(currentCount - 1);
        }

        $(this).data('clicked', !likeClicked);
        $(this).find(".svg-fill").toggleClass("clicked");
    });

    $(".dislike-button").click(function() {
        var dislikeCounter = $(this).siblings(".dislike-counter");
        var currentCount = parseInt(dislikeCounter.text());
        var dislikeClicked = $(this).data('clicked');
        
        if (!dislikeClicked) {
            dislikeCounter.text(currentCount + 1);
        } else {
            dislikeCounter.text(currentCount - 1);
        }

        $(this).data('clicked', !dislikeClicked);
        $(this).find(".svg-fill").toggleClass("clicked");
    });

    $(".comment-like-button").click(function() {
        var commLikeCounter = $(this).siblings(".comment-like-counter");
        var currentCount = parseInt(commLikeCounter.text());
        var commLikeClicked = $(this).data('clicked');
        
        if (!commLikeClicked) {
            commLikeCounter.text(currentCount + 1);
        } else {
            commLikeCounter.text(currentCount - 1);
        }

        $(this).data('clicked', !commLikeClicked);
        $(this).find(".svg-fill").toggleClass("clicked");
    });

    $(".comment-dislike-button").click(function() {
        var commDislikeCounter = $(this).siblings(".comment-dislike-counter");
        var currentCount = parseInt(commDislikeCounter.text());
        var commDislikeClicked = $(this).data('clicked');
        
        if (!commDislikeClicked) {
            commDislikeCounter.text(currentCount + 1);
        } else {
            commDislikeCounter.text(currentCount - 1);
        }

        $(this).data('clicked', !commDislikeClicked);
        $(this).find(".svg-fill").toggleClass("clicked");
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

    $('#review-container-user').on('click', '.review-edit-button', function() {
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