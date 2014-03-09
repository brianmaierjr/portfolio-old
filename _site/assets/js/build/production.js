
/*global jQuery */
/*!
* FitText.js 1.1
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );


(function(e){"use strict";e.jribbble={};var t=function(t,s){e.ajax({type:"GET",url:"http://api.dribbble.com"+t,data:s[1]||{},dataType:"jsonp",success:function(e){e===undefined?s[0]({error:!0}):s[0](e)}})},s={getShotById:"/shots/$/",getReboundsOfShot:"/shots/$/rebounds/",getShotsByList:"/shots/$/",getShotsByPlayerId:"/players/$/shots/",getShotsThatPlayerFollows:"/players/$/shots/following/",getPlayerById:"/players/$/",getPlayerFollowers:"/players/$/followers/",getPlayerFollowing:"/players/$/following/",getPlayerDraftees:"/players/$/draftees/",getCommentsOfShot:"/shots/$/comments/",getShotsThatPlayerLikes:"/players/$/shots/likes/"},o=function(e){return function(){var s=[].slice.call(arguments),o=e.replace("$",s.shift());t(o,s)}};for(var r in s)e.jribbble[r]=o(s[r])})(jQuery,window,document);
/*! SocialCount - v0.1.6 - 2013-08-08
* https://github.com/filamentgroup/SocialCount
* Copyright (c) 2013 zachleat; Licensed MIT */

;(function( win, doc, $ ) {

	var $loadingIndicator,
		$count;

	function featureTest( prop, unprefixedProp ) {
		var style = doc.createElement('social').style,
			prefixes = 'webkit Moz o ms'.split(' ');

		if( unprefixedProp in style ) {
			return true;
		}
		for( var j = 0, k = prefixes.length; j < k; j++ ) {
			if( ( prefixes[ j ] + prop ) in style ) {
				return true;
			}
		}
		return false;
	}

	function removeFileName( src ) {
		var split = src.split( '/' );
		split.pop();
		return split.join( '/' ) + '/';
	}

	function resolveServiceDir() {
		var baseUrl;

		$( 'script' ).each(function() {
			var src = this.src || '',
				dir;
			if( src.match( SocialCount.scriptSrcRegex ) ) {
				baseUrl = removeFileName( src );
				return false;
			}
		});

		return baseUrl;
	}

	var SocialCount = {
		// For A-grade experience, require querySelector (IE8+) and not BlackBerry or touchscreen
		isGradeA: 'querySelectorAll' in doc && !win.blackberry && !('ontouchstart' in window) &&
			// Note that this feature test does not account for the Windows Phone version that includes IE9
			// IE 10 desktop (non-touch) returns 0 for msMaxTouchPoints
			( typeof window.navigator.msMaxTouchPoints === 'undefined' || window.navigator.msMaxTouchPoints === 0 ),
		minCount: 1,
		serviceUrl: 'service/index.php',
		initSelector: '.socialcount',
		classes: {
			js: 'js',
			gradeA: 'grade-a',
			active: 'active',
			touch: 'touch',
			hover: 'hover',
			noTransforms: 'no-transforms',
			showCounts: 'counts',
			countContent: 'count',
			minCount: 'minimum',
			activateOnHover: 'activate-on-hover',
			activateOnClick: 'activate-on-click'
		},
		thousandCharacter: 'K',
		millionCharacter: 'M',
		missingResultText: '-',
		activateOnClick: false, // default is hover
		selectors: {
			facebook: '.facebook',
			twitter: '.twitter',
			googleplus: '.googleplus'
		},
		locale: (function() {
			var locale = doc.documentElement ? ( doc.documentElement.lang || '' ) : '';
			locale = locale.replace(/\-/, '_');
			return locale.match(/\w{2}_\w{2}/) ? locale : '';
		})(),
		googleplusTooltip: 'table.gc-bubbleDefault',
		scriptSrcRegex: /socialcount[\w.]*.js/i,
		plugins: {
			init: [],
			bind: []
		},

		// private, but for testing
		cache: {},

		removeFileName: removeFileName,
		resolveServiceDir: resolveServiceDir,

		isCssAnimations: function() {
			return featureTest( 'AnimationName', 'animationName' );
		},
		isCssTransforms: function() {
			return featureTest( 'Transform', 'transform' );
		},
		getUrl: function( $el ) {
			return $el.attr('data-url') || location.href;
		},
		// Currently only available on Twitter
		getShareText: function( $el ) {
			return $el.attr('data-share-text' ) || '';
		},
		getFacebookAction: function( $el ) {
			return ( $el.attr('data-facebook-action' ) || 'like' ).toLowerCase();
		},
		isCountsEnabled: function( $el ) {
			return $el.attr('data-counts') === 'true';
		},
		isSmallSize: function( $el ) {
			return $el.is( '.socialcount-small' );
		},
		getCounts: function( $el, url ) {
			var map = SocialCount.selectors,
				cache = SocialCount.cache,
				counts = {},
				$networkNode,
				$countNode,
				j;

			for( j in map ) {
				$networkNode = $el.find( map[ j ] );
				$countNode = $networkNode.find( '.' + SocialCount.classes.countContent );

				if( $countNode.length ) {
					counts[ j ] = $countNode;
				} else {
					counts[ j ] = $count.clone();
					$networkNode.append( counts[ j ] );
				}
			}

			if( !cache[ url ] ) {
				cache[ url ] = $.ajax({
					url: resolveServiceDir() + SocialCount.serviceUrl,
					data: {
						url: url
					},
					dataType: 'json'
				});
			}

			cache[ url ].done( function complete( data ) {
				for( var j in data ) {
					if( data.hasOwnProperty( j ) ) {
						if( counts[ j ] && data[ j ] > SocialCount.minCount ) {
							counts[ j ].addClass( SocialCount.classes.minCount )
								.html( SocialCount.normalizeCount( data[ j ] ) );
						}
					}
				}
			});

			return cache[ url ];
		},
		init: function( $el ) {
			var facebookAction = SocialCount.getFacebookAction( $el ),
				classes = [ facebookAction ],
				isSmall = SocialCount.isSmallSize( $el ),
				url = SocialCount.getUrl( $el ),
				initPlugins = SocialCount.plugins.init,
				countsEnabled = SocialCount.isCountsEnabled( $el );

			classes.push( SocialCount.classes.js );

			if( SocialCount.isGradeA ) {
				classes.push( SocialCount.classes.gradeA );
			}
			if( !SocialCount.isCssTransforms() ) {
				classes.push( SocialCount.classes.noTransforms );
			}
			if( countsEnabled ) {
				classes.push( SocialCount.classes.showCounts );
			}
			if( SocialCount.activateOnClick ) {
				classes.push( SocialCount.classes.activateOnClick );
			} else {
				classes.push( SocialCount.classes.activateOnHover );
			}
			if( SocialCount.locale ) {
				classes.push( SocialCount.locale );
			}
			$el.addClass( classes.join(' ') );

			for( var j = 0, k = initPlugins.length; j < k; j++ ) {
				initPlugins[ j ].call( $el );
			}

			if( SocialCount.isGradeA ) {
				SocialCount.bindEvents( $el, url, facebookAction, isSmall );
			}

			if( countsEnabled && !isSmall ) {
				SocialCount.getCounts( $el, url );
			}
		},
		normalizeCount: function( count ) {
			if( !count && count !== 0 ) {
				return SocialCount.missingResultText;
			}
			// > 1M
			if( count >= 1000000 ) {
				return Math.floor( count / 1000000 ) + SocialCount.millionCharacter;
			}
			// > 100K
			if( count >= 100000 ) {
				return Math.floor( count / 1000 ) + SocialCount.thousandCharacter;
			}
			if( count > 1000 ) {
				return ( count / 1000 ).toFixed( 1 ).replace( /\.0/, '' ) + SocialCount.thousandCharacter;
			}
			return count;
		},
		bindEvents: function( $el, url, facebookAction, isSmall ) {
			function bind( $a, html, jsUrl ) {
				// IE bug (tested up to version 9) with :hover rules and iframes.
				var isTooltipActive = false,
					isHoverActive = false;

				$a.closest( 'li' ).bind( 'mouseenter', function( event ) {
					var $li = $( this ).closest( 'li' );

					$li.addClass( SocialCount.classes.hover );

					isHoverActive = true;

					$( document ).on( 'mouseenter.socialcount mouseleave.socialcount', SocialCount.googleplusTooltip, function( event ) {
						isTooltipActive = event.type === 'mouseenter';

						if( !isTooltipActive && !isHoverActive ) {
							$li.removeClass( SocialCount.classes.hover );
						}
					});
				}).bind( 'mouseleave', function( event ) {
					var self = this;
					window.setTimeout(function() {
						isHoverActive = false;

						if( !isTooltipActive && !isHoverActive ) {
							$( document ).off( '.socialcount' );
							$( self ).closest( 'li' ).removeClass( SocialCount.classes.hover );
						}
					}, 0);
				});

				$a.one( SocialCount.activateOnClick ? 'click' : 'mouseover', function( event ) {
					if( SocialCount.activateOnClick ) {
						event.preventDefault();
						event.stopPropagation();
					}

					var $self = $( this ),
						$parent = $self.closest( 'li' ),
						$loading = $loadingIndicator.clone(),
						$content = $( html ),
						$button = $( '<div class="button"/>' ).append( $content ),
						js,
						$iframe,
						deferred = $.Deferred();

					deferred.promise().always(function() {
						// Remove Loader
						var $iframe = $parent.find('iframe');

						if( $iframe.length ) {
							$iframe.bind( 'load', function() {
								$loading.remove();
							});
						} else {
							$loading.remove();
						}
					});

					$parent
						.addClass( SocialCount.classes.active )
						.append( $loading )
						.append( $button );

					if( jsUrl ) {
						js = doc.createElement( 'script' );
						js.src = jsUrl;

						// IE8 doesn't do script onload.
						if( js.attachEvent ) {
							js.attachEvent( 'onreadystatechange', function() {
								if( js.readyState === 'loaded' || js.readyState === 'complete' ) {
									deferred.resolve();
								}
							});
						} else {
							$( js ).bind( 'load', deferred.resolve );
						}

						doc.body.appendChild( js );
					} else if( $content.is( 'iframe' ) ) {
						deferred.resolve();
					}
				});
			} // end bind()

			if( !isSmall ) {
				var shareText = SocialCount.getShareText( $el );

				bind( $el.find( SocialCount.selectors.facebook + ' a' ),
					'<iframe src="//www.facebook.com/plugins/like.php?href=' + encodeURIComponent( url ) +
						( SocialCount.locale ? '&locale=' + SocialCount.locale : '' ) +
						'&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=true&amp;action=' + facebookAction +
						'&amp;colorscheme=light&amp;font=arial&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden;" allowTransparency="true"></iframe>' );

				bind( $el.find( SocialCount.selectors.twitter + ' a' ),
					'<a href="https://twitter.com/share" class="twitter-share-button"' +
						' data-url="' + encodeURIComponent( url ) + '"' +
						( shareText ? ' data-text="' + shareText + '"': '' ) +
						' data-count="none" data-dnt="true">Tweet</a>',
					'//platform.twitter.com/widgets.js' );

				bind( $el.find( SocialCount.selectors.googleplus + ' a' ),
					'<div class="g-plusone" data-size="medium" data-annotation="none"></div>',
					'//apis.google.com/js/plusone.js' );
			}

			// Bind events on other non-stock widgets, like sharethis
			var bindPlugins = SocialCount.plugins.bind;
			for( var j = 0, k = bindPlugins.length; j < k; j++ ) {
				bindPlugins[ j ].call( $el, bind, url, isSmall );
			}
		} // end bindEvents()
	};

	$(function() {
		// Thanks to http://codepen.io/ericmatthys/pen/FfcEL
		$loadingIndicator = $('<div>')
			.addClass('loading')
			.html( SocialCount.isCssAnimations() ? new Array(4).join('<div class="dot"></div>') : 'Loading' );

		$count = $('<span>')
			.addClass( SocialCount.classes.countContent )
			.html('&#160;');

		$( SocialCount.initSelector ).each(function() {
			var $el = $(this);
			SocialCount.init($el);
		});
	});

	window.SocialCount = SocialCount;

}( window, window.document, jQuery ));



// Generated by CoffeeScript 1.6.2
/*
jQuery Waypoints - v2.0.4
Copyright (c) 2011-2014 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},e=[].slice;(function(t,e){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(n){return e(n,t)})}else{return e(t.jQuery,t)}})(this,function(n,r){var i,o,l,s,f,u,c,a,h,d,p,y,v,w,g,m;i=n(r);a=t.call(r,"ontouchstart")>=0;s={horizontal:{},vertical:{}};f=1;c={};u="waypoints-context-id";p="resize.waypoints";y="scroll.waypoints";v=1;w="waypoints-waypoint-ids";g="waypoint";m="waypoints";o=function(){function t(t){var e=this;this.$element=t;this.element=t[0];this.didResize=false;this.didScroll=false;this.id="context"+f++;this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()};this.waypoints={horizontal:{},vertical:{}};this.element[u]=this.id;c[this.id]=this;t.bind(y,function(){var t;if(!(e.didScroll||a)){e.didScroll=true;t=function(){e.doScroll();return e.didScroll=false};return r.setTimeout(t,n[m].settings.scrollThrottle)}});t.bind(p,function(){var t;if(!e.didResize){e.didResize=true;t=function(){n[m]("refresh");return e.didResize=false};return r.setTimeout(t,n[m].settings.resizeThrottle)}})}t.prototype.doScroll=function(){var t,e=this;t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(a&&(!t.vertical.oldScroll||!t.vertical.newScroll)){n[m]("refresh")}n.each(t,function(t,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;n.each(e.waypoints[t],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return n.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}};t.prototype.refresh=function(){var t,e,r,i=this;r=n.isWindow(this.element);e=this.$element.offset();this.doScroll();t={horizontal:{contextOffset:r?0:e.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:e.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[m]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return n.each(t,function(t,e){return n.each(i.waypoints[t],function(t,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp];if(n.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(e.contextDimension*i/100)}}r.offset=o-e.contextOffset+e.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=e.oldScroll)&&s<=r.offset){return r.trigger([e.backward])}else if(l!==null&&l>(f=e.oldScroll)&&f>=r.offset){return r.trigger([e.forward])}else if(l===null&&e.oldScroll>=r.offset){return r.trigger([e.forward])}})})};t.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([p,y].join(" "));return delete c[this.id]}};return t}();l=function(){function t(t,e,r){var i,o;r=n.extend({},n.fn[g].defaults,r);if(r.offset==="bottom-in-view"){r.offset=function(){var t;t=n[m]("viewportHeight");if(!n.isWindow(e.element)){t=e.$element.height()}return t-n(this).outerHeight()}}this.$element=t;this.element=t[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=e;this.enabled=r.enabled;this.id="waypoints"+v++;this.offset=null;this.options=r;e.waypoints[this.axis][this.id]=this;s[this.axis][this.id]=this;i=(o=this.element[w])!=null?o:[];i.push(this.id);this.element[w]=i}t.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};t.prototype.disable=function(){return this.enabled=false};t.prototype.enable=function(){this.context.refresh();return this.enabled=true};t.prototype.destroy=function(){delete s[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};t.getWaypointsByElement=function(t){var e,r;r=t[w];if(!r){return[]}e=n.extend({},s.horizontal,s.vertical);return n.map(r,function(t){return e[t]})};return t}();d={init:function(t,e){var r;if(e==null){e={}}if((r=e.handler)==null){e.handler=t}this.each(function(){var t,r,i,s;t=n(this);i=(s=e.context)!=null?s:n.fn[g].defaults.context;if(!n.isWindow(i)){i=t.closest(i)}i=n(i);r=c[i[0][u]];if(!r){r=new o(i)}return new l(t,r,e)});n[m]("refresh");return this},disable:function(){return d._invoke.call(this,"disable")},enable:function(){return d._invoke.call(this,"enable")},destroy:function(){return d._invoke.call(this,"destroy")},prev:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(t,e,i){var o,l;if(t==null){t="vertical"}if(e==null){e=r}l=h.aggregate(e);o=[];this.each(function(){var e;e=n.inArray(this,l[t]);return i(o,e,l[t])});return this.pushStack(o)},_invoke:function(t){this.each(function(){var e;e=l.getWaypointsByElement(this);return n.each(e,function(e,n){n[t]();return true})});return this}};n.fn[g]=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(d[r]){return d[r].apply(this,t)}else if(n.isFunction(r)){return d.init.apply(this,arguments)}else if(n.isPlainObject(r)){return d.init.apply(this,[null,r])}else if(!r){return n.error("jQuery Waypoints needs a callback function or handler option.")}else{return n.error("The "+r+" method does not exist in jQuery Waypoints.")}};n.fn[g].defaults={context:r,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};h={refresh:function(){return n.each(c,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=r.innerHeight)!=null?t:i.height()},aggregate:function(t){var e,r,i;e=s;if(t){e=(i=c[n(t)[0][u]])!=null?i.waypoints:void 0}if(!e){return[]}r={horizontal:[],vertical:[]};n.each(r,function(t,i){n.each(e[t],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[t]=n.map(i,function(t){return t.element});return r[t]=n.unique(r[t])});return r},above:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(t,e){return d[t]=e},_invoke:function(t){var e;e=n.extend({},s.vertical,s.horizontal);return n.each(e,function(e,n){n[t]();return true})},_filter:function(t,e,r){var i,o;i=c[n(t)[0][u]];if(!i){return[]}o=[];n.each(i.waypoints[e],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return n.map(o,function(t){return t.element})}};n[m]=function(){var t,n;n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(h[n]){return h[n].apply(null,t)}else{return h.aggregate.call(null,n)}};n[m].settings={resizeThrottle:100,scrollThrottle:30};return i.load(function(){return n[m]("refresh")})})}).call(this);
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

jQuery("#fittext, .post-title").fitText(1.2, { minFontSize: '36px', maxFontSize: '200px' });


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