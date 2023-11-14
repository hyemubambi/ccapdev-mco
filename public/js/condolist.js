$(document).ready(function(){

    function sortByCondoName() {
        var list = $("#condo-sorting");
        var listitems = list.find(".recommended-condo").get();
        listitems.sort(function (a, b) {
            var compA = $(a).find(".condo-name").text().toUpperCase();
            var compB = $(b).find(".condo-name").text().toUpperCase();
            return compA.localeCompare(compB); // Use localeCompare for string comparison
        });
        $.each(listitems, function (idx, itm) {
            list.append(itm);
        });
    }

    sortByCondoName();

    $("#Sort-by-rating").click(function(){
        
        var list = $("#condo-sorting");
        var listitems = list.children(".recommended-condo").get();
        listitems.sort(function(a,b){
            var compA = parseFloat($(a).attr('id'));
            var compB = parseFloat($(b).attr('id'));
            return (compA > compB) ? -1: (compA < compB) ? 1:0;
        });
        $.each(listitems, function(idx, itm){
            list.append(itm);
        })
    });

    $("#Sort-by-budget").click(function(){
       
        var list = $("#condo-sorting");
        var budget = list.find(".budget").get();
        budget.sort(function(a,b){
            var compA = parseFloat($(a).attr('id'));
            var compB = parseFloat($(b).attr('id'));
            console.log("A: " + compA);
            console.log("B: " + compB);
            var res = (compA < compB) ? -1: (compA > compB) ? 1:0;
            console.log("Lower: " + res);

            if(res === 0){
                var highA = parseFloat($(a).next().attr('class'));
                var highB = parseFloat($(b).next().attr('class'));
                console.log("High A: " + highA);
                console.log("High B: " + highB);
                var res = (highA < highB) ? -1: (highA > highB) ? 1:0;
                console.log("Upper: " + res);
            }

            return res;
        });
        $.each(budget, function(idx, itm){
            list.append($(itm).parents(".recommended-condo"));
        });
    });
    
});

