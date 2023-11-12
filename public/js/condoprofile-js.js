function post(img_src){
				
    var currentDate = new Date();
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var formattedDate = currentDate.toLocaleDateString(undefined, options);
    var options_numerical = { year: 'numeric', month: '2-digit', day: '2-digit' };
    var formattedDate_numerical = currentDate.toLocaleDateString(undefined, options_numerical);
   

    const review_Id = "review-" + new Date().getTime();

    console.log(review_Id);

	var review_title = document.getElementById("review-title").value;
	var review_body = document.getElementById("review-content").value;	
    var review_rating = document.getElementById("review-rating").value;

    if (review_title.trim() === "" || review_body.trim() === "" || review_rating.trim() === "") {
        alert("Please fill in all fields before posting.");
        return;
    }

    var user_image =  document.createElement("img");
    user_image.setAttribute("src", img_src);
    user_image.setAttribute("class", "user-image");

    var review_user_h3 = document.createElement("h3");
    var review_title_h3 = document.createElement("h3");
    var review_rating_h5 = document.createElement("h5");
    var review_options_header_a = document.createElement("a");
    var review_edit_a = document.createElement("a");
    var review_delete_a = document.createElement("a");
    var review_body_p = document.createElement("p");
    var review_comment_img = document.createElement("img");
    var review_like_img = document.createElement("img");
    var review_like_counter_p =document.createElement("p");
    var review_dislike_img = document.createElement("img");
    var review_dislike_counter_p =document.createElement("p");

    var review_options_header_div = document.createElement("div");
    var review_options_div = document.createElement("div");
    var review_user_rating_div = document.createElement("div");
    var review_header_post_div = document.createElement("div");
    var review_content_post_div = document.createElement("div");
    var review_footer_div = document.createElement("div");
    var review_footer_buttons_div = document.createElement("div");
    var review_footer_comment_div = document.createElement("div");
    var review_footer_like_div = document.createElement("div");
    var review_footer_dislike_div = document.createElement("div");
    var review_footer_date_div = document.createElement("div");
    var review_comment_div= document.createElement("div");

    var review_div = document.createElement("div");
    
    var review_user_node = document.createTextNode("Sabrina Carpenter @SabrinaKarpintero");
    var review_options_header_node = document.createTextNode("o o o");
    var review_edit_node = document.createTextNode("Edit");
    var review_delete_node = document.createTextNode("Delete");
    var review_rating_node = document.createTextNode(review_rating);
    var review_title_node = document.createTextNode(review_title);
    var review_body_node = document.createTextNode(review_body);
    var review_like_counter_node = document.createTextNode("0");
    var review_dislike_counter_node = document.createTextNode("0");
    var review_footer_date_node = document.createTextNode("Date Reviewed: " + formattedDate);

    review_rating_node.appendData("/5");

    review_user_h3.appendChild(review_user_node);
    review_rating_h5.appendChild(review_rating_node);

    review_user_rating_div.appendChild(review_user_h3);
    review_user_rating_div.appendChild(review_rating_h5);

    review_user_rating_div.setAttribute("class", "review-user-rating-post");

    review_edit_a.appendChild(review_edit_node);
    review_edit_a.setAttribute("class", "edit-review");

    review_delete_a.appendChild(review_delete_node);
    review_delete_a.setAttribute("class", "delete-review");

    review_options_div.appendChild(review_edit_a);
    review_edit_a.onclick = function () {edit_review(review_title_h3, review_body_p)};

    review_options_div.appendChild(review_delete_a);
    review_delete_a.onclick = function() { delete_review(review_div)};

    
    review_options_div.setAttribute("class", "dropdown-content");

    review_options_header_a.appendChild(review_options_header_node);

    review_options_header_div.appendChild(review_options_header_a);

    review_options_header_div.appendChild(review_options_div);

    review_options_header_div.setAttribute("class", "dropdown");

    review_header_post_div.appendChild(user_image);
    review_header_post_div.appendChild(review_user_rating_div);
    review_header_post_div.appendChild(review_options_header_div);

    review_header_post_div.setAttribute("class", "review-header-post");

    review_title_h3.appendChild(review_title_node);
    review_body_p.appendChild(review_body_node);

    review_content_post_div.appendChild(review_title_h3);
    review_content_post_div.appendChild(review_body_p);

    review_content_post_div.setAttribute("class", "review-content-post");
    
    review_like_counter_p.appendChild(review_like_counter_node);
    review_dislike_counter_p.appendChild(review_dislike_counter_node);

    review_like_counter_p.setAttribute("id", review_Id + "-like-counter");
    review_dislike_counter_p.setAttribute("id", review_Id + "-dislike-counter");


    review_comment_img.setAttribute("src", "svgs/comment.svg");
    review_like_img.setAttribute("src", "svgs/like.svg");
    review_dislike_img.setAttribute("src", "svgs/dislike.svg");

    review_comment_img.addEventListener("click", function () {addComment(review_Id, document.createTextNode("Sabrina Carpenter @SabrinaKarpintero"), img_src);});
    review_like_img.addEventListener("click", function () {incrementLikeCount(review_Id);});
    review_dislike_img.addEventListener("click", function () {incrementDislikeCount(review_Id);});

    review_footer_comment_div.appendChild(review_comment_img);

    review_footer_comment_div.setAttribute("class", "review-footer-comment");

    review_footer_like_div.appendChild(review_like_img);
    review_footer_like_div.appendChild(review_like_counter_p);

    review_footer_like_div.setAttribute("class", "review-footer-like");

    review_footer_dislike_div.appendChild(review_dislike_img);
    review_footer_dislike_div.appendChild(review_dislike_counter_p);

    review_footer_dislike_div.setAttribute("class", "review-footer-dislike");

    review_footer_buttons_div.appendChild(review_footer_comment_div);
    review_footer_buttons_div.appendChild(review_footer_like_div);
    review_footer_buttons_div.appendChild(review_footer_dislike_div);

    review_footer_buttons_div.setAttribute("class", "review-footer-buttons");

    review_footer_date_div.appendChild(review_footer_date_node);

    review_footer_date_div.setAttribute("class", "review-footer-date");
    review_footer_date_div.setAttribute("id", formattedDate_numerical);

    review_footer_div.appendChild(review_footer_buttons_div);
    review_footer_div.appendChild(review_footer_date_div);

    review_footer_div.setAttribute("class", "review-footer-post");

    review_comment_div.setAttribute("id", review_Id + "-comment");

    review_div.appendChild(review_header_post_div);
    review_div.appendChild(review_content_post_div);
    review_div.appendChild(review_footer_div);
    review_div.appendChild(review_comment_div);


    review_div.setAttribute("id", "review-new");

    var review_container = document.getElementById("review-container-user");
        
    review_container.appendChild(review_div);

    const formToReset = document.getElementById('review-form');
      formToReset.addEventListener('submit', (e) => {
         e.preventDefault();
         formToReset.reset();
         
    });
}

function delete_review(x) {	  

    x.parentNode.removeChild(x);
   
}

function addComment(id, user, img) {
    const review_comment_prompt = prompt("Add your comment:");
    if (review_comment_prompt !== null) { 
        
        var review_comment_user_h3 = document.createElement("h3");

        var review_user_img = document.createElement("img");
        review_user_img.setAttribute("src", img);
        review_user_img.setAttribute("class", "user-image");

        var review_comment_p = document.createElement("p");
        var review_comment_hr = document.createElement("hr");

        var review_comment_header_div = document.createElement("div");

        review_comment_user_h3.appendChild(user);

        review_comment_header_div.appendChild(review_user_img);
        review_comment_header_div.appendChild(review_comment_user_h3);

        review_comment_header_div.setAttribute("class", "review-comment-header");

        review_comment_p.textContent = review_comment_prompt;

        var review_comment_div = document.getElementById(id + "-comment");

        review_comment_div.setAttribute("class", "review-comment");

        review_comment_div.appendChild(review_comment_header_div);
        review_comment_div.appendChild(review_comment_p);
        review_comment_div.appendChild(review_comment_hr);
        
       
    }
}

function incrementLikeCount(review_Id) {
    const likeCounter = document.getElementById(review_Id + "-like-counter");
    const count = parseInt(likeCounter.textContent);
    likeCounter.textContent = count + 1;
}

function incrementDislikeCount(review_Id) {
    const dislikeCounter = document.getElementById(review_Id + "-dislike-counter");
    const count = parseInt(dislikeCounter.textContent);
    dislikeCounter.textContent = count + 1;
}

$(document).ready(function(){
    var originalReviewOrder = [];
    var reviewDivs = document.querySelectorAll(".review-new");

    reviewDivs.forEach(function (reviewDiv) {
        originalReviewOrder.push(reviewDiv);
    });

    $('#review-sort-dropdown').change(function() {
        var selectedValue = $(this).val();
        if (selectedValue === '2') {
            SortReviewbyLikes();
        } else if (selectedValue === '1') {
            SortReviewbyDate();
        }
    });

    function SortReviewbyLikes() {
        var list = $("#review-container-user");
        var likeDiv = list.find(".review-footer-like").get();
        likeDiv.sort(function(a, b){
            var compA = parseInt($(a).children("p").text(), 10);
            var compB = parseInt($(b).children("p").text(), 10);
            return (compA > compB) ? -1 : (compA < compB) ? 1 : 0;
        });
        $.each(likeDiv, function(idx, itm){
            list.append($(itm).parents("#review-new"));
        });
    }

    function SortReviewbyDate() {
        console.log("Sort by Date");
        var list = $("#review-container-user");
        var dateList = list.find(".review-footer-date").get();
        dateList.sort(function(a, b){
            var compA = new Date($(a).attr('id'));
            var compB = new Date($(b).attr('id'));
            console.log("compA: " + compA);
            console.log("compB: " + compB);
            return (compA > compB) ? -1: (compA < compB) ? 1:0;
        });
        $.each(dateList, function(idx, itm){
            console.log("appending" + itm);
            list.append($(itm).parents("#review-new"));
        });
    }
});

function edit_review(review_title, review_body) {
   
    var review_new_title = prompt('Edit review title:', review_title.textContent);
    var review_new_body = prompt('Edit review body:', review_body.textContent);

 
    if (review_new_title === null || review_new_title.trim() === '' || review_new_body === null || review_new_body.trim() === '') {
        alert('Review update canceled or fields left empty.');
        return;
    }

    review_title.textContent = review_new_title;
    review_body.textContent = review_new_body;
}

$(document).ready(function () {
    var review_current = document.getElementById('review-new');
    var review_current_title = document.getElementById('review-comment-title');
    var review_current_edit = review_current.querySelector('.edit-review');
    var review_current_delete = review_current.querySelector('.delete-review');

    review_current_edit.addEventListener('click', function () {
        edit_review(review_current_title, review_current.querySelector('p'));
    });

    review_current_delete.addEventListener('click', function () {
        delete_review(review_current);
    });
});