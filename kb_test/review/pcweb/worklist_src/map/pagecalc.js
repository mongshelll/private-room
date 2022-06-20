/* EiLAB Publishing Guide | version 5.5.3 | date 2021-06-08 since 2016.12.23 */

/********************************************************************************************************
   페이지옵션
*********************************************************************************************************/
$(window).on('load', function(){
	$('.ia').pageMaker({
		manageMode:{ recentDate : '2021-01-28' }, //모든페이지완료시 recentDate : 'finishAll'
		pageDefault: { pageCallNumber: true }, //화면콜넘버
		pageCalc:{
			addGuideNum : true, // 가이드페이지 진척률에 포함
			percentGage: true // 진척률 퍼센테이지모드
		},
		depthNavi : true //뎁스네비게이션
	});

	/* 화면목록 부가옵션 */
	$('.btn.navi_ctrl').trigger('click') //화면목록 스크롤네비 열어두기
	$('.new_window').remove();// 화면 새창으로 열기 버튼
	// $('.page .row:first-child .btn_txt_copy').remove(); //화면명 복사 버튼
});


$(document).ready(function(){
	/*
		화면유형추가
		※css는 map_override.css에 추가※
	*/
	$('.page').each(function(){
		var _this = $(this);
		var pageDate = _this.find('.info.date');
	
		// 화면유형
		if( _this.hasClass('custom') == true ){
			var typeInfo = { classname: 'page_type custom', name: '[custom]' };
			pageType(_this, typeInfo.classname, typeInfo.name );
			
			// 페이지 개수 셀 필요 없을 때
			// pageDate.addClass('no_calc') ;
			// pageDate.text('화면설명');
		};
	});

});