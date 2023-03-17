/******************************************************
	가이드버전 안내
******************************************************/
console.log('Proposal Guide v4.2' );


/******************************************************
	On Load
******************************************************/
$(window).on('load', function() {
	
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

	// 프로젝트 제목 위치
	setTimeout(function(){
		$('.project_wrap').each(function(){
			var thisHeight = $(this).outerHeight();
			$(this).css({ 'margin-top' : -(thisHeight/2) });
		});
	},10)

});

// 인트로 버튼
$(document).on('click', '.logo_wrap', function(){
	location.href='../../index.html';
});
