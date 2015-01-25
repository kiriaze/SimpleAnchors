// Defaults
// @codekit-prepend 'vendor/jquery-2.0.3.min.js'
// @codekit-prepend 'vendor/jquery.easing.min.js'
// @codekit-prepend 'vendor/modernizr-2.8.3.min.js'

// @codekit-prepend '../../bower_components/fastclick/lib/fastclick.js'
// @codekit-prepend '../../bower_components/retinajs/dist/retina.min.js'
// @codekit-prepend '../../bower_components/jquery.lazyload/jquery.lazyload.min.js'

// @codekit-prepend 'plugins/simpleAnchors.js'
// @codekit-prepend 'plugins/jquery.validate.min.js'
// @codekit-prepend 'plugins/simpleForms.js'

// @codekit-prepend '../../bower_components/google-code-prettify/src/prettify.js'
// @codekit-prepend '../../bower_components/matchHeight/jquery.matchHeight-min.js'
// @codekit-prepend '../../bower_components/magnific-popup/dist/jquery.magnific-popup.min.js'
// @codekit-prepend '../../bower_components/mediaelement/build/mediaelement-and-player.min.js'

// @codekit-prepend 'plugins/simpleMedia.js'

(function($){

	/* jshint devel:true */
	'use strict';

	window.THEMENAME = {};

	var SHORTNAME = window.THEMENAME;

	var $window = $(window);

	SHORTNAME.init = function(){

		SHORTNAME.setElements();
		SHORTNAME.colors();
		SHORTNAME.basics();
		SHORTNAME.forms();
		SHORTNAME.vertAlign();

		SHORTNAME.widowFix();
		SHORTNAME.mediaElements();
		SHORTNAME.magnificPopup();

	};

	SHORTNAME.setElements = function(){
		SHORTNAME.elems				= {};

		// defaults
		SHORTNAME.elems.html				=	$('html');
		SHORTNAME.elems.body				=	$('body');
		SHORTNAME.elems.valign				=	$('.valign');
		SHORTNAME.elems.commentform			=	$('#commentform');
		SHORTNAME.elems.contactForm			=	$('#contactForm');
		SHORTNAME.elems.scrollToTop			=	$('a[data-scroll-to="top"]');
		SHORTNAME.elems.lazyImg				=	$('img.lazy');

		SHORTNAME.elems.mediaElements      =   $('[data-media-src]');

		SHORTNAME.elems.mfpImage           =   $('[data-type="mfp-image"]');
		SHORTNAME.elems.mfpInline          =   $('[data-type="mfp-inline"]');
		SHORTNAME.elems.mfpIframe          =   $('[data-type="mfp-iframe"]');

	};

	SHORTNAME.colors = function() {
		var colors = {
			aqua    : '#7FDBFF',
			blue    : '#0074D9',
			lime    : '#01FF70',
			navy    : '#001F3F',
			teal    : '#39CCCC',
			olive   : '#3D9970',
			green   : '#2ECC40',
			red     : '#FF4136',
			maroon  : '#85144B',
			orange  : '#FF851B',
			purple  : '#B10DC9',
			yellow  : '#FFDC00',
			fuchsia : '#F012BE',
			gray    : '#aaa',
			white   : '#fff',
			black   : '#111',
			silver  : '#ddd'
		};
		// console.log(colors);
		// console.log(colors.blue);
	};

	SHORTNAME.basics = function() {

		if( window.back_to_top ) {
			$window.scroll(function(){
				if ( $(this).scrollTop() > 300 ) {
					SHORTNAME.elems.scrollToTop.addClass('fadeIn');
				} else {
					SHORTNAME.elems.scrollToTop.removeClass('fadeIn');
				}
			});
		}

		// jQuery Lazyload
		SHORTNAME.elems.lazyImg.lazyload({
			threshold   : 200,
			effect      : 'fadeIn',
		});
		// usage: <img class="lazy" data-original="" src="gray.png" alt="" />

		// Fastclick.js - Polyfill to remove click delays on browsers with touch UIs
		$(function() {
			window.FastClick.attach(document.body);
		});

		// SimpleAnchors
		$.simpleAnchors({
			offset: -1, // 80-1, header height on scroll
			easing: 'easeInOutCubic'
		});

		// simpleforms - styles/effects for forms, checkboxes, radio's
		$('body').simpleforms();

		// prettyprint
		$('pre').addClass('prettyprint');
		prettyPrint();

		// simpleMedia init
		SHORTNAME.elems.mediaElements.simpleMedia();

	};

	SHORTNAME.mediaElements = function(){

		if( !SHORTNAME.elems.mediaElements.length ) return;

		SHORTNAME.elems.mediaElements.each(function(){
			$(this).mediaelementplayer({
				// if the <video width> is not specified, this is the default
				defaultVideoWidth: 480,
				// if the <video height> is not specified, this is the default
				defaultVideoHeight: 270,
				// if set, overrides <video width>
				videoWidth: -1,
				// if set, overrides <video height>
				videoHeight: -1,
				// width of audio player
				audioWidth: 400,
				// height of audio player
				audioHeight: 50,
				// initial volume when the player starts
				startVolume: 0.8,
				// // path to Flash and Silverlight plugins
				// pluginPath: theme_objects.base + '/_include/js/mediaelement/',
				// // name of flash file
				// flashName: 'flashmediaelement.swf',
				// // name of silverlight file
				// silverlightName: 'silverlightmediaelement.xap',
				// useful for <audio> player loops
				loop: false,
				// enables Flash and Silverlight to resize to content size
				enableAutosize: true,
				// the order of controls you want on the control bar (and other plugins below)
				// Hide controls when playing and mouse is not over the video
				alwaysShowControls: false,
				// force iPad's native controls
				iPadUseNativeControls: false,
				// force iPhone's native controls
				iPhoneUseNativeControls: false,
				// force Android's native controls
				AndroidUseNativeControls: false,
				// forces the hour marker (##:00:00)
				alwaysShowHours: false,
				// show framecount in timecode (##:00:00:00)
				showTimecodeFrameCount: false,
				// used when showTimecodeFrameCount is set to true
				framesPerSecond: 25,
				// turns keyboard support on and off for this instance
				enableKeyboard: true,
				// when this player starts, it will pause other players
				pauseOtherPlayers: true,
				// array of keyboard commands
				keyActions: [],
				// autosizeProgress: false
			});
		});
	};

	SHORTNAME.magnificPopup = function(){

		if( !SHORTNAME.elems.mfpInline.length && !SHORTNAME.elems.mfpImage.length && !SHORTNAME.elems.mfpIframe.length ) return;

		// Inline popups
		SHORTNAME.elems.mfpInline.magnificPopup({
			removalDelay: 500, //delay removal by X to allow out-animation
			callbacks: {
				beforeOpen: function() {
					this.st.mainClass = this.st.el.attr('data-effect');
				}
			},
			midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
		});

		// Image popups
		SHORTNAME.elems.mfpImage.magnificPopup({
			type: 'image',
			removalDelay: 500, //delay removal by X to allow out-animation
			preloader: true,
			callbacks: {
				beforeOpen: function() {
					// just a hack that adds mfp-anim class to markup
					this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
					// this.st.mainClass = this.st.el.attr('data-effect');
					this.st.mainClass = this.st.el.attr('data-effect').length ? this.st.el.attr('data-effect') : 'mfp-fade-in-up';
				}
			},
			// closeOnContentClick: true,
			midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
		});

		// Image popups
		SHORTNAME.elems.mfpIframe.magnificPopup({
			delegate: 'a', //if elem is nested
			type: 'iframe',
			removalDelay: 500,
			preloader: true,
			callbacks: {
				beforeOpen: function() {
					// just a hack that adds mfp-anim class to markup
					this.st.iframe.markup = this.st.iframe.markup.replace('mfp-iframe-scaler', 'mfp-iframe-scaler mfp-with-anim');
					this.st.mainClass = this.st.el.attr('data-effect').length ? this.st.el.attr('data-effect') : 'mfp-fade-in-up';
				}
			},
			midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
		});


	};

	SHORTNAME.widowFix = function() {

		// takes care of widows - hehe
		$('h1, h2, h4, h5, h6, .post-content').each(function(){
			var string = $(this).html();
			string     = string.replace(/ ([^ ]*)$/,'&nbsp;$1');
			$(this).html(string);
		});

	};

	SHORTNAME.forms = function(){

		// honeypot antispam
		SHORTNAME.elems.contactForm.submit(function(){
			// need redic name so spambots wont pick up on it
			if ( $('#imSoAwesome').val().length != 0 ) {
				return false;
			}
		});

		// prevent form submission when Enter is pressed within input field
		$(window).keydown(function(event){
			if(event.keyCode == 13) {
				event.preventDefault();
				return false;
			}
		});

		// debugging validator, prevents form submit
		// $.validator.setDefaults({
		// 	debug: true,
		// 	success: "valid"
		// });

		// Form Validation
		if ( $().validate ) {
			SHORTNAME.elems.contactForm.validate();
			SHORTNAME.elems.contactForm.removeAttr('novalidate');
		}

	};

	SHORTNAME.vertAlign = function() {
		// Vertical Align
		var vertAlign = function() {
			SHORTNAME.elems.valign.each(function() {
				var newHeight = $(this).parent().height();
				$(this).parent().height(newHeight);
			});
		};
		vertAlign();
	};

	SHORTNAME.icons = function() {

		// quick fix for icons
		// (needs work - current this finds anything that contains these letters within classes)
		$('body').find('[class*=ion-]').filter(function() {
			return this.className.match(/\bion-/);
		}).addClass('ion');

		$('body').find('[class*=fa-]').filter(function() {
			return this.className.match(/\bfa-/);
		}).addClass('fa');

		$('body').find('[class*=fi-]').filter(function() {
			return this.className.match(/\bfi-/);
		}).addClass('fi');

		// fund ul's with 'list-style-' class, and apply icons to that list
		$('ul[class*=list-style-]').filter(function(){
			var classes = $(this).attr('class').split(" "),
				temp = this.className.match(/\blist-style-/);

			//console.log(classes);
			//console.log(listStyle);
			//console.log(temp);

			for ( var i = 0; i < classes.length; i++ ) {

				if ( classes[i].match(/\blist-style-/) ) {
					var listStyle = classes[i].replace('list-style-','');
					// console.log(listStyle);
				}
			}

			$.each( $(this).find('li'), function(index, val) {
				$(this).prepend('<i class="'+ listStyle +'" />');
			});

		});

	};

	$window.load(function() {

		SHORTNAME.icons();

	});

	$window.resize(function(event) {

		SHORTNAME.vertAlign();

	});

	$(document).ready(function(){

		SHORTNAME.init();

	});

})(window.jQuery);
