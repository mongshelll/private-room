/************************************
 * 리스트 생성 호출 함수
 * 순서 변경 시 오류 발생할 수 있으므로 변경 금지
/***********************************/
mapCreator.init();

$(window).on('load', function(){
	// 기능 호출
	mapFunc.init();
})

$(window).on('load', function(){
	mapLayout.load();
})

$('.map').on('scroll', function(){
	mapLayout.scroll();
})