function showme (type) {
	var counter = 0;

	$(".data").find("table").each (function (index, item) {
	  $(this).show()

	  if ($(this).html().indexOf(type) < 0) {
	    $(this).hide()
	  } else {
	    $(this).find("tr").removeClass("tblrow").removeClass("tblaltrow").addClass(counter++ % 2 === 0 ? "tblrow" : "tblaltrow")
	  }
	})

	$(".nav-level-2 a").each (function (index, item) {
	  $(this).removeClass("selected")
	  if ($(this).html().toLowerCase().indexOf (localStorage.getItem('show')) >= 0) {
	    $(this).addClass("selected")
	  }
	})
}

$(".nav a").each (function (index, item) {
  if ($(this).attr("href") === location.pathname) {
    $(this).addClass("selected")
  }
})

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
