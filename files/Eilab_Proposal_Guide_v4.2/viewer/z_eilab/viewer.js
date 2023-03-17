/******************************************************
	On Load
******************************************************/
$(window).on('load', function() {

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
	var now = getParam("now"); // 이름

	// URL 초기타입지정
	if ( now == 'undefined' || now == '' ) {
		$('.btn_wrap .shotcut_wrap .shotcut').eq(0).trigger('click'); 	
	} else {
		$('.btn_wrap .shotcut_wrap .shotcut[data-name="'+now+'"]').trigger('click'); 	
	}

});

// 이아이랩 로고 (인덱스로 이동)
$(document).on('click', '.logo_wrap', function(){
	location.href='../index.html';
});


/******************************************************
	Document Ready
******************************************************/
$(document).ready(function(){

	// 이미지크기 절반
	$('img').hide();
	setTimeout(function(){		
		$('img').each(function(){
			var thisWidth = $(this).outerWidth();
			$(this).width(thisWidth/2).show();
		});
	},0);

	$('#layout').addClass('ppt'); // ppt 모드

});


/******************************************************
	프레임제어
******************************************************/
$(document).on('click', '.btn_wrap .go_area', proposal_list);
$(document).on('click', '.btn_wrap .shotcut_wrap .shotcut', device_create);
$(document).on('click', '.btn_wrap .function_wrap .functioncut', mode_change);
$(document).on('click', '.device .widget_wrap .widget.widget_delete', device_delete);


// 목록열기
function proposal_list(){
	if ( $('.btn_wrap').hasClass('active') == false ) {
		$('.btn_wrap').addClass('active');
	} else {
		$('.btn_wrap').removeClass('active');
	}
};


// 모드변경
function mode_change(){
	// 버튼
	var $btn = $(this)
	$btn.addClass('active').siblings().removeClass('active');
	// 모드
	var mode = $btn.attr('data-mode');	
	if ( mode == 'single') {
		$('.btn_wrap .shotcut_wrap .shotcut').attr({'data-mode':'single'});		
	} else if ( mode == 'multi' ) {
		$('.btn_wrap .shotcut_wrap .shotcut').attr({'data-mode':'multi'});			
	} 
	// 재실행
	$(document).find('.device').remove();
	$('.btn_wrap .shotcut_wrap .shotcut').eq(0).trigger('click'); 	
};


// 디바이스생성
function device_create(){
	
	// 필수	
	var src = $(this).attr('data-src');	
	var name = $(this).attr('data-name');

	// 모드
	var device = $(this).attr('data-device');
	var type = $(this).attr('data-type');
	var mode = $(this).attr('data-mode');
	var custom = $(this).attr('data-custom');

	// 변수
	var $stage = $(document).find('.device_group'); // 디바이스영역
	var $device = $stage.find('.device'); // 디바이스프레임
	var $backdevice = $(document).find('.backdevice'); // 더미디바이스프레임
	var $title_group = $(document).find('.title_group'); // 타이틀영역
	var $title = $title_group.find('.'+name+''); // 타이틀제어를 위한 연동
		
	var device_support = "iphone4 iphone6 iphonex ipad imac"; // 프레임지원 디바이스종류
	var multi_max = 2; // 멀티모드 전체갯수
	var multi_now = $device.length; // 멀티모드 현재갯수

	// 주소 Param변경
	history.replaceState({}, null, '?now='+name+''); 		

	// 모드정의
	if (mode == 'single') { // 싱글모드 
		$backdevice.show().removeClass(device_support).addClass(device); // 화면깜빡임을 막기위해 백디바이스 맞추기
		$device.remove(); // 싱글모드시에는 1개만 노출
		setTimeout(function(){ // 클릭시 제안리스트 숨기기
			// proposal_list();	
		}, 500);		
		$title_group.show(); // 타이틀영역 보여주기
		$title.addClass('active').siblings().removeClass('active'); // 타이틀제어
	} else { // 멀티모드
		$title_group.hide(); // 타이틀영역 삭제
		$device.removeAttr('style'); // 드래그값삭제
		if ( multi_now <= multi_max) { // 최대갯수이전 실행
			$device.removeClass('device2_1 device2_2 device2_3 device3_1 device3_2 device3_3'); // 클래스삭제
		}		
	}
	
	if (custom == 'ppt') { // PPT모드 	
		$('#layout').addClass('ppt');
		proposal_list();
	} else { 
		$('#layout').removeClass('ppt');
	}

	if (custom == 'zoom') { // zoom모드
		$('#layout').addClass('zoom');
	} else {
		$('#layout').removeClass('zoom');
	}


	// Frame 만들기			
	if ( multi_now > multi_max ) { // 3개이상 제어 불가
		alert(''+(multi_max+1)+'개이상 생성 불가능합니다.')
	} else {
		$stage.append(''+
		'<div class="device clicking '+mode+' '+device+' ">' +
			'<div class="widget_wrap"><div class="widget widget_delete"></div></div>' +
			'<iframe src="'+src+'?device='+device+'&type='+type+'&name='+name+'&mode='+mode+'&custom='+custom+'" scrolling="no" name="'+name+'" class="'+name+'"></iframe>' + 
		'</div>' +
		'');
		
		setTimeout(function(){
			$('.backdevice').hide(); // 로딩후에는 백디바이스 숨김 (멀티모드에 필요)
		},500);

		$(document).find('.shotcut').removeClass('active'); // 버튼제어
		$(document).find('iframe').each(function(){
			var frameName = $(this).attr('name');
			$(document).find('.shotcut[data-name="'+frameName+'"]').addClass('active');
		});

		// 디바이스재선언 (실제 프레임로드 후 재선언 - 정리필요)
		var $device = $stage.find('.device');
		var multi_now = $device.length;
			
		// 멀티모드 위치
		if (mode == 'multi') { 
			if (multi_now  == 1) {
			}
			if (multi_now  == 2) {
				$device.eq(0).addClass('device2_1'); // 첫번째클래스부여
			}
			if (multi_now  == 3) {
				$device.eq(0).addClass('device3_1'); // 첫번째클래스부여
				$device.eq(1).addClass('device3_2'); // 두번째클래스부여
				$device.eq(2).addClass('device3_3'); // 세번째클래스부여
			}
		} 

		// z-index 임시조정, 바로 실행한 프레임을 제일 상단에
		$device.removeClass('clicking');	

		// 드래그 기능 (드래그시 확대 및 투명)
		$device.draggable();
		$device.on('mousedown touchstart', function(){
			$device.removeClass('dragging clicking');
			$(this).addClass('dragging clicking');			
		});
		$device.on('mouseup touchend', function(){
			$device.removeClass('dragging');
		});
	}
};


// 디바이스삭제
function device_delete(){
	$(this).parent().parent().remove();  

	$(document).find('.shotcut').removeClass('active'); // 버튼제어
	$(document).find('iframe').each(function(){
		var frameName = $(this).attr('name');
		$(document).find('.shotcut[data-name="'+frameName+'"]').addClass('active');
	});

	var $stage = $(document).find('.device_group'); // 디바이스영역
	var $device = $stage.find('.device'); // 디바이스프레임
	var multi_now = $device.length;

	$device.removeAttr('style'); // 드래그값삭제
	$device.removeClass('device2_1 device2_2 device2_3 device3_1 device3_2 device3_3'); // 클래스삭제

	if (multi_now  == 1) {
	}
	if (multi_now  == 2) {
		$device.eq(0).addClass('device2_1'); // 첫번째클래스부여
	}
	if (multi_now  == 3) {
		$device.eq(0).addClass('device3_1'); // 첫번째클래스부여
		$device.eq(1).addClass('device3_2'); // 두번째클래스부여
		$device.eq(2).addClass('device3_3'); // 세번째클래스부여
	};
};
