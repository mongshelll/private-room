/* EiLAB Stove UI | version 1.3 | date 2022-10-14 since 2020-03-16 */
/** -------------------------------------------
    대분류
---------------------------------------------*/
/* 소분류 */
// 기타설명



/** -------------------------------------------
	window & document
---------------------------------------------*/
/* document */
$(document).ready(function(){
});

/* window */
$(window).on('load', function(){
	framework();//프레임워크
	$('.layout').setLayout({ type: 'UI_Function' })//레이아웃
	lnbMaker('ui_function');//LNB
	preLoadTabMaker();//고정탭생성
	copyCode('.source_code');//소스보기 팝업
});

$(window).on('resize', function(){
	framework();//프레임워크
	$('.layout').setLayout({ type: 'UI_Function' })//레이아웃
});



/** -------------------------------------------
	프레임워크
---------------------------------------------*/
var framework = function(){
	var framework = $('.framework');
	var header = framework.find('.header');
	var mainviewer = framework.find('.mainviewer');

	var headerH = header.outerHeight();

	mainviewer.css({ 'padding-top': headerH });

};



/** -------------------------------------------
	레이아웃
---------------------------------------------*/
$.fn.setLayout = function(options){
	var defaults = {
		type: null,
	};

	var o = $.extend(defaults, options);

	/* var 셀렉터 */
	var header = $('.framework').find('.header');
	var layout = $('.layout');
	var lnb = $('.lnb'),
		lnbHeader = lnb.find('.header'),
		lnbContain = lnb.find('.container');
	var viewer = $('.viewer');

	/* var 사이즈 */
	var winW = $(window).outerWidth(),
		winH = $(window).outerHeight();

	var lnbW = lnb.outerWidth(),
		lnbHeaderH = lnbHeader.outerHeight(true),
		headerH = header.outerHeight(true)

	/* Fn사이즈설정 */
	var setSize = function(){

		if( o.type == 'UI_Function' ){
		};

		lnbContain.css({ height: winH - lnbHeaderH - headerH });
		viewer.css({ 'margin-left' : lnbW });

	};

	setSize(); /* Fn사이즈설정 */
};



/** -------------------------------------------
	LNB
---------------------------------------------*/
var lnbMaker = function(type){

	var ftTagNameDepth = '[data-menu="depth"]',
		fnTagNamePage = '[data-menu="page"]';

	var depth = $(ftTagNameDepth),
		page = $(fnTagNamePage);

	//1depth 생성
	depth.each(function(){
		var depth = $(this),
			depthTitle = depth.attr('data-depthTitle');
		var depthTitleHtml = '<div class="title"><span class="txt">'+ depthTitle +'</span></div>',
			depthContsHtml = '<div class="conts"></div>',
			blt = '<span class="bullet"></span>';

		depth.children().wrapAll(depthContsHtml);
		depth.prepend(depthTitleHtml);

		var depthTitleWrap = depth.children('.title')

		if( depth.children('.conts').length > 0 ) {
			depthTitleWrap.prepend(blt)
		};

	});

	//2depth 생성
	page.each(function(){
		var _this = $(this),
			pageName = _this.attr('data-name'),
			pageDir = _this.attr('data-dir');

			var btnNewWindowHtml = '<a href="'+ pageDir+'" target="_blank" class="btn new_window" title="새창으로열기"></a>',
				infoIdHtml = '<span class="info name" >'+ pageName +'</span>',
				pageBullet = '<span class="bullet" >-</span>'

		_this.attr('title', pageName);
		_this.append(infoIdHtml);

		if( type == 'ui_function'){
			_this.prepend(btnNewWindowHtml);
		}else{
			_this.prepend(pageBullet);
		}

	});
};



/** -------------------------------------------
	URL
---------------------------------------------*/
/* URL - urlCall */
var urlLocationHref = 'locationHref',
	urlTemplateRoot = 'templateRoot',
	urlFixedTab = 'fixedTab',
	urlIndexCut = 'indexCut'

var urlCall = function(mode){
	var url = location.href
	var templateRoot = url.substr(0,url.indexOf('?'))
	var fixedTab = url.substr(url.indexOf('?')+1, url.length );
	var indexCut = url.substr(0, url.lastIndexOf('index.html'))

	if(mode == urlLocationHref) return url
	if(mode == urlTemplateRoot){
		if( url.indexOf('?') == -1 ) return url;
		else return templateRoot;
	};
	if(mode == urlFixedTab) return fixedTab
	if(mode == urlIndexCut) return indexCut
};

/* URL - fixedTab */
var fnFixedTab = function(mode){
	var fixedTablist = $('[data-tab="listWrap"]').find('[data-tab="list"][data-fnfixed="true"]');
	var arryActiveTab = []

	if( mode == 'preload'){
		var fixedTabId = urlCall(urlFixedTab).replace(/tab=/g,'')
		var arryfixedTabId = fixedTabId.split('&')
		return arryfixedTabId

	}else{
		for( i = 0; i < fixedTablist.length; i++  ){
			var tabId = fixedTablist.eq(i).attr('data-pageId');
			var fixedTab = 'tab=' + tabId;
			if( arryActiveTab.indexOf(fixedTab) == -1 ) arryActiveTab.push(fixedTab);
		};
		return arryActiveTab
	}
}

/* 고정탭경로복사 */
var fixedTabCopy = function(){
	var url  = urlCall(urlTemplateRoot);
	var addFixedTab = function(){
		if( fnFixedTab().length > 0 ) return '?' + String(fnFixedTab()).replace(/,/g,'&');
		else return '';
	};
	var addedTab = url + addFixedTab();

	if( addedTab.indexOf('?') == -1 ){
		var msg = '고정된 탭이 없습니다.'
	}else{
		var msg = '주소가 복사되었습니다. \n\n'+ addedTab;
		$('body').append('<input class="copyUrl" value="'+ addedTab +'">')
		$('.copyUrl').select();
		document.execCommand("copy");
	};

	alert(msg);
};

/* URL - windowOpen */
/* 페이지새창열기 */
var windowOpen = function(){
	var _this = this,
		dataDir = _this.getAttribute('data-dir')
	var fileUrl = urlCall(urlIndexCut) + dataDir
	if( $(window).outerWidth() < 768 ) window.open(fileUrl) //pad이하
};

$(document).on('click', '.layout [data-menu="page"]', windowOpen);



/** -------------------------------------------
	고정탭생성(url parameter 반영)
---------------------------------------------*/
var preLoadTabMaker = function(){

	if( urlCall(urlLocationHref).indexOf('?') > 0 ){
		var arryfixedTabId = fnFixedTab('preload')
		var fixedTabLength = urlCall(urlFixedTab).match(/=/g).length
		$('.viewer').addClass('active');

		/* 뷰어 - 탭(목록) */
		var tabListWrap = $('[data-tab="listWrap"] .scrollarea');
		/* 뷰어 - 탭(내용) */
		var tabContWrap = $('[data-tab="contWrap"]');


		for( i = 0; i < fixedTabLength; i++  ){
			var pageId = arryfixedTabId[i]

			var lnbPage = $('[data-menu="page"][data-pageId="'+ pageId +'"]')

			var pageName = lnbPage.attr('data-name'),
				pageDir = lnbPage.attr('data-dir');

			var tabListHtml = tabListMaker(pageId, pageName, pageDir)
			var tabContHtml = tabContsMaker(pageId, pageName, pageDir)

			tabListWrap.append(tabListHtml);
			tabContWrap.append(tabContHtml);

			lnbPage.trigger('dblclick');
		};

		tabListWrap.find('.tablist').eq(0).trigger('click');
	};

};



/** -------------------------------------------
	editorCtrl
---------------------------------------------*/
/* ※소스정리※ */
/*
	※※※※디벨롭※※※※※
	탭
	: draggable
	: 새로고침 기능

	url parameter
	: url저장
	: 저장된 url기반 페이지생성

	※※※※수정※※※※※
*/

/* 뷰어 - html(탭목록) */
var tabListMaker = function(pageId, pageName, pageDir){
	var tabListHtml = '<div class="tablist" data-tab="list" data-name="'+ pageName +'" data-pageId="'+ pageId +'" data-dir="'+ pageDir +'" title="'+ pageName +'" data-fnFixed="false">'
		tabListHtml +=      '<span class="info name">'+ pageName +'</span>'
		tabListHtml +=      '<span class="btn btn_close" data-tabCtrl="close" title="'+ pageName +' 페이지 닫기"></span>'
		tabListHtml +='</div>'
	return tabListHtml;
};

/* 뷰어 - html(탭내용) */
var tabContsMaker = function(pageId, pageName, pageDir){
	var tabContHtml = '<div class="tabcont" data-tab="cont" data-name="'+ pageName +'" data-pageId="'+ pageId +'"  data-dir="'+ pageDir +'" title="'+ pageName +'" data-fnFixed="false">'
		tabContHtml += '<iframe src="'+ pageDir +'" frameborder="0" name="frameView"></iframe>'
		tabContHtml += '</div>'
	return tabContHtml;
};

/* fn - 뷰어컨트롤 */
var fnViewerCtrl = function(mode){
	var viewer = $('[data-viewer="viewer"]')
	if( mode == 'show') viewer.addClass('active');
	if( mode == 'hide') viewer.removeClass('active');
};

/* fn - 에디터컨트롤 */
var editorCtrl = function(pageId, mode){
	/* lnb */
	var lnbPage = $('[data-menu="page"][data-pageId="'+ pageId +'"]'),
		lnbWrap = lnbPage.closest('[data-menu="wrap"]');

	var pageId = lnbPage.attr('data-pageId'),
		pageName = lnbPage.attr('data-name'),
		pageDir = lnbPage.attr('data-dir');

	/* 뷰어 - 탭(목록) */
	var tabListWrap = $('[data-tab="listWrap"] .scrollarea'),
		tabList = $('[data-tab="list"][data-pageId="'+ pageId +'"]');

	/* 뷰어 - 탭(내용) */
	var tabContWrap = $('[data-tab="contWrap"]'),
		tabCont = $('[data-tab="cont"][data-pageId="'+ pageId +'"]');

	var tabListHtml = tabListMaker(pageId, pageName, pageDir)
	var tabContHtml = tabContsMaker(pageId, pageName, pageDir)

	/* fn - 탭생성 */
	var fnTabMake = function(){
		if( tabListWrap.find('[data-pageId="'+ pageId +'"]').length == 0 ){ //열려있는 탭이 없는 경우
			if( tabListWrap.find('.active').length == 0 ){ //활성화된 탭이 없는 경우
				tabListWrap.append(tabListHtml);
				tabContWrap.append(tabContHtml);
			}else{ //활성화된 탭이 있는 경우
				if( tabListWrap.find('[data-fnFixed="false"]').hasClass('active') == true ){ //고정돼있지 않은 탭이 활성화되어있는 경우
					tabListWrap.find('[data-fnFixed="false"]').after(tabListHtml).remove();
					tabContWrap.find('[data-fnFixed="false"]').after(tabContHtml).remove();
				}else{ //고정된 탭이 활성화되어있는 경우
					tabListWrap.find('[data-fnFixed="false"]').remove();
					tabContWrap.find('[data-fnFixed="false"]').remove();
					tabListWrap.find('.active').after(tabListHtml);
					tabContWrap.find('.active').after(tabContHtml);
				};
			};

		};

	};

	/* 실행 - 탭생성 */
	fnTabMake();

	/* re var */
	var reTabList = $('[data-tab="list"][data-pageId="'+ pageId +'"]'),
		reTabCont = $('[data-tab="cont"][data-pageId="'+ pageId +'"]');

	/* fn - 경로 */
	var fnDirCtrl = function(mode){
		var locationUrl = location.href
		var cutSpot = locationUrl.lastIndexOf('/')
		var rootUrl =  locationUrl.substring(0, cutSpot + 1)
		var activeListUrl = tabListWrap.find('.active').attr('data-dir')
		var pageDirFull = rootUrl + activeListUrl

		if( mode == 'root' ) return rootUrl;
		if( mode == 'fileDir' ) return pageDirFull;
	};

	/* fn - lnb컨트롤러 */
	var fnLnbCtrl = function(action){
		var activeTab = tabListWrap.find('.active'),
			activeTabId = activeTab.attr('data-pageId');

		lnbWrap.find('[data-menu="page"].active').removeClass('active');

		if( action == 'active'){
			lnbPage.addClass('active');
		};

		if( action == 'tabSync'){
			$('[data-menu="page"][data-pageId="'+ activeTabId +'"]').addClass('active');
			fnFixed('lnb','false');
		};
	};

	/* fn - tab컨트롤러 */
	var fnTabCtrl = function(action){
		if( action == 'active'){
			reTabList.addClass('active').siblings().removeClass('active');
			reTabCont.addClass('active').siblings().removeClass('active');
		};

		if( action == 'remove'){
			if( reTabList.hasClass('active') == true ){
				if( reTabList.prev().length == 0 ){
					setTimeout(function(){
						tabListWrap.find('[data-tab="list"]').eq(0).addClass('active');
						tabContWrap.find('[data-tab="cont"]').eq(0).addClass('active');
					});
				}else{
					reTabList.prev().addClass('active');
					reTabCont.prev().addClass('active');
				};
			};
			reTabList.remove();
			reTabCont.remove();
		};

	};

	/* fn - 탭고정표시(lnb,tab) */
	var fnFixed = function(target, onOff){
		if( target == 'lnb' ) lnbPage.attr('data-fnFixed', onOff);
		if( target == 'tabList' ) tabList.attr('data-fnFixed', onOff);
		if( target == 'tabCont' ) tabCont.attr('data-fnFixed', onOff);
	};

	/* 실행 - 탭활성화 */
	if( mode == 'active' ){
		fnLnbCtrl('active');
		fnTabCtrl('active');
	};

	/* 실행 - 탭삭제 */
	if( mode == 'remove'){
		fnTabCtrl('remove');
		setTimeout(function(){ fnLnbCtrl('tabSync'); });

	};

	/* 실행 - 탭고정 */
	if( mode == 'fnFixed' ){
		fnFixed('lnb','true');
		fnFixed('tabList','true');
		fnFixed('tabCont','true');
	};

	/* 실행 - dir 갱신 */
	var dir = fnDirCtrl('fileDir')
	$('.dir').val(dir);

	/* 실행 - 뷰어컨트롤 */
	if( tabListWrap.find('[data-tab="list"]').length == 0 ) fnViewerCtrl('hide')
	else fnViewerCtrl('show')

	$('[data-tab="listWrap"] .scrollarea').sortable();

	/* 이벤트 - dir 새로고침 */
	$(document).on('click', '[data-tabCtrl="refresh"]', function(e){
		$('.tabcont.active iframe').attr('src', fnDirCtrl('fileDir'));
	});
};

$(document).on('click','[data-pageId]', function(e){
	var pageId = $(this).attr('data-pageId');
	editorCtrl(pageId, 'active');
});

$(document).on('dblclick','[data-pageId]', function(e){
	var pageId = $(this).attr('data-pageId');
	editorCtrl(pageId, 'fnFixed');
});

$(document).on('touchstart','[data-pageId].active', function(e){
	var pageId = $(this).attr('data-pageId');
	editorCtrl(pageId, 'fnFixed');
});

$(document).on('click', '[data-tabCtrl="close"]', function(e){
	e.stopPropagation();
	var pageId  = $(this).closest('[data-tab="list"]').attr('data-pageId');
	editorCtrl(pageId, 'remove');
});



/** -------------------------------------------
	소스보기 팝업
---------------------------------------------*/
function copyCode(target){
	var _target = $(target);

	var _this = _target;
	_this.parents('.ex_type').append('<div class="sourceWindow"><div class="sourceWindow_close">X</div><pre class="sourceView"></pre></div>');

	for ( var i = 0; i <_this.length; i++ ){
		var getText = String(_this[i].innerHTML);
		$('.sourceWindow .sourceView')[i].append(getText);
	}

	$(document).on('click','.source', function(){
		$('body').append('<div class="sourceDim"></div>');
		var _this = $(this);

		_this.parents('.ex_type').find('.sourceWindow').addClass('active')
	});

	$(document).on('click','.sourceWindow .sourceWindow_close', function(){
		$('.sourceDim').remove();
		var _this = $(this);

		_this.parents('.ex_type').find('.sourceWindow').removeClass('active')
	});

	$('.copy').on('click', function(){
		var _this = $(this);
		_this.addClass('on');
		_this.text('✓');
		_this.attr('disabled', '')

		var step1 = _this.closest('.ex_type').find('.sourceView').text();
		var step2 = step1.replace('\n', '');
		var pos = step2.lastIndexOf('\n');

		navigator.clipboard.writeText(step2.substring(0,pos));

		setTimeout(function(){
			_this.removeClass('on');
			_this.text('copy');
			_this.removeAttr('disabled');
		},750)
	})
}



/** -------------------------------------------
	경로복사
---------------------------------------------*/
$(document).on('click', '[data-dirCopy="copy"]', function(){
	$('.dir').select();
	document.execCommand('copy');
	alert('폴더경로가 복사되었습니다.')
});

$(document).on('click', '[data-urlCopy="copy"]', fixedTabCopy);



/** -------------------------------------------
	폴더 아코디언 기능
---------------------------------------------*/
/* 폴더 열기/닫기 */
$(document).on('click', '.depth .title', function(){
	var depth = $(this).closest('[data-menu="depth"]')
	if( depth.hasClass('active') == true ){
		depth.removeClass('active')
	}else{
		depth.addClass('active')
	}
});

/* 전체 폴더 열기/닫기 */
$(document).on('click', '.menu_ctrl_wrap .btn', function(){
	var _this = $(this)
	if( _this.hasClass('active') == true ){
		_this.removeClass('active').html('<span>전체 닫기</span>');
		$('[data-menu="wrap"]').find('.depth').addClass('active')
	}else{
		_this.addClass('active').html('<span>전체 펼치기</span>');
		$('[data-menu="wrap"]').find('.depth').removeClass('active')
	}
});



/** -------------------------------------------
	헤더 링크연결
---------------------------------------------*/
$(document).on('click' , '.app_wrap .app', function(){
	var url = $(this).children('a').attr('href');
	var target = $(this).children('a').attr('target');
	if ( target == '_self') {
		location.href = url;
	} else {
		$('.viewer iframe').attr('src', url);
		$(this).addClass('active').siblings().removeClass('active');
	}
});


