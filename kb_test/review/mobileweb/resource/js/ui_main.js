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
	//main swiper
	swiper();

	//메인 플로팅버튼
	floatingMenu();

	//랜딩페이지 배너 컨트롤
	$(".top_banner .btn_banner_close").on("click", function(){
		$(".top_banner").slideUp();
	});
});


$(window).on('scroll',function(){
	headerScr();//헤더 스크롤
})

//헤더 스크롤
function headerScr(){
	var $header = $('.header');

	if ($header.length == 0) return;

	var _windowT = $(window).scrollTop();

	if ( _windowT > 0 ){
		$header.addClass('is_scroll');
	} else {
		$header.removeClass('is_scroll');
	}
}

//swiper
function swiper() {
	//main visual swiper
	var mainSwiper = new Swiper(".main_slide .swiper-container", {
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		effect: "fade",
		loop: true,
		autoplay: {
			delay: 3000
		}
	});

	var $mainSwiperPlay = $(".btn_slide_start");
	var $mainSwiperStop = $(".btn_slide_stop");

	//swiper play ctrl
	playCtrl(mainSwiper, $mainSwiperPlay, $mainSwiperStop);

	//main board swiper
	var subSwiper = new Swiper(".sub_slide .swiper-container", {
		slidesPerView: "auto",
		spaceBetween: 10,
	});
}

//스와이퍼 재생컨트롤
function playCtrl(targetSwiper, targetPlay, targetStop) {
	targetStop.on("click", function(){
		$(this).removeClass("on");
		targetPlay.addClass("on");
		targetSwiper.autoplay.stop();
		return false;
	});
	targetPlay.on("click", function(){
		$(this).removeClass("on");
		targetStop.addClass("on");
		targetSwiper.autoplay.start();
		return false;
	});
}

// function playCtrl(targetSwiper) {
// 	$(document).on("click", ".btn_slide_stop", function(){
// 		$(this).removeClass("on");
// 		$(".btn_slide_start").addClass("on");
// 		targetSwiper.autoplay.stop();
// 		return false;
// 	});

// 	$(document).on("click", ".btn_slide_start", function(){
// 		$(this).removeClass("on");
// 		$(".btn_slide_stop").addClass("on");
// 		targetSwiper.autoplay.stop();
// 		return false;
// 	});
// }

//메인 플로팅버튼
function floatingMenu() {
	$(document).on("click", ".floating_menu .ebbtn.btn_cs", function(){
		if ($(".floating_menu").hasClass("on")){
			$(".floating_menu").removeClass("on");
			$(".dim").removeClass("on");
		}else{
			$(".floating_menu").addClass("on");
			$(".dim").addClass("on");
		}
	})
}