// Smooth anchor scrolling 

$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
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


// Jribbble

$.jribbble.getShotsByPlayerId('brianmaierjr', function (playerShots) {
    var html = [];

    $.each(playerShots.shots, function (i, shot) {
        html.push('<li><div class="overlay"><h3>' + shot.title + '</h3>');
        html.push('<p> ' + shot.likes_count + '</p></div>');
        html.push('<img src="' + shot.image_teaser_url + '" ');
        html.push('alt="' + shot.title + '"></a></li>');
    });

    $('#portfolio').html(html.join(''));
}, {page: 1, per_page: 10});

//Fittext

jQuery("#fittext").fitText(1.2, { minFontSize: '36px', maxFontSize: '200px' });


// Headroom.js

$(".header").headroom({
  "tolerance": 0,
  "offset": 200,
  "classes": {
    "initial": "slideInDown",
    "pinned": "slideDown",
    "unpinned": "slideUp"
  }
});
