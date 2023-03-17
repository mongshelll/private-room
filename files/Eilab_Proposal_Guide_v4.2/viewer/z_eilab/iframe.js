/******************************************************
	window.load
******************************************************/
$(window).load(function(){
	$('html, body').removeClass('preload');
	$('.btn, .btn2').addClass('btnact');
	$('.ctrl, .ctrl2').addClass('ctrlact');
	cursorEffect();
});


/******************************************************
	document.ready
******************************************************/
// 리플래시 버튼
$(document).on('click', '.re_btn', function(){
	location.reload();
});


$(document).ready(function(){
	eilab_proposal();
});


/******************************************************
	Function.list
******************************************************/

// 제안서 기본
var eilab_proposal = function(){

	// 사이즈 정의
	var winW = $(window).outerWidth();
	var winH = $(window).outerHeight();
	var $win = $('html, body');
	
	// URL 파라메터 전달
	function getParam(sname) {
		var params = location.search.substr(location.search.indexOf("?") + 1);
		var sval = "";
		params = params.split("&");
		for (var i = 0; i < params.length; i++) {
			temp = params[i].split("=");
			if ([temp[0]] == sname) { sval = temp[1]; }
		}
		return sval;
	}

	// URL 변수정의
	var name = getParam("name"); // 이름
	var device = getParam("device"); // 물리적 디바이스 종류 (폰, 태블릿, PC)
	var type = getParam("type");	// 환경 (앱, 모바일웹, PC웹)
	var mode = getParam("mode"); // 모드 (싱글, 멀티)
	var custom = getParam("custom");	 // 자율사용 커스텀모드

	// 디바이스 사이즈 정의
	if ( device != "") { 
		$('.device').addClass('mode '+mode+' '+device+' '+type+' ' );
		var frameW = $('.frame').outerWidth();
		var frameH = $('.frame').outerHeight();
		var $frame = $('.contents');
		$frame.css({ 'width' : frameW , 'height' : frameH });
	} else {
		var frameW = $(window).outerWidth();
		var frameH = $(window).outerHeight();
		var $frame = $('.device, .frame .contents');
		$frame.css({ 'width' : frameW , 'height' : frameH });		
	}

	// 멀티모드시 헬퍼삭제
	if ( mode != 'single' ) { 
		$(document).find('.eilabHelper').hide();
	} 

	// 커스텀 모드
	if ( custom == "ogdesk_mod" && mode == "single" ) { // OG DESK 모드
		// 선언
		$('body').prepend('<div class="btn usb_stick"></div>');		
		$('.device').prepend('<div class="usb_actionarea"></div>');
		$('.device').prepend('<div class="usb_hole"></div>');
		$('.device').find('.contents').append('<div class="og_insert_push" data-type="sliding" data-name="OG푸쉬"><div class="btn"></div></div>');
		$('.device').find('.contents').append('<div class="og_remove_push" data-type="sliding" data-name="OG해제"><div class="btn"></div></div>')

		var $device = $(document).find('.device');
		var $usb_stick = $(document).find('.usb_stick');
		var $usb_actionarea = $(document).find('.usb_actionarea');
		var $usb_hole = $(document).find('.usb_hole');
		
		var usb_space = 30;
		var usb_animation = usb_space*3;
		var usb_originalY = $usb_stick.offset().top;
		var usb_originalX = $usb_stick.offset().left;
		var usb_insertY = $usb_hole.offset().top + usb_space;
		var usb_insertX = $usb_hole.offset().left;

		// 실행
		var activeEvent = function(){
			
			$device.addClass('transition').css({ 'transform' : 'translateY(-'+usb_space+'px)' });	
			$usb_stick.addClass('transition z-idx').css({ 'top' : usb_insertY, 'left' : usb_insertX });
			if ($usb_stick.hasClass('complete') == false ) {
				setTimeout(function(){					
					$usb_stick.addClass('complete').css({ 'margin-top' : '-'+usb_animation+'px' });								
				}, 500);	
			}						

			setTimeout(function(){						
				$device.removeClass('transition');
				$usb_stick.removeClass('transition').bind('click', clearEvent);		
				$usb_actionarea.hide();	
			}, 1000);			
			
			$(document).find('div[data-target="바탕화면"]').trigger('click');
			dim('fadeOut');			
			sliding('OG해제','reset');	
			setTimeout(function(){
				sliding('OG푸쉬','show','top');
			}, 1000);
			setTimeout(function(){
				indicator_case('secruity')
				sliding('OG푸쉬','reset');
				$(document).find('div[data-target="시작화면"]').trigger('click');
			}, 3000);

		};

		// 해제
		var clearEvent = function(){
			
			$device.addClass('transition').removeAttr('style');
			$usb_stick.addClass('transition').removeAttr('style');	

			setTimeout(function(){	
				$device.removeClass('transition');		
				$usb_stick.removeClass('transition z-idx complete').unbind('click', clearEvent);	
				$usb_actionarea.show();			
			}, 1000);	

			dim('fadeIn','1100');		
			setTimeout(function(){							
				sliding('OG해제','show','bottom');
			}, 500);
			setTimeout(function(){		
				indicator_case('off')
				dim('fadeOut');	
				sliding('OG해제','reset');				
				$(document).find('div[data-target="바탕화면"]').trigger('click');		
			}, 3000);

		};

		// USB 조작
		$usb_stick.draggable({ revert: "invalid" });
		$usb_actionarea.droppable({
			drop: function( event, ui ) {
				activeEvent();		
			}
		});

		// 자동실행
		if ( $usb_stick.length == 0 ) activeEvent();

	} else if ( custom == "mirror_mod" && mode == "single" ) { // 미러링 모드
		// 선언
		$('.device').prepend('<div class="btn mirroring"></div>');

		var $device = $(document).find('.device');
		var $mirroring_btn = $(document).find('.btn.mirroring');		

		// 실행
		var activeEvent = function(){
			$mirroring_btn.addClass('active').unbind('click', activeEvent);

			$device.clone().appendTo('#layout');		
			$device_original = $('.device').eq(0);
			$device_mirroring = $('.device').eq(1);

			setTimeout(function(){		
				$device_original.addClass('transition original_device');
				$device_mirroring.addClass('transition mirror_device').find('.btn.mirroring').hide();
			}, 0);	
			
			setTimeout(function(){			
				$mirroring_btn.bind('click', clearEvent);		
			}, 500);		
			
			$device_original.find('scroll').scroll( function(){
				var oriSide = $(this).scrollTop();		
				var mirSide = $device_mirroring.find('.scroll');
				mirSide.scrollTop(oriSide)
			});

		};

		// 해제
		var clearEvent = function(){
			$mirroring_btn.removeClass('active').unbind('click', clearEvent);

			$device_original = $('.device').eq(0);
			$device_mirroring = $('.device').eq(1);			

			setTimeout(function(){		
				$device_original.removeClass('transition original_device');
				$device_mirroring.removeClass('mirror_device').addClass('device_off');
			}, 0);	

			setTimeout(function(){		
				$device_mirroring.remove();
				$mirroring_btn.bind('click', activeEvent);	
			}, 500);			
			
		};

		// 초기세팅
		$mirroring_btn.bind('click', activeEvent);	
		
	} else if ( custom == "omni_channel" && mode == "single" ) { // 옴니채널 모드
		// 선언
		$('body').prepend('<div class="btn omni"></div>');

		var $device = $(document).find('.device');
		var $omni_btn = $(document).find('.btn.omni');		
		var $tempA = $(document).find('.eilabHelper');

		var nameSplit = name.split("_");    

	
		// 실행
		var activeEvent = function(){
			$omni_btn.addClass('active').unbind('click', activeEvent);
	
			// $(parent.document).find('.shotcut').eq(0).trigger('click');	

			$('body').append(''+
				'<div class="second_frame">' +
					'<iframe src="../type_'+nameSplit[1]+'_pc/index.html?device=imac&type=pc&name=type_'+nameSplit[1]+'_pc&mode=single" scrolling="no" name="type_'+nameSplit[1]+'_pc" class="type_'+nameSplit[1]+'_pc"></iframe>' + 
				'</div>' +
			'');	

			setTimeout(function(){			
				$device.addClass('transition first_frame');	
				$tempA.addClass('transition first_frame');	
				$(document).find('.second_frame').addClass('transition pc_device');
			}, 500);		

			setTimeout(function(){			
				$omni_btn.bind('click', clearEvent);		
			}, 700);
			
		};

		// 해제
		var clearEvent = function(){
			$omni_btn.removeClass('active').unbind('click', clearEvent);
			
			setTimeout(function(){			
				$device.removeClass('first_frame');
				$tempA.removeClass('first_frame');
				$(document).find('.second_frame').removeClass('pc_device');
			}, 0);		
			
			setTimeout(function(){		
				$device.removeClass('transition');
				$tempA.removeClass('transition');
				$(document).find('.second_frame').removeClass('transition');
				$omni_btn.bind('click', activeEvent);		
			}, 500);	

		};

		// 초기세팅
		$omni_btn.bind('click', activeEvent);	
	
	} else if ( custom == "zoom" ) { // 줌 모드

		var $layout = $('#layout'),
			$frame = $('.device, .frame .contents'),
			$eilabPoint = $('.eilabPoint');
			
		var isiPad = /ipad/i.test(navigator.userAgent.toLowerCase());

		if (isiPad) {		
			$layout.addClass('zoom');
		}else{
			$layout.removeClass('zoom');
		}

		$frame.css({ 'width' : 1920 , 'height' : 1080 });
		$eilabPoint.addClass('theme_wh');
		
	} else { // 기본모드

	}

	setTimeout(function(){
		$('.frame').addClass('active');
	}, 100);
};

// 기본 인디케이터
var indicator = function(color){
	$('.indicator').removeClass('white black');
	$('.indicator').addClass(color);
};

// 인디케이터 모드
var indicator_case = function(type){
	if ( type == 'secruity') {
		$('.indicator').append('<div class="security_type"></div>');
	} else {
		$('.indicator').find('div').remove();
	}
};

// cursor 클릭효과
var cursorEffect = function(){
	$('body').append('<div class="cursor"></div>');
	var cursor = $('.cursor');
	var layout = $('#layout');

	layout.on("click", function(e){		
		var speed = 500;
		cursor.css({'left':e.pageX, 'top':e.pageY, 'animation':'cursorhide '+ speed +'ms forwards'});
		setTimeout(function(){
			cursor.removeAttr('style');
		},speed);
	});
};

// 진행포인트
var pointCheck = function(pointName){
	var list = $('[data-fnTag="eilabPoint_wrap"] [data-fnTag="list"]'),
		pointArray = [];

	list.each(function(){
		pointArray.push( $(this).attr('data-point') );
	});

	if( pointArray.indexOf( pointName ) != -1 ){
		list.removeClass('active');
		$('[data-point="'+ pointName+'"]').addClass('active');
	}else{
		return
	}
};


