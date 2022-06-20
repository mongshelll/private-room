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
	swiper();
	loadInit();
});

function loadInit(){
	prodSwiperLayout();
}


/*
	skip-navi #스킵네비
*/
$(document).on('focus', '.skip-navi a', function(){
	$(this).css({
		'opacity': '1',
		'top': '0',
	})
})

$(document).on('blur', '.skip-navi a', function(){
	$(this).css({
		'opacity': '0',
		'top': '-30px',
	})
})

$(document).on('click', '.skip-navi a', function(){
	var skipId = $(this).attr('data-skipnaviid');
	var	$skipEl = $('[data-skipnaviel = "'+ skipId +'"]');
	var $banner = $('.layout-banner').not('.on');

	if( $banner.length ) bannerLayout.toggle();

	if( skipId == 'container' ){
		$skipEl.attr('tabindex','-1').focus();
	}else{
		$skipEl.focus();
	}
})


/*
	gnb - dropdown #지엔비드롭다운
*/
/* function */
var gnbDropdown = (function() {
    var method = {
        mouseEnter : function(target){
            var $gnbMenu = $('.header .gnb > ul > li'),
            	$thisMenu = $(target);
            
            $gnbMenu.removeClass('on')
            $thisMenu.addClass('on')
			$('.header').css('background-color', '#FFFFFF')
        },
        mouseLeave : function(target){
            var $this = $(target);


            $this.removeClass('on')
			$('.header').css('background-color', '#F9F9F9')
        },
        tabAccess : function(e){
            if (e.keyCode !== 13) return;

            var target = e.target.closest('li');
            method.mouseEnter(target);
        }
    }

    return method;
})();


/* event */
$(document).on('mouseenter', '.header .gnb-left > li', function(){
    gnbDropdown.mouseEnter($(this));
})

$(document).on('mouseleave', '.header .gnb-left > li', function(){
    gnbDropdown.mouseLeave($(this));
})

$(document).on('keyup', '.header .gnb > ul > li > a', function(e){
    gnbDropdown.tabAccess(e);
})

/*
	fixed scroll
*/
function layoutFixedScroll(){
	var $header = $('.layout .header');

	if ( $(window).scrollLeft() > 0 ){
		$header.css('margin-left',-$(window).scrollLeft())
	}
	
}

$(window).on('scroll',function(){
	layoutFixedScroll()
})


/*
	familysite #패밀리사이트
*/
function famToggle(target){
	var $target = $(target).closest('.familysite');

	if($target.hasClass('on')){
		$target.removeClass('on')
	}else {
		$target.addClass('on')
	}
}

$(document).on('click','.familysite .btn-fam', function(){
	famToggle($(this));
})

// 외부영역 클릭시
$(document).on('click', function(e){
	var $target = $('.familysite'),
		$option = $('.fam-option li a');

	if($target.hasClass('on')){
		if( !($target.has(e.target).length) || $option.is(e.target) ){ 
			$target.removeClass('on')
		 }
	}
})

function prodSwiperLayout(){
	var $prod = $('.prod-swiper-wrap .prod-list-wrap');

	var winW = $(window).innerWidth(),
		prodW = $('.prod-swiper-wrap').outerWidth(),
		addW = (winW - prodW)/2,
		fakeW = 0;

	if ( winW > 1280 ){
		$prod.css({
			'width':'calc(100% + '+(addW + fakeW)+'px)',
			'margin-left': -fakeW+'px'
		})
	}	
	
}


/*
	swiper 스와이퍼
*/
function swiper(){
	// 서브메인 - 상품 스와이퍼
	var prodSwiper = new Swiper('.prod-swiper-wrap .prod-list',{
		speed: 500,	
		width: 360,	
		spaceBetween: 20,	
		slidesPerView : 'auto',	
		allowTouchMove : false,		
		loop: false,
		navigation: {
			nextEl: '.prod-nav .prod-swiper-nav.next',
			prevEl: '.prod-nav .prod-swiper-nav.prev',
		},				
	})

	var subProdSwiper = new Swiper('.mykb-prod-swiper',{
		speed: 500,	
		width: 340,
		spaceBetween: 20,
		slidesPerView : 'auto',	
	})
	
}


/*
	상품 카드 마우스오버
*/
function prodCardAni(target){
	var $target = $(target);
	var $prodCard = $('.prod-list .prod-item');

	if( $target.hasClass('on') ){
		$target.removeClass('on')
	}else {
		$prodCard.removeClass('on')
		$target.addClass('on')
	}
}


$(document).on('mouseenter', '.prod-list .prod-item', function(){
	prodCardAni($(this));
})

$(document).on('mouseleave', '.prod-list .prod-item', function(){
	prodCardAni($(this));
})