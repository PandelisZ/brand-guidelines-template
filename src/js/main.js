jQuery(document).ready(function($) {
   sg.utility.init();

   $(window).resize(function(){ sg.utility.resize(); });
   $(window).scroll(function(){ sg.utility.onScroll(); });
});









/*
=============================================================================
	FUNCTION DECLARATIONS
=============================================================================
*/

var sg = (function($) {

	/*
		Utility
		
		Various utility functions that load/unload/route data,
		call other functions, etc.
	*/

	var utility = (function() {

		var debug = false;

		var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

		var init = function() { // Called on page load, calls all other functions that should occur on page load
			
			// PLUGINS CALLS / DEVICE FIXES
			conditionizr({ // http://conditionizr.com/docs.html
				debug      : false,
				scriptSrc  : 'js/vendor/conditionizr/',
				// styleSrc   : 'css/conditionizr/',
				ieLessThan : {
					active: true,
					version: '9',
					scripts: false,
					styles: false,
					classes: true,
					customScript: // Separate polyfills with commas
						'//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.6.1/html5shiv.js, //cdnjs.cloudflare.com/ajax/libs/respond.js/1.1.0/respond.min.js'
					},
				chrome     : { scripts: false, styles: false, classes: true, customScript: false },
				safari     : { scripts: false, styles: false, classes: true, customScript: false },
				opera      : { scripts: false, styles: false, classes: true, customScript: false },
				firefox    : { scripts: false, styles: false, classes: true, customScript: false },
				ie10       : { scripts: false, styles: false, classes: true, customScript: false },
				ie9        : { scripts: false, styles: false, classes: true, customScript: false },
				ie8        : { scripts: false, styles: false, classes: true, customScript: false },
				ie7        : { scripts: false, styles: false, classes: true, customScript: false },
				ie6        : { scripts: false, styles: false, classes: true, customScript: false },
				retina     : { scripts: false, styles: false, classes: true, customScript: false },
				touch      : { scripts: false, styles: false, classes: true, customScript: false },
				mac        : true,
				win        : true,
				x11        : true,
				linux      : true
			});

			if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) { // Disable scaling until user begins a gesture (prevents zooming when user rotates to landscape mode)
				var viewportmeta = document.querySelector('meta[name="viewport"]');
				if (viewportmeta) {
					viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
					document.body.addEventListener('gesturestart', function () {
						viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
					}, false);
				}
			}

			// FUNCTIONS
			stickyNav.init();

			
			// REPEATING FUNCTIONS
			// var example = setInterval(function(){
			// 	// do stuff
			// }, 200);


			/*
				USER INTERACTION
			*/
			$("a[href*=#]").click(function(e) {
				e.preventDefault();
				if ($(window).width() >= 826) { // If we're at sticky nav dimensions, offest should include nav height.
					smoothScroll($(this),-40 - $('nav').outerHeight());
				}
				else { 
					smoothScroll($(this),-40);
				}
			});
			
		};

		var onScroll = function() { // Called when the browser window is scrolled
			// Functions
		};

		var resize = function() { // Called when the browser window is resized
			// Functions
		};

		var responsiveState = function(req) { // Returns what responsive state we're at. Values based on CSS media queries.
			// Below is an idiotic bug fix.
			// Chrome & Safari exclude scrollbars from window width for CSS media queries.
			// Firefox, Opera and IE include scrollbars in window width for CSS media queries, but not in JS.
			// So we have to add some px to the window width for Firefox, Opera and IE so that breakpoints
			// match up between CSS and JS. What a world.
			if ($('html').hasClass('chrome') || $('html').hasClass('safari')) {
				var winWidth = $(window).width();
			}
			else {
				var winWidth = $(window).width() + 17;
			}

			if (typeof req === 'undefined' || req === 'state') {
				// MODIFY THESE IF STATEMENTS TO MATCH YOUR RESPONSIVE WIDTHS
				if (winWidth >= 1025) {
					return 'full';
				}
				if (winWidth >= 768 && winWidth <= 1024) {
					return 'compressed';
				}
				if (winWidth <= 767) {
					return 'oneCol';
				}
				// STOP MODIFYING HERE.
			}
			else {
				return winWidth;
			}
		};

		var smoothScroll = function(el,o) {
			// Setup variables
			var target = el.attr('href');
			var offset = (function(){
				if (typeof o != 'undefined') {
					return o;
				}
				else {
					return 0;
				}
			})();
			// Perform scroll
			$(target).velocity("scroll", { 
				duration: 500,
				offset: offset,
				easing: "easeInOutQuart",
				begin: function() { },
				complete: function() { 
					// Set URL hash
					if (history.pushState) {
						history.pushState(null, null, target);
					}
					else { // Fallback for old browsers
						location.hash = target;
					}
				}
			}); 
		};

		var interval = window.setInterval(function(){
			stickyNav.init();
		}, 50);

		return  {
			init: init,
			onScroll: onScroll,
			resize: resize,
			responsiveState: responsiveState
		}
	})();
	/* 
		UI Modifications 

		Various functions which operate on elements to achieve visual
		effects that are impossible to create with CSS alone.
	*/

	var uiMod = (function() {

		var heightMatcher = function() { // Matches the height of various elements to other elements in ways that are impossible with CSS alone
			
		};

		// public
		return {
			heightMatcher: heightMatcher
		};
	})(); // var uiMod = (function() {


	/* 
		Sticky navigation

		Sticks the navigation to the top of the page if the user scrolls down and stuff.
	*/
	var stickyNav = (function() {

		// Object to hold various distances.
		var distances = {
			navOffset: 
				(function(){
					return $('nav').offset();
				})(),
		};

		var init = function(){
			if ($(window).width() <= 825) { // Only stick the nav when it can be one row.
				destroy(); // Nav can't be in one row, destroy.
			}
			else { // Nav can be in one row, stick it.
				if ($(window).scrollTop() >= distances.navOffset.top) {
					stickNav();
				}
				else {
					destroy();
				}
			}
		};

		var destroy = function() {
			$('nav').removeAttr('style');
			$('.spaceTaker').remove();
		};

		var stickNav = function() {
			// Postition the nav
			$('nav').css({
				position: 'fixed',
				top: '0',
				right: '0',
				left: '0',
				zIndex: '99999'
			});
			// Append an element to take up the space that the nav is leaving behind
			if (document.getElementsByClassName('spaceTaker').length === 0) {
				$('nav').after('<div class="spaceTaker" style="height: ' + $('nav').outerHeight() + 'px;"></div>');
			}
			// Check to see if the browser has been resized since the first init.
			// If it has, content will have moved the nav's original location.
			if ($('.spaceTaker').offset().top !== distances.navOffset.top) {
				distances.navOffset.top = $('.spaceTaker').offset().top; // Reset distances
			}
		};

		// public
		return {
			init: init
		};
	})(); // var stickyNav = (function() {



	/* 
		User interaction 

		Various functions which are called when the user intearcts
		with a piece of the site (eg. clicking, scrolling, etc)
	*/
	var userInput = (function() {

		var example = function() { // Matches the height of various elements to other elements in ways that are impossible with CSS alone
			
		};

		// public
		return {
			example: example
		};

	})(); // var uiMod = (function() {

	

	// public
	return {
		utility: utility,
		stickyNav: stickyNav,
		uiMod: uiMod,
		userInput: userInput
	};
})(jQuery); // var cs = (function() {