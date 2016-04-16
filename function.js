function showme (type) {
	$(".data").find("table").each (function (index, item) {
	  $(this).show()
	  if ($(this).html().indexOf(type) < 0) {
	    $(this).hide()
	  }
	})
}

$('.showTrain').bind ("click", function (e) {
	e.preventDefault()
	localStorage.setItem('show','train')

	showme("Train")
})

$('.showBus').bind ("click", function (e) {
	e.preventDefault()
	localStorage.setItem('show','bus')

	showme("Bus")
})

var show = localStorage.getItem('show')
if (show !== null) {
	if (show === "train") {
		showme ("Train")
	} else {
		showme ("Bus")
	}
}
