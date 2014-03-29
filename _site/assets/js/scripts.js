// Jribbble

$.jribbble.getShotsByPlayerId('brianmaierjr', function (playerShots) {
    var html = [];

    $.each(playerShots.shots, function (i, shot) {
        html.push('<li><div class="overlay"><div class="overlayText"><h3><a href="' + shot.url + '" target="_blank"> ' + shot.title + '</a></h3>');
        html.push('<p><span class="icon-heart"></span> ' + shot.likes_count + ' <span class="icon-eye"></span> ' + shot.views_count + '</p></div></div>');
        html.push('<img src="' + shot.image_url + '" ');
        html.push('alt="' + shot.title + '"></a></li>');
    });

    $('#portfolio').html(html.join(''));
}, {page: 1, per_page: 9});


// Fittext 

jQuery("#fittext").fitText(.75, { minFontSize: '68px' });
jQuery(".post-title").fitText(1, { minFontSize: '36px', maxFontSize: '200px' });


// Smooth Scrolling via csstricks.com
 
$(function() {
  $('.home .animated.bounce').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false; 
      }
    }
  });
});


// Waypoints

jQuery(function($) {
 
  $('#craftsman').waypoint(function() {
    $('#craftsman .intro, #craftsman .aboutText').addClass( 'animated fadeInUp' );
  },
  {
    offset: '60%',
    triggerOnce: true
  });

  $('#dribbble').waypoint(function() {
    $('#dribbble h2, #dribbble #portfolio').addClass( 'animated fadeInUp' );
  },
  {
    offset: '60%',
    triggerOnce: true
  });
 
});

// Headroom.js

$(".header").headroom({
  "tolerance": 0,
  "offset": 0,
  "classes": {
    "initial": "animated",
    "pinned": "slideDown",
    "unpinned": "slideUp",
    "top": "headroom--top",
    "notTop": "headroom--not-top"
  }
});



// Stellar.js

$('.featured-image').stellar();
