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

// filter results from previous session
var show = localStorage.getItem('show')
if (show !== null) {
	if (show === "train") {
		showme ("Train")
	} else {
		showme ("Bus")
	}
}

// departures filtering buttons
function showDeparturesClickBinding (type) {
	$('.show' + type).bind ("click", function (e) {
		e.preventDefault()

		localStorage.setItem('show',type.toLowerCase())
		showme(type)
	})
}
showDeparturesClickBinding ("Train")
showDeparturesClickBinding ("Bus")

// highlight primary nav
$(".nav a").each (function (index, item) {
  if ($(this).attr("href") === location.pathname) {
    $(this).addClass("selected")
  }
})

// toggle more details on delayed trains
$(".delayLink").each (function (index, item) {
  $(item).bind ("click", function () {
    $(item).parent().find(".messageDisrp").toggle();
  })
})