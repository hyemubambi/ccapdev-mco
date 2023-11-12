//for switching between reviews and comments
function openTab(tabName, element) {
    var tabContents = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }

    var tabButtons = document.getElementsByClassName("tab-button");
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }

    document.getElementById(tabName).style.display = "block";
    element.classList.add("active");
}

function deletePost(e) {
    const postBox = e.target.closest('.review-container, .comment-container');

    if (postBox) {
        postBox.remove();
    }
}

function loadPFP (e) {
    var img = document.getElementById("main-pfp");
    img.src = URL.createObjectURL(e.target.files[0]);
};

//like and dislike
const reactions = {};

function clickLike(postId, likeBtn) {
    if (!reactions[postId]) {
        reactions[postId] = {
            liked: false,
            disliked: false,
            counter: 0
        };
    }

    const postReactions = reactions[postId];

    if (!postReactions.liked && !postReactions.disliked) {
        postReactions.liked = true;
        likeBtn.classList.add("active");
        postReactions.counter++;
    } else if (!postReactions.liked && postReactions.disliked) {
        postReactions.liked = true;
        postReactions.disliked = false;
        likeBtn.classList.add("active");
        postReactions.counter += 2;
    } else if (postReactions.liked && !postReactions.disliked){
        postReactions.liked = false;
        likeBtn.classList.remove("active");
        postReactions.counter--;
    }

    updateLikes(postId);
}

function clickDislike(postId, dislikeBtn) {
    if (!reactions[postId]) {
        reactions[postId] = {
            liked: false,
            disliked: false,
            counter: 0
        };
    }

    const postReactions = reactions[postId];

    if (!postReactions.liked && !postReactions.disliked) {
        postReactions.disliked = true;
        dislikeBtn.classList.add("active");
        postReactions.counter--;
    } else if (postReactions.liked && !postReactions.disliked) {
        postReactions.disliked = true;
        postReactions.liked = false;
        dislikeBtn.classList.add("active");
        postReactions.counter -= 2;
    } else if (!postReactions.liked && postReactions.disliked){
        postReactions.disliked = false;
        dislikeBtn.classList.remove("active");
        postReactions.counter++;
    }

    updateLikes(postId);
}

function updateLikes(postId) {
    const postLikes = document.querySelector(`#${postId} .likes-counter`);
    postLikes.textContent = reactions[postId].counter;
}


  