$(document).ready(function() {
    function sortByNoRatings() {
        var list = $("#most-reviewed-container");
        var listitems = list.find(".most-reviewed-item").get();
        listitems.sort(function(a, b) {
            var compA = parseInt($(a).find('.no-ratings').text().match(/\d+/), 10);
            var compB = parseInt($(b).find('.no-ratings').text().match(/\d+/), 10);
            return compB - compA;
        });
        $.each(listitems, function(idx, itm) {
            list.append(itm);
        });
    }

    sortByNoRatings();
});
