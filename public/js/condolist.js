function hideShowItems() {
  var rangeFrom = parseInt($("#rangeFrom").val());
  var rangeTo = parseInt($("#rangeTo").val());
  var sortType = $("#sortType").val();

  if (!isNaN(rangeFrom) && !isNaN(rangeTo)) {
    $(".recommended-condo").hide();

    $(".recommended-condo").each(function() {
      var rating = parseFloat($(this).data('rating'));
      var budgetLow = parseFloat($(this).data('budget-low'));
      var budgetHigh = parseFloat($(this).data('budget-high'));

      if (sortType === 'rating') {
        if (rating >= rangeFrom && rating <= rangeTo) {
          $(this).show();
        }
      } else if (sortType === 'budget') {
        if (budgetLow >= rangeFrom && budgetHigh <= rangeTo) {
          $(this).show();
        }
      }
    });
  } else {
    $(".recommended-condo").show();
  }
}

$(document).ready(function() {
    function sortByCondoName() {
      var list = $("#condo-sorting");
      var listitems = list.find(".recommended-condo").get();
      listitems.sort(function(a, b) {
        var compA = $(a).find(".condo-name").text().toUpperCase();
        var compB = $(b).find(".condo-name").text().toUpperCase();
        return compA.localeCompare(compB);
      });
      $.each(listitems, function(idx, itm) {
        list.append(itm);
      });
    }
  
    sortByCondoName();
  
    $("#applySorting").click(function() {
      var sortType = $("#sortType").val();
      var sortOrder = $("#sortOrder").val();
  
      var list = $("#condo-sorting");
      var listitems = list.children(".recommended-condo").get();
  
      listitems.sort(function(a, b) {
        var compA, compB;
  
        if (sortType === 'rating') {
          compA = parseFloat($(a).data('rating'));
          compB = parseFloat($(b).data('rating'));
        } else if (sortType === 'budget') {
          compA = parseFloat($(a).data('budget-low'));
          compB = parseFloat($(b).data('budget-low'));
        }
  
        if (sortOrder === 'asc') {
          return compA - compB;
        } else {
          return compB - compA;
        }
        
      });

      hideShowItems();
  
      $.each(listitems, function(idx, itm) {
        list.append(itm);
      });
    });
  });
  