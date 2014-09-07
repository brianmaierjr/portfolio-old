8// Jribbble

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


// Make entire div clickable on homepage dribbble feed via csstricks.com

$("#portfolio li").click(function(){
     window.location=$(this).find("a").attr("href"); 
     return false; 
});


// Waypoints

jQuery(function($) {
 
  $('#craftsman .aboutText').waypoint(function() {
    $(this).toggleClass( 'animated fadeInUp' ); 
  }, 
  {
    offset: '85%', 
    triggerOnce: true
  });

  $('#craftsman .intro').waypoint(function() {
    $(this).toggleClass( 'animated fadeInUp' );  
  },
  {
    offset: '85%',  
    triggerOnce: true   
  });

  $('#dribbble').waypoint(function() {
    $('#dribbble h2, #dribbble #portfolio').toggleClass( 'animated fadeInUp' );
  },
  {
    offset: '85%',
    triggerOnce: true
  });

  $('.introText').waypoint(function() {
    $('.introText h1').toggleClass( 'fadeIn' ).toggleClass( 'fadeOut' );
    $('.introText h2').toggleClass( 'slideInLeft' ).toggleClass( 'fadeOut' );
  },
  {
    offset: '-10%',
    triggerOnce: false
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


// Disable Scrolling when Main Menu is shown

$('#menuBtn').click(function(e) { 
  $('body').addClass('noScroll');
});

$('#mainNav .closeBtn').click(function(e) { 
  $('body').removeClass('noScroll');
});





