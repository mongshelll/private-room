/******************************************************
	시작페이지선언
******************************************************/
// 외부플러그인 호출
$(document).ready(function(){
	swiper();
	iscroll();
	select(); // remix
});

// 인디케이터색상
indicator('black');

// 트랜지션엔드 이벤트 이름 가져오기
var transitionEndEventName = getTransitionEndEventName();


/******************************************************
	기능전용함수 (Function area)

    외부플러그인 실행 및 선언(swiper, iScroll etc...)
    커스텀함수 선언
******************************************************/
/*----------------------------
	외부플러그인
----------------------------*/ 
// swiper
var introduce;
var swiper = function(){
	introduce = new Swiper('.introduce');
};	
// iscroll
var iscroll = function(){
	var iScroll01 = new IScroll('.iScroll.iScroll01', {
		probeType: 3,
		deceleration: 0.00045,
		scrollbars: true,
		fadeScrollbars:true,
		mouseWheel: true,
		bounce: false, // true/false
	});

	iScroll01.on('scroll', iScrollEvent);
};

/* 스크롤이펙트 */ 
var iScrollEvent = function(){
	var $this = this.wrapper,
		scrT = -1 * Number((this.y).toFixed(0)),
        direction = this.directionY;
};

/* 셀렉트 */
function select(){
	$('.select_box').WSlot({
		items:['셀렉트01', '셀렉트02', '셀렉트03', '셀렉트04', '셀렉트05'],
	});
}


/******************************************************
	페이지이동시 실행 (Init area)
******************************************************/
/*----------------------------
	페이지 초기화 기능
----------------------------*/ 
var pageCheck = function(){	

	if( $('div[data-target=""]' ).hasClass('active') == true ){
	};

};


/******************************************************
	이벤트합수 (Event area) - 기본
******************************************************/
/*-----------------------------------------------------
	이벤트함수 가이드
	(Example)

		var default = function(){

			// 제어		
			indicator('기능'); 
			indicator('black | white');
			indicator_security('기능'); 
			indicator_security('active | off'); 

			// 기타
			countFunc('선택자', { endNumber: 0( number ), countSpeed: 3000( 1s = 1000), countEasing: 'swing'( string ), cipher: 3( 자릿수 )}, function(){ 콜백 });
			
		};

	(End)

-----------------------------------------------------*/
// 기본버튼 펑션
var btn_func = function(){
	// 제어
	// 인터랙션	
	// 페이지이동
	// 기타	
};

// 기본컨트롤 펑션
var ctrl_func = function(direction){	
	// 제어
	if( direction == "up" ){
	}else if( direction == "right" ){
	}else if( direction == 'down' ){
	}else if( direction == 'left'){
	}
	// 인터랙션	
	// 기타
};


/******************************************************
	이벤트합수 (Event area) - 커스텀
******************************************************/
function btnAppstart() {
	// console.log('== btnAppstart function');

	$('[data-name="그림자"]').ebShow({
		onAfterShow: function() {
			$('[data-name="인트로"]').ebShow();
		}
	});
}

function btnLoginpage() {
	// console.log('== btnLoginpage function');

	$('[data-name="로그인페이지"]').ebShow();
	$('[data-name="인트로"]').ebHide();
}

function btnFaceid() {
	// console.log('== btnFaceid function');

	$('[data-name="페이스아이디"]').ebShow({
		onAfterShow: function() {
			$('[data-name="페이스아이디"]').ebPlayFaceid({
				onAfterPlay: function() {
					$('[data-name="페이스아이디"]').ebHide();
					$('[data-name="페이스아이디"]').ebResetFaceid();
					$('[data-name="로그인페이지"]').ebHide();
					$('[data-name="메인페이지"]').ebShow({
						onAfterShow: function() {
							countFunc('.count_box', { endNumber: 2552550000, countSpeed: 8500, countEasing: 'swing', cipher: 3 });
						}
					});
				}
			});
		}
	});
}

function btnCamera() {
	// console.log('== btnCamera function');

	indicator('white');
	$('[data-name="카메라"]').ebShow();
}

function btnFlash() {
	// console.log('== btnFlash function');

	$('[data-name="카메라"]').ebCameraFlash({
		onAfterFlash: function() {
			indicator('black');
			$('[data-name="카메라"]').ebHide();
			$('[data-name="서브페이지"]').ebShow();
		}
	});
}

function btnKeypad() {
	// console.log('== btnKeypad function');

	$('[data-name="숫자키패드"]').ebShow();
}

function btnBottomlayer() {
	// console.log('== btnBottomlayer function');

	$('[data-name="숫자키패드"]').ebHide({
		onAfterHide: function() {
			$('[data-name="바텀레이어"]').ebShow();
		}
	});
}

function btnCompletepage() {
	// console.log('== btnCompletepage function');

	$('[data-name="바텀레이어"]').ebHide({
		onAfterHide: function() {
			$('[data-name="서브페이지"]').ebHide();
			$('[data-name="완료페이지"]').ebShow();
		}
	});
}

function btnBacktomain() {
	// console.log('== btnBacktomain function');

	$('[data-name="완료페이지"]').ebHide();
	$('[data-name="메인페이지"]').ebShow();
}

function btnTotalmenu() {
	// console.log('== btnTotalmenu function');

	$('[data-name="전체메뉴"]').ebAutoplay(1500);
}

function btnSelect() {
	// console.log('== btnSelect function');

	$('.select_box').WSlot('show');
}

function ctrlToplayer(direction) {
	// 인터랙션
	if( direction == "down" ){
		// console.log('== ctrlToplayer function');

		$('[data-name="탑레이어"]').ebShow();
	};
}

function ctrlToplayerClose(direction) {
	// 인터랙션
	if( direction == "up" ){
		// console.log('== ctrlToplayerClose function');

		$('[data-name="탑레이어"]').ebHide();
	};
}


/******************************************************
	공통함수선언
******************************************************/

// 버튼이벤트생성
guideCreate();
btnEvent();
ctrlEvent();











