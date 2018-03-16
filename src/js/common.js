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


	// Mobile
	// var mobileSandwich = $('#mobileSandwich'),
	// 		mobileCloseSandwich = $('#mobileCloseSandwich');

});
