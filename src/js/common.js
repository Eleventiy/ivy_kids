$(function () {

	// Header
	var langLink = $('#languageLink'),
			landDrop = $('#languageDropdown'),
			profLink = $('#profileLink'),
			profDrop = $('#profileDropdown');

	langLink.click(function () {
		landDrop.toggleClass('active');

		return false;
	});

	profLink.click(function () {
		profDrop.toggleClass('active');

		return false;
	});

	$(document).click(function(){
		landDrop.removeClass('active');
		profDrop.removeClass('active');
	});


	// Readmore
	$('.about-descr__text').readmore({
		collapsedHeight: 265,
		// speed: 1000,
		moreLink: '<a class="read-more" href="#">Больше <i class="fa fa-angle-down"></i></a>',
		lessLink: '<a class="read-less" href="#">Меньше <i class="fa fa-angle-up"></i></a>'
	});


	// Accordions
	$('#accordion-courses').accordion({
		collapsible: true,
		heightStyle: "content",
		animate: 500,
		classes: {
			"ui-accordion-header-collapsed": "ui-corner-all",
			"ui-accordion-header-active": "ui-corner-all"
		}
	});


	//Slider
	$('#benefitsSlider').slick({});


	// Mobile
	// var mobileSandwich = $('#mobileSandwich'),
	// 		mobileCloseSandwich = $('#mobileCloseSandwich');

});
