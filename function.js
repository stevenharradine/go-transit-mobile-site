function showTrains () {
	$(".data").find("table").each (function (index, item) {
	  if ($(this).html().indexOf("Train") < 0) {
	    $(this).hide()
	  }
	})
}

function showBuss () {
	$(".data").find("table").each (function (index, item) {
	  if ($(this).html().indexOf("Bus") < 0) {
	    $(this).hide()
	  }
	})
}
