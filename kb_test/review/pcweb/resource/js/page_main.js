/* v0.1 | 2021-03-04 */


/*
	대분류
*/
/* 소분류 */



/*
	ready, load
*/
$(document).ready(function(){
});


$(window).on('load',function(){
	mainBanner() // 스와이퍼
});


var mainSwiper;

function mainBanner(){
	mainSwiper = new Swiper('.main-swiper',{
		speed: 800,
		loop: true,		
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		effect: 'fade',
		// fadeEffect: { crossFade: true },
		// navigation: {
		// 	nextEl: '.swiper-button-next.main',
		// 	prevEl: '.swiper-button-prev.main',
		// },
		// pagination: {
		// 	el: ".swiper-pagination.main",
		// 	type: "bullets",
		// },
		pagination: {
            el: '.main-swiper .swiper-pagination'
        },
		on: {
			autoplayStop: function(){
                $('.main-swiper .swiper-controller .swiper-player .se-btn').addClass('on');
            },
            autoplayStart: function(){
                $('.main-swiper .swiper-controller .swiper-player .se-btn').removeClass('on')
            },
			slideChange: function(){	
				var $slide = $('.main-swiper .swiper-wrapper .swiper-slide');

				$slide.find('.contain').removeClass('on')
				$slide.eq(this.activeIndex).find('.contain').addClass('on')
				
			},
		}
		
	})
}

// 메인 스와이퍼 컨트롤러
$(document).on('click', '.main-swiper .swiper-controller .swiper-player .se-btn', function(){
    if ( $(this).hasClass('on') ){
        $(this).removeClass('on');
        mainSwiper.autoplay.start();
    } else {
        $(this).addClass('on');
        mainSwiper.autoplay.stop();
    }
})


/*
	banner layout #배너레이아웃
*/
/* function */
var bannerLayout = (function(){
	var method = {
		init : function(){			
			var $main = $('.layout-main');
			var $logo = $('.header .logo');
			var $bannerLogo = $('.layout-banner').find('.banner-logo');			

			setTimeout(function(){
				if ( !$main.hasClass('on') ){
					$logo.css('opacity','0');
					$bannerLogo.css('opacity','1');
					$main.addClass('on');
					$main.addClass('after-on');
					$main.addClass('during-on');
					mainSwiper.autoplay.start();
				}
				
			},1400)
			// setTimeout(function(){
			// 	if ( !$main.hasClass('on') ){
					
			// 	}					
			// },1600)
			

		},
		toggle : function(){
			var $main = $('.layout-main');

			if ( $main.hasClass('on') ){
				$main.removeClass('on');					
				$main.removeClass('during-on');	
				$main.removeClass('after-on');
					
				mainSwiper.autoplay.stop();	
				
				$('.floating-menu').css('opacity','0')
				setTimeout(function(){
					$('.floating-menu').animate({
						'opacity':'1'
					},200)
				},300)
				
			}else {					
				$main.addClass('on');
				$main.addClass('after-on');	
				setTimeout(function(){
					$main.addClass('during-on');
					
				},200)				
				mainSwiper.autoplay.start();		
			}
		},
		logoShow : function(){
			var $main = $('.layout-main');
			var $logo = $('.header .logo');
			var $bannerLogo = $('.layout-banner').find('.banner-logo');

			if ( $main.hasClass('on') ){
				$logo.css('opacity','0')
				$bannerLogo.css('opacity','1');
			}else {
				$logo.css('opacity','1')
				$bannerLogo.css('opacity','0');
			}
		}				
	}
	return method;
})();


/* event */
$(document).on('click', '.btn-banner-toggle', function(){
	bannerLayout.toggle();
	bannerLayout.logoShow();
})


/*
	배너 fixed scroll
*/

$(window).on('scroll',function(){
	var $layoutBanner = $('.layout-main .layout-banner');

	if ( $(window).scrollLeft() > 0 ){
		$layoutBanner.css('margin-left',-$(window).scrollLeft())
	}
})


