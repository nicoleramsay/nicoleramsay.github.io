/*
 * Lulu Parallax v1.0
 *
 * Copyright 2016 Carlos Ruiz / carlosruiz.me
 *
 */

function luluParallax() {
  // Setup
  var viewportHeight = $(window).height();
  $('.parallax-container').each(function() {
	var groupHeight = $(this).parent('.parallax-group').height();
	// Make adjustments if a FOREGROUND container is taller than its GROUP container
	if ($(this).hasClass('foreground') && (groupHeight < $(this).outerHeight())) {
	  var groupHeight = $(this).outerHeight();
	  $(this).parent('.parallax-group').css('height', groupHeight);
	  $(this).parent('.parallax-group').find('.background').css('min-height', groupHeight);
	}
	var groupTopFixed = Math.round($(this).parent('.parallax-group').offset().top);
	var containerHeight = $(this).outerHeight();
	// Store values
	$(this).data('lp', {
		gh: groupHeight,
		gtf: groupTopFixed,
		ch: containerHeight
	});
  });
  // Action  
  $(window).scroll(function() {
	var scrollPosition = $(window).scrollTop();
	$('.parallax-container').each(function() {
	  var groupTopRelative = Math.round($(this).data('lp').gtf - scrollPosition);
	  var fgPosition = Math.min(
		($(this).data('lp').gh - $(this).data('lp').ch),
		(-(groupTopRelative - Math.min(viewportHeight, $(this).data('lp').gtf)) * $(this).data('rate'))
	  );
	  var bgPosition = Math.max(
		($(this).data('lp').gh - $(this).data('lp').ch),
		((groupTopRelative - Math.min(viewportHeight, $(this).data('lp').gtf)) * $(this).data('rate'))
	  );
	  // Make sure that the GROUP container is in the VIEWPORT
	  if (groupTopRelative <= viewportHeight) {
		if ($(this).hasClass('against') && $(this).hasClass('foreground')) {
		  $(this).css(
			'bottom',
			fgPosition
		  );
		} else if ($(this).hasClass('with') && $(this).hasClass('foreground')) {
		  $(this).css(
			'top',
			fgPosition
		  );
		} else if ($(this).hasClass('against') && $(this).hasClass('background')) {
		  $(this).css(
			'top',
			bgPosition
		  );
		} else if ($(this).hasClass('with') && $(this).hasClass('background')) {
		  $(this).css(
			'bottom',
			bgPosition
		  );
		}
	  }
	});
  });  
}