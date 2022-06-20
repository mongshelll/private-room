/* EiLAB Publishing Guide | version 5.5.3 | date 2021-06-08 since 2016.12.23 */

/********************************************************************************************************
   초기실행
*********************************************************************************************************/
/* document ready */
$(document).ready(function() {
	preLoadFunction(); // 사전로드 스크립트
	// 화면목록옵션지정 :  worklist_src/pagecalc.js 로이동
	iaLayout(); // ia메뉴 레이아웃
	
});

/* window resize */
$(window).resize(function(){
	iaLayout();
})

$(window).load(function(){
	
	$(window).trigger('resize');
	setTimeout(function(){ iaLayout(); })
});

/********************************************************************************************************
   사전로드 스크립트
*********************************************************************************************************/
 /* 사전로드모음 */
var preLoadFunction = function(){
	// iaMenuCtrl(); // ia메뉴 아코디언
	remoteControll(); // 상단고정리모콘 - (ia목록 새로고침, ia메뉴 전체열고닫기)
};

/* 상단고정리모콘 */
var remoteControll = function(){
	listRefresh(); // ia목록 새로고침
	iaMenuAll(); // ia메뉴 전체열고닫기
};


/****************************************************************************
  퍼블리싱가이드
****************************************************************************/
/* ia메뉴 레이아웃 */
var iaLayout = function(){
	var layout = $('.layout'),
		header = $('.header'),
		container = $('.container'),
		ia =  $('.ia');

	var windowHeight = $(window).outerHeight(true),
		headerHeight = header.outerHeight(true);

	layout.css({ 'height': windowHeight })
	container.css({ 'height': windowHeight - headerHeight });
	// container.css({ 'padding-top': headerHeight });
	// ia.css({ 'padding-bottom' : windowHeight*.5 })
};

// 화면유형메이커
var pageType = function( _this, typeClass, typeName ){
	var pageTitle = _this.find('.info.title');
	var typeHtml = '<span class="'+ typeClass +'">'+ typeName +'</span> ';
	pageTitle.prepend(typeHtml);
};

/* pageMaker */
$.fn.pageMaker = function(options){
	var defaults = {
		pageDefault: {
			pageType: null,
			pageCallNumber: false
		},
		pageCalc:{
			addGuideNum : true,
			percentGage : false
		},
		manageMode:{
			recentDate: null
		},
		depthNavi: false
	};

	var o = $.extend(defaults,options);

	var _this = $(this);

	var ia = $('.ia'),
		folder = ia.find('.dir').html(),
		depth = ia.find('.depth'),
		depthTitle = ia.find('.depth').children('.title'),
		page = ia.find('.page'),
		pageTitle = ia.find('a.info.title'),
		pageDate = ia.find('.info.date'),
		totalPageNum = '[data-pageNum="totalPage"]';
		depthCategory = $('.depth.category')

	depthTop= []	

	// 기본사항
	if( o.pageDefault ){
		var btnNew = '<span class="btn btn_func new_window" title="새창으로 열기"></span>',
			btnMoreInfo = '<span class="btn btn_func more_info" title="화면추가정보"></span>';

		depthTitle.each(function(){
			// 폴더경로있는뎁스 root지정
			var _this = $(this);
			if( _this.find('.dir').length > 0 ){
				_this.parent().attr('data-dir','dirDepth');
			};
		});


		
		page.each(function(){
			var _this = $(this);
			var modifyLeng = _this.find('.row_modify .modify').length
			var modifyHtml = '<div class="modify_wrap">'
			 	modifyHtml += '<div class="modify" title="수정 '+ modifyLeng +' 건"> 수정 : <span>'+ modifyLeng +'</span></div>'
				modifyHtml += '</div>'
			if( modifyLeng > 0 ){
				// _this.children('.row').first().find('.info.date').after(modifyHtml);

				// 20220519 수정 건 위치 이동
				_this.children('.row').find('.info.id').after(modifyHtml);
			}
		});

		
		// 뎁스지정
		depthCategory.each(function(){
			var _this = $(this)
			var contsLength = _this.find('.conts').length
			var depth01 = _this,
				depth02 = depth01.children('.conts').children('.depth'),
				depth03 = depth02.children('.conts').children('.depth'),
				depth04 = depth03.children('.conts').children('.depth');

			depth01.addClass('depth01');
			depth02.addClass('depth02');
			depth03.addClass('depth03');
			depth04.addClass('depth04');
			depthTop.push(_this.position().top)
		});

		depth.each(function(){
			if( $(this).find('.depth').length == 0 ){
				$(this).addClass('last_depth')
			}
		})
		


		// 화면경로설정
		pageTitle.each(function(){
			var _this = $(this),
				_thisP = _this.parent(),
				page = _this.closest('.page'),
				folder = _this.closest('.depth[data-dir="dirDepth"]').find('.dir').text(),
				rootIdxOf = folder.indexOf('/');
				root = folder.substring(0,rootIdxOf),
				file = page.find('.info.file'),
				fileName = file.text();

			_this.attr('title','더블클릭 시 새탭열기')
			// 폴더경로 다른 파일 불러올 경우 
			var crossdir = page.find('.info.file').attr('data-crossdir');		

			

			if( _this.attr('href') == undefined ){
				if( crossdir == 'true' ){
					_this.attr('href', fileName);
				}else{
					_this.attr('href', folder + '/' + fileName);
				};
	
				if( _this.attr('target') == undefined ){
					_this.attr('target','frameView');
				};
			};

			_this.before(btnNew); // 새창열기버튼

			// 화면명복사
			var btnTitleCopyHtml = '<span class="btn btn_txt_copy" title="파일경로 복사">copy</span>';
			// _thisP.prepend(btnTitleCopyHtml)
			file.before(btnTitleCopyHtml)

		});



		// 화면유형
		if( o.pageDefault.pageType == null ){

			

			page.each(function(){
				var _this = $(this);
				var pageDate = _this.find('.info.date'),
					pageFile = _this.find('.info.file');


				// 링크
				if( _this.hasClass('link') == true ){
					var typeInfo = { classname: 'page_type link', name: 'link' };
					pageType(_this, typeInfo.classname, typeInfo.name );

					pageDate.text('링크');
					pageDate.addClass('no_calc')
				};

				// pc only
				if( _this.hasClass('pc_only') == true ){
					var typeInfo = { classname: 'page_type pc_only', name: 'PC ONLY' };
					pageType(_this, typeInfo.classname, typeInfo.name );
				};
				
				// 스텝
				if( _this.attr('class').indexOf('step') > -1 ){
					var srch = _this.attr('class').indexOf('step'),
						stepClass = _this.attr('class').substring(srch);
					var typeInfo = { classname: 'page_type page_step', name: stepClass  };
					pageType(_this, typeInfo.classname, typeInfo.name );
				};

				// [탭]
				if( _this.hasClass('tab') == true ){
					var typeInfo = { classname: 'page_type tab', name: '탭' };
					pageType(_this, typeInfo.classname, typeInfo.name );
				};


				// [레이어]
				if( _this.hasClass('layer') == true ){
					var typeInfo = { classname: 'page_type layer', name: '레이어' };
					pageType(_this, typeInfo.classname, typeInfo.name );
				};

				// [풀팝업]
				if( _this.hasClass('popup_full') == true ){
					var typeInfo = { classname: 'page_type popup_full', name: '풀팝업' };
					pageType(_this, typeInfo.classname, typeInfo.name );
				};

				// [팝업]
				if( _this.hasClass('popup') == true ){
					var typeInfo = { classname: 'page_type popup', name: '팝업' };
					pageType(_this, typeInfo.classname, typeInfo.name );
				};

				// [슬라이드 팝업]
				if( _this.hasClass('popup') == true ){
					var typeInfo = { classname: 'page_type slide', name: '슬라이드' };
					pageType(_this, typeInfo.classname, typeInfo.name );
				};

				// [얼럿]
				if( _this.hasClass('alert') == true ){
					var typeInfo = { classname: 'page_type alert', name: '얼럿' };
					pageType(_this, typeInfo.classname, typeInfo.name );
				};
				

				// [컨텐츠]
				if( _this.hasClass('conts') == true ){
					var typeInfo = { classname: 'page_type conts', name: '컨텐츠' };
					pageType(_this, typeInfo.classname, typeInfo.name );
				};
			
				// [공통]
				if( _this.hasClass('common') == true ){
					var typeInfo = { classname: 'page_type common', name: '공통' };
					
					pageType(_this, typeInfo.classname, typeInfo.name );
				};

				// [연결화면]
				if( _this.hasClass('cross') == true ){
					var typeInfo = { classname: 'page_type cross', name: '공통' };
					pageType(_this, typeInfo.classname, typeInfo.name );

					pageDate.text('공통연결');
					pageDate.addClass('no_calc')
				}

			});
		};


		// 화면콜넘버
		if( o.pageDefault.pageCallNumber == true ){
			
			// 20220517 depth - call num 수정 //knh
			depth.each(function(){ // 뎁스
				var _this  = $(this),
					_thisIdx = _this.index() + 1;	

				if( _this.parent('.conts').parent('.depth').hasClass('depth') == true ){
					var _thisIdx =  _this.parent('.conts').prev('.title').attr('data-call-num') + _thisIdx;
				};					
				
				_this.find('.title').attr('data-call-num',_thisIdx)
			});

			// depth.each(function(){ // 뎁스
			// 	var _this  = $(this),
			// 		_thisIdx = _this.index() + 1;
			// 	// if( _thisIdx < 10 ) var _thisIdx = '0' + _thisIdx;

			// 	var callNumberHtml = '<span class="call_number" title="Page Call Number"></span>';

			// 	_this.children('.title').prepend(callNumberHtml);

			// 	if( _this.parent('.conts').parent('.depth').hasClass('depth') == true ){
			// 		var _thisIdx =  _this.parent('.conts').prev('.title').find('.call_number').text() + _thisIdx;
			// 	};

			// 	_this.find('.title > .call_number').text(_thisIdx);
				
			// 	// 20220517 data-call-num 추가 //knh
			// 	_this.find('.title > .call_number').attr('data-call-num',_this.find('.title > .call_number').text())
			// });

			// 20220517 page - call num 수정 //knh
			page.each(function(){ // 페이지
				var _this  = $(this),
					_thisIdx = _this.index() + 1;
				if( _thisIdx < 10 ) var _thisIdx = '0' + _thisIdx;
				
				var callNumberHtml = '<span class="call_number" title="Page Call Number"></span>';
				
				_this.find('.title').before(callNumberHtml);

				if( _this.parent('.conts').parent('.depth').hasClass('depth') == true ){
					var _thisIdx =  _this.parent('.conts').prev('.title').attr('data-call-num') + '_' + _thisIdx;
				};

				_this.find('.call_number').text(_thisIdx);
				
				_this.find('.call_number').attr('data-call-num',_this.find('.call_number').text())
			});

		};

	};


	// 일정관리
	if( o.manageMode ){
		var recentDate = o.manageMode.recentDate.replace(/-/g,'');

		pageDate.each(function(){
			var _this = $(this),
				releaseDate = _this.text().replace(/-/g,'');

			// 가이드페이지 진척률에 포함 여부
			if( o.pageCalc.addGuideNum == true || o.pageCalc.addGuideNum == undefined ){ // 포함
				if( releaseDate == 'default' ) _this.addClass('default finish');
			}else{ // 미포함
				if( releaseDate == 'default' ) _this.addClass('no_calc');
			};

			// 페이지완료 정의 
			if( recentDate == 'finishAll' ){ // 모두완료
				if( _this.hasClass('no_calc') == false ) _this.addClass('finish');
			}else{ // 최근완료
				
				if( recentDate == releaseDate ){ 
					_this.addClass('recent');
				}else if( recentDate > releaseDate ){
					_this.addClass('finish'); // 이전완료
				}
			}; 

		});
	};
		

	// 진척률산정
	if( o.pageCalc ){
		var pageCalc = function(eClass){
			$(eClass).each(function(){
				var _this = $(this),
					_thisP = _this.parent();

				// 뎁스기준
				var totalLength = _thisP.find('.info.title').length,
					finishLength = _thisP.find('.info.finish').length,
					recentLength = _thisP.find('.info.recent').length,
					nocalcLength = _thisP.find('.no_calc').length;
				var guidePageNum = $('.depth.guide').find('.page').length;


				// 전체기준
				if( _this.attr('data-pageNum') == 'totalPage' ){
					var nocalcLength = ia.find('.no_calc').length;
					var totalLength = ia.find('.info.title').length,
						finishLength = ia.find('.info.finish').length,
						recentLength = ia.find('.info.recent').length;
				};

				// 퍼센테이지모드
				if( o.pageCalc.percentGage == true || o.pageCalc.percentGage == undefined){
					ia.addClass('mode_gage');

					var pagePercent = Math.floor( ((finishLength + recentLength) / (totalLength - nocalcLength)) * 100 );

					_this.append('<div class="gauge_wrap"><div class="gaugebar"></div></div>');

					var gaugeBar = _this.find('.gaugebar');
					gaugeBar.css({ 'width': pagePercent + '%' });
				};

				var pagenumHtml =  '<div class="page_num_wrap">'
					pagenumHtml +=		'<span class="page_num">'
					pagenumHtml += 			'(<span class="finish_num">'+ (finishLength + recentLength) +'</span>'
					pagenumHtml += 			'/'
					pagenumHtml += 			'<span class="total_num">'+ (totalLength - nocalcLength) +'</span>)</span>'
				if ( o.pageCalc.percentGage == true ) pagenumHtml += '<span class="percent">'+ pagePercent + '%</span>'
					pagenumHtml += '</div>';

				// if ( o.pageCalc.percentGage == true ){
				// 	_thisP.children('.title').prepend('<span class="percent">'+ pagePercent + '%</span>')
				// }


				// 가이드페이지 진척률에 추가
				if( o.pageCalc.addGuideNum == false ){
					if( _this.parents('.depth').hasClass('guide') == false ){
						_this.append(pagenumHtml);	
					}
				}else{
					_this.append(pagenumHtml);	
				};

			});
		};

		pageCalc(totalPageNum);
		pageCalc('.depth > .title');
	};


	// 뎁스네비게이션
	if( o.depthNavi == true ){
		if( $('body').find('.navi_wrap').length > 0 ){
			var categoryList =  [];
			var categoryListBgClass =  [];
			depthCategory.each(function(){
				var _this = $(this),
					categoryTitleText = _this.children('.title').html(),
					categoryTitleClass = _this.children('.title').attr('class');

				var categoryTitleBgClassIndexOf = categoryTitleClass.indexOf(''),
					categoryTitleBgClassLastIndexOf = categoryTitleClass.lastIndexOf(''),
					categoryTitleBgClass = categoryTitleClass.substr(categoryTitleBgClassIndexOf,categoryTitleBgClassLastIndexOf);

				categoryListBgClass.push(categoryTitleBgClass);
				categoryList.push(categoryTitleText);

			});

			var containerScr = function(){
				
				var scrTop = $('.container').scrollTop() + 3
				var activeNavBtn = $('.navi_wrap .category_list.active')
				if( $('.navi_wrap .category_list').last().hasClass('active') == false ){
					if( scrTop >= $('.depth.category > .title').eq(activeNavBtn.index() + 1).position().top ){
						activeNavBtn.next().addClass('active').siblings().removeClass('active')
					}
				};
				if( scrTop <= $('.depth.category > .title').eq(activeNavBtn.index()).position().top ){
					activeNavBtn.prev().addClass('active').siblings().removeClass('active')
				};
			}

			$('.navi_wrap').append('<div class="navi_list"></div>')
			
			for ( var i = 0; i < $('.depth.category').length; i++ ){
				var naviListHtml = '<button type="button" class="btn category_list '+ categoryListBgClass[i]+'">' + categoryList[i] + '</button>';
				
				$('.navi_wrap .navi_list').append(naviListHtml);
				$('.navi_wrap').find('.dir').remove()
				$('.navi_wrap').find('.category_list').first().addClass('active')
			};

			

			// $('.category_list').find('.gauge_wrap').remove();
			$(document).on('click', '.category_list', function(){
				$('.container').off('scroll',containerScr)

				var _this = $(this),
					_thisIdx = _this.index();
				var scrT = $('.depth.category > .title').eq(_thisIdx).position().top - 3;
				$('.container').scrollTop(scrT)
				setTimeout(function(){
					_this.addClass('active').siblings().removeClass('active')
					$('.container').on('scroll',containerScr);
				})
			});

			$('.container').on('scroll',containerScr);

		};
		
	}else if( o.depthNavi == false ){
		$('.navi_wrap').hide();
	};


	
	
};

/* 새탭열기 이벤트 */
$(document).on('click', '.new_window', function(){
	var new_href = $(this).parent().find('a.info.title').attr('href')
	
	window.open(new_href, '', '_blank');// 새창
	
});

// 새창열기
$(document).on('dblclick', '.info.title', function(){
	window.open($(this).attr('href'),'_blank');// 새창
})


/* ia메뉴 아코디언 */
var iaMenuCtrl = function(){
	var depthTitle = $('.depth').children('.title'),
		pageTitle = $('.info.title');

	

	depthTitle.each(function(){
		if( $(this).next().css('display') != 'none' ){
			$(this).next().addClass('open');
		}
	})

	// ia메뉴 열고닫기
	var menuCtrl = function(){
		var _this = $(this),
			conts = $(this).next();
		var thisHasOn = conts.hasClass('open');
		var speed = 200;

		if( thisHasOn == true ){ //열기
			// conts.removeClass('open').hide();
			conts.removeClass('open').css({'display':'none'});
			
			// if( conts.closest('.depth').hasClass('last') == true ){
			// 	conts.prev().css({ 'width' : '100%' });
			// 	conts.prev().find('.gauge_wrap').css({ 'width' : '100%' });
			// };
		}else{ //닫기
			conts.addClass('open').show();
			

			// if( conts.closest('.depth').hasClass('last') == true ){
			// 	conts.prev().css({ 'width' : '30%' });
			// 	conts.prev().find('.gauge_wrap').css({ 'width' : '30%' });
			// }else{
			// }
		};
	};

	// 클릭한 페이지 표시
	var nowPage = function(){
		var wrap = $('.ia')
		wrap.find('.page').removeClass('active');
		$(this).closest('.page').addClass('active');
	};

	depthTitle.unbind('click',menuCtrl).bind('click',menuCtrl); // 메뉴열고닫기- 뎁스
	pageTitle.unbind('click',nowPage).bind('click',nowPage); // 클릭한 페이지 표시
};


/* 상단고정리모콘 - ia메뉴 전체열고닫기 */
var iaMenuAll = function(){
	var btn = $('.btn_ia_ctrl');
	btn.parent('.btn_wrap_iactrl').addClass('all_open');

	// btn.click(function(){
	// 	var _this = $(this),
	// 		btnWrap = _this.parent('.btn_wrap_iactrl'),
	// 		lastDep = $('.depth').find('.split');


	// 	if( btnWrap.hasClass('all_open') == true ){
			
	// 		if( _this.hasClass('ia_close') == true ){
	// 			btnWrap.removeClass('all_open');

	// 			btnWrap.addClass('last_hide');
	// 			lastDep.find('.conts').removeClass('open').hide();
	// 		}

	// 	}else if( btnWrap.hasClass('last_hide') == true ){
			
	// 		if( _this.hasClass('ia_close') == true ){
	// 			btnWrap.removeClass('last_hide');

	// 			btnWrap.addClass('last_p_hide');
	// 			lastDep.parent().parent('.depth').find('.conts').removeClass('open').hide()

	// 		}else if( _this.hasClass('ia_open') == true ){
	// 			btnWrap.removeClass('last_hide');
				
	// 			btnWrap.addClass('all_open');
	// 			$('.ia').find('.conts').addClass('open').show();
	// 		}

	// 	}else if( btnWrap.hasClass('last_p_hide') == true ){
			
	// 		if( _this.hasClass('ia_close') == true ){
	// 			btnWrap.removeClass('last_p_hide');

	// 			btnWrap.addClass('last_p_p_hide');
	// 			lastDep.parent().parent('.depth').parent().parent('.depth').find('.conts').removeClass('open').hide()

	// 		}else if( _this.hasClass('ia_open') == true ){
	// 			btnWrap.removeClass('last_p_hide');
				
	// 			btnWrap.addClass('last_hide');
	// 			lastDep.parent().parent('.depth').children('.conts').addClass('open').show()
	// 		}

	// 	}else if( btnWrap.hasClass('last_p_p_hide') == true ){


	// 		if( _this.hasClass('ia_close') == true ){
	// 			btnWrap.removeClass('last_p_p_hide');

	// 			btnWrap.addClass('last_p_p_p_hide');
	// 			lastDep.parent().parent('.depth').parent().parent('.depth').parent().parent('.depth').find('.conts').removeClass('open').hide()

	// 		}else if( _this.hasClass('ia_open') == true ){
	// 			btnWrap.removeClass('last_p_p_hide');
				
	// 			btnWrap.addClass('last_p_hide');
	// 			lastDep.parent().parent('.depth').parent().parent('.depth').children('.conts').addClass('open').show()
	// 		}
			
			

	// 	}else if( btnWrap.hasClass('last_p_p_p_hide') == true ){

	// 		if( _this.hasClass('ia_open') == true ){
	// 			btnWrap.removeClass('last_p_p_p_hide');
				
	// 			btnWrap.addClass('last_p_p_hide');
	// 			lastDep.parent().parent('.depth').parent().parent('.depth').parent().parent('.depth').children('.conts').addClass('open').show()
	// 		}
	// 	}

	// 	$(window).trigger('resize')
	// });

	btn.click(function(){
		var _this = $(this),
			btnWrap = _this.parent('.btn_wrap_iactrl'),
			// lastDep = $('.depth').find('.split');
			lastDep = $('.depth').find('.last_depth');


		if( btnWrap.hasClass('all_open') == true ){
			
			if( _this.hasClass('ia_close') == true ){
				btnWrap.removeClass('all_open');

				btnWrap.addClass('last_hide');
				lastDep.find('.conts').removeClass('open').hide();
			}

		}else if( btnWrap.hasClass('last_hide') == true ){
			
			if( _this.hasClass('ia_close') == true ){
				btnWrap.removeClass('last_hide');

				btnWrap.addClass('last_p_hide');
				lastDep.parent().parent('.depth').find('.conts').removeClass('open').hide()

			}else if( _this.hasClass('ia_open') == true ){
				btnWrap.removeClass('last_hide');
				
				btnWrap.addClass('all_open');
				$('.ia').find('.conts').addClass('open').show();
			}

		}else if( btnWrap.hasClass('last_p_hide') == true ){
			
			if( _this.hasClass('ia_close') == true ){
				btnWrap.removeClass('last_p_hide');

				btnWrap.addClass('last_p_p_hide');
				lastDep.parent().parent('.depth').parent().parent('.depth').find('.conts').removeClass('open').hide()

			}else if( _this.hasClass('ia_open') == true ){
				btnWrap.removeClass('last_p_hide');
				
				btnWrap.addClass('last_hide');
				lastDep.parent().parent('.depth').children('.conts').addClass('open').show()
			}

		}else if( btnWrap.hasClass('last_p_p_hide') == true ){


			if( _this.hasClass('ia_close') == true ){
				btnWrap.removeClass('last_p_p_hide');

				btnWrap.addClass('last_p_p_p_hide');
				lastDep.parent().parent('.depth').parent().parent('.depth').parent().parent('.depth').find('.conts').removeClass('open').hide()

			}else if( _this.hasClass('ia_open') == true ){
				btnWrap.removeClass('last_p_p_hide');
				
				btnWrap.addClass('last_p_hide');
				lastDep.parent().parent('.depth').parent().parent('.depth').children('.conts').addClass('open').show()
			}
			
			

		}else if( btnWrap.hasClass('last_p_p_p_hide') == true ){

			if( _this.hasClass('ia_open') == true ){
				btnWrap.removeClass('last_p_p_p_hide');
				
				btnWrap.addClass('last_p_p_hide');
				lastDep.parent().parent('.depth').parent().parent('.depth').parent().parent('.depth').children('.conts').addClass('open').show()
			}
		}

		$(window).trigger('resize')
	});
};

/* 상단고정리모콘 - ia목록 새로고침 */
var listRefresh = function(){
	var btnRefresh = $('.btn.refresh');

	// # ia목록 reload
	var reload = function(){
		window.location.reload();
		$(window).scrollTop(0);
	};

	btnRefresh.unbind('click',reload).bind('click',reload); // ia목록 새로고침
};


/* 상단고정리모콘 - 페이지 부가정보 더 보기 */
$(document).on('click', '.more_info', function(){
	var _this = $(this),
		ia = $('.ia');

	if( _this.hasClass('active') == true ){
		_this.removeClass('active');
		ia.find('.row:first-child').show().siblings().hide();

	}else{
		_this.addClass('active')
		ia.find('.row').show();
	};

	if( ia.find('.page.active').length > 0 ){
		setTimeout(function(){
			var activePagePos = $('.page.active').position().top;
		},50);
	};
	
});


$(document).on('click','.check_modify, .modify_wrap', function(){
	var _this = $(this),
		page = _this.closest('.page');

	var allModifyRow = $('.ia').find('.row_modify'),
		allModifyWrap = $('.ia').find('.modify_wrap');

	if( _this.parents('.page').length > 0  ){
		if( page.hasClass('modi_show') == true ){
			// _this.removeClass('active');
			// page.find('.row_modify').hide();
			page.removeClass('modi_show')
		}else{
			// _this.addClass('active')
			// page.find('.row_modify').show();
			page.addClass('modi_show')
		};
	}else if( _this.parents('.remote_wrap').length > 0 ){
		if( _this.hasClass('active') == true ){
			_this.removeClass('active');
			allModifyWrap.removeClass('active');
			allModifyRow.hide();
		}else{
			_this.addClass('active');
			allModifyWrap.addClass('active');
			allModifyRow.show();
		};
	};
});


$(document).on('click', '.header_ctrl', function(){
	$(this).toggleClass('active')
	$('.info_area').toggleClass('compress');
	// $('.container').css({ 'padding-top' :  $('.header').outerHeight(true) });
});

$(document).on('click', '.navi_ctrl', function(){
	$(this).toggleClass('active')
	// $('.navi_area').toggleClass('fold');
	// $('.container').css({ 'padding-top' :  $('.header').outerHeight(true) });
});

$(document).on('mouseenter','.navi_area',function(){
	$('.navi_area').addClass('view');
	// $('.container').css({ 'padding-top' :  $('.header').outerHeight(true) });
})
$(document).on('mouseleave','.info_area',function(){
	// $('.navi_area').removeClass('view');
	// $('.container').css({ 'padding-top' :  $('.header').outerHeight(true) });
	if( $('.navi_area .btn.navi_ctrl').hasClass('.active') == true ){
		// $('.container').css({ 'padding-top' :  $('.header').outerHeight(true) });
	}else{
		setTimeout(function(){
			// $('.container').css({ 'padding-top' :  $('.header').outerHeight(true) });
		},10)
	}
})


	
/********************************************************************************************************
   20191002 클립보드 저장 - 윤종규 temp
*********************************************************************************************************/
/*----------------------------------------
 # 저장 프로세스
-----------------------------------------*/
$(document).on('click', '.btn_txt_copy', function(e){
	var _this = $(this);

	if( _this.parent().find('.info.file').length > 0 ){
		// 텍스트 & 페이크 인풋
		var	_thisText = _this.closest('.page').find('.info.title').attr('href'),
			_fakeInput = "<input class='fake_input' type='text' value=''>";
			
		$('body').prepend(_fakeInput);

		$('.fake_input').css({'position': 'fixed', 'top' : -100, 'left': 0}).val(_thisText);
		$('.fake_input').select();	

		document.execCommand("copy");

		$('.fake_input').remove();

		//안내문
		var infoText = "<div class='info_text'>파일 경로 복사</div>"

		$('body').append(infoText);
		$('.info_text').css({'top': e.pageY - 5, 'left': e.pageX + 15})
		setTimeout(function(){
			$('.info_text').remove();
		},300)
	}


	if( _this.parent().find('.info.title').length > 0 ){
		// 텍스트 & 페이크 인풋
		var dep1title = _this.closest('.depth.depth01').children('.title').html()
		var dep2title = _this.closest('.depth.depth02').children('.title').html()
		var dep3title = _this.closest('.depth.depth03').children('.title').html()
		var dep4title = _this.closest('.depth.depth04').children('.title').html()

		if( dep1title != undefined ){
			var dep1title_txt = dep1title.substr(0,dep1title.indexOf('<')) + ' > '
		}else{
			var dep1title_txt = ''
		}
		if( dep2title != undefined ){
			var dep2title_txt = dep2title.substr(0,dep2title.indexOf('<')) + ' > '
		}else{
			var dep2title_txt = ''
		}
		if( dep3title != undefined ){
			var dep3title_txt = dep3title.substr(0,dep3title.indexOf('<')) + ' > '
		}else{
			var dep3title_txt = ''
		}
		if( dep4title != undefined ){
			var dep4title_txt = dep4title.substr(0,dep4title.indexOf('<')) + ' > '
		}else{
			var dep4title_txt = ''
		}
	
		var	_thisText = _this.parent().find('.info.title').text(),
		_fakeInput = "<input class='fake_input' type='text' value=''>";
			
		var pageDir = dep1title_txt + dep2title_txt + dep3title_txt + dep4title_txt + _thisText
			
		$('body').prepend(_fakeInput);

		$('.fake_input').css({'position': 'fixed', 'top' : -100, 'left': 0}).val(pageDir);
		$('.fake_input').select();	

		document.execCommand("copy");

		$('.fake_input').remove();

		//안내문
		var infoText = "<div class='info_text'>화면 경로 복사</div>"

		$('body').append(infoText);
		$('.info_text').css({'top': e.pageY - 5, 'left': e.pageX + 15})
		setTimeout(function(){
			$('.info_text').remove();
		},300)
	}
	_this.on('click', function(e){

	})	

})


$(document).on('click', '.info.file', function(e){
	var _this = $(this);

	if( _this.parent().find('.info.file').length > 0 ){
		// 텍스트 & 페이크 인풋
		// 20220517 파일명만 갖고오기 // knh
		var textArry = _this.text().split('/');
		var	_thisText = textArry[textArry.length -1],
			_fakeInput = "<input class='fake_input' type='text' value=''>";
		
		$('body').prepend(_fakeInput);

		$('.fake_input').css({'position': 'fixed', 'top' : -100, 'left': 0}).val(_thisText);
		$('.fake_input').select();	

		document.execCommand("copy");

		$('.fake_input').remove();

		//안내문
		var infoText = "<div class='info_text'>파일명 복사</div>"

		$('body').append(infoText);
		$('.info_text').css({'top': e.pageY - 5, 'left': e.pageX + 15})
		setTimeout(function(){
			$('.info_text').remove();
		},300)
	}

})


// 20220518 sortdate 추가 // knh
var sortDate= function(){
	var $release = $('.select_date.release select'),
		$modify = $('.select_date.modify select'),
		$releaseDate = $('.info.date'),
		$modifyDate = $('.row_modify .modify');

	var regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
	var relArry = [];
	var modiArry = [];	

	// var console = window.console || { log:function(){} };

	function sortFunc(a, b){
		var dA = new Date(a).getTime()
		var dB = new Date(b).getTime()
		return dA < dB ? 1: -1
	};	
	
	$releaseDate.each(function(){		
		if ( regex.test($(this).text()) ){	
			$(this).attr('data-date',$(this).text())
			$(this).addClass('rel')		
			relArry.push($(this).text())
		}			
	});	

	$modifyDate.each(function(){
		var date = $(this).text().split('|')[0].replace(/(\s*)/g, "");		
		
		if ( regex.test(date) ){
			$(this).attr('data-date',date)
			$(this).closest('.page').find('.info.date').addClass('modi')
			modiArry.push(date)			
		}
	});	

	relArry.sort(sortFunc);
	modiArry.sort(sortFunc);

	var relSortArry = [];
	var modSortArry = [];	

	// 옵션 넣기 - 배포 날짜
	$.each(relArry, function(key, value){ 
		if($.inArray(value, relSortArry) === -1) relSortArry.push(value); 
	});

	for ( var i in relSortArry ){
		var result = relSortArry[i];
		
		$option = $('<option>',{
			text: result,
			value: result
		}).appendTo($release);
	};		

	// 옵션 넣기 - 수정 날짜
	$.each(modiArry, function(key, value){ 
		if($.inArray(value, modSortArry) === -1) modSortArry.push(value); 
	});	

	for ( var j in modSortArry ){
		var result = modSortArry[j];
		
		$option = $('<option>',{
			text: result,
			value: result
		}).appendTo($modify);
	};
	
	
};

// 20220518 sortSelect 추가 // knh
var sortSelect = function(target){
	var val = $(target).val();
	var $page = $('.page'),
		$pageP = $page.parent(),
		$relDate = $('.info.date'),
		$modiDate = $('.row_modify .modify');

	if ( $(target).parent().hasClass('release') ){	

		if ( val == 'alldateview' ){
			$pageP.removeClass('hide').addClass('show')
			$page.removeClass('hide show modi_show')

			$('.select_val span').text(($('.info.date').length - $('.info.date.no_calc').length) +'건')

		} else {	
			$page.removeClass('show modi_show').addClass('hide')			
			$relDate.each(function(){
				var date = $(this).attr('data-date');
				
				if ( date == val ){					
					$(this).closest('.page').removeClass('hide').addClass('show');					
				} 
			})

			$('.select_val span').text($('.page.show').length +'건')

			console.log($('.page.show').length)
		}
		
	} else if ( $(target).parent().hasClass('modify') ){
		if ( val == 'alldateview' ){
			$pageP.removeClass('hide').addClass('show')
			$page.removeClass('hide show modi_show')			

			$('.select_val span').text(($('.info.date').length - $('.info.date.no_calc').length) +'건')
		} else {
			$page.removeClass('show modi_show').addClass('hide')

			$modiDate.each(function(){
				var date = $(this).attr('data-date');
				
				if ( date == val ){					
					$(this).closest('.page').removeClass('hide').addClass('show modi_show');				
				} 
			})

			$('.select_val span').text($('.page.show').length +'건')
		}	
	}
}

$(document).on('change','.select_date select',function(){
	sortSelect($(this))	
})


// 20220520 수정 로그 관련 추가 // knh
var modifyLog = (function(){
	function modifyLog(arry){	
		arry.forEach(function(x){			
			var $pageTitle = $('.page').find('.info.title[href="'+x.href+'"]');			

			modifyLog.prototype.append($pageTitle,x.href,x.date,x.log)		
			
		});		
	}

	modifyLog.prototype = {
		append: function(target,href,date,log){
			var $target = $(target);	
			var $page = $target.closest('.page');			
			
			var modifyHtml = '<div class="modify_wrap">'
					modifyHtml += '<div class="modify" title="수정건"> 수정 : <span></span></div>'
				modifyHtml += '</div>'
			
			if ( !$page.find('.row_modify').length > 0 ){
				$rowModi = $('<div>',{
					class: 'row row_modify'
				}).appendTo($page)
			}
			
			if ( !$page.find('.modify_wrap').length > 0 ){
				$page.children('.row').find('.info.id').after(modifyHtml);
			}

			$modi = $('<div>',{
				class: 'modify',
				'data-date': date,
				'data-href': href,
				text: date +' | '+ log,

			}).appendTo($page.find('.row_modify'))
			
			
			$page.find('.modify_wrap .modify span').text($page.find('.row_modify .modify').length);	
		},		
		
	}

	return modifyLog
})();

// 20220520 수정 로그 관련 추가 // knh
function sortModiDate(){				
	var $rowModi = $('.page .row_modify');
	var $modi = $rowModi.find('.modify');
	var arry = [];	
	
	for ( var i = 0; i < $modi.length; i++){
		var obj = { date: $modi.eq(i).attr('data-date'), href: $modi.eq(i).attr('data-href'), text: $modi.eq(i).text() }	
		
		arry.push(obj)			
	}

	function compareDate( a, b ){
		if ( a.date > b.date){
			return -1;
		}
		if ( a.date < b.date){
			return 1;
		}
		return 0;
	}	
	
	arry.sort(compareDate);
	
	$modi.remove();

	for ( var j = 0; j < arry.length; j++){		
		var $pageTitle = $('.page .info.title[href="'+arry[j].href+'"]');	
		
		newModiCopy($pageTitle,arry[j].href,arry[j].date,arry[j].text);		
	}	
}

function newModiCopy(target,href,date,text){
	var $target = $(target);	
	var $page = $target.closest('.page');	

	$modi = $('<div>',{
		class: 'modify',
		'data-date': date,
		'data-href': href,
		text: text,

	}).appendTo($page.find('.row_modify'))
}

$(window).on('load',function(){
	setTimeout(function(){
		sortDate()
		sortModiDate()
	},100)
})


// 20220523 검색기능 추가 // knh
function searchFilter(){
	var $page = $('.ia .page');	

	var value = $('.search_page input').val().toUpperCase(),
		sort = $('.search_sort select').val();	

	if ( sort == 'all' ){
		var option = '*';
	}else if ( sort == 'page' ){
		var option = '.info.title';
	}else if ( sort == 'file' ){
		var option = '.info.file';
	}

	for ( var i = 0; i< $page.length; i++){	
		var $option = $page.eq(i).find(option);

		if ( $option.text().toUpperCase().indexOf(value) > -1 ){			
			$page.eq(i).removeClass('hide').addClass('show')
		}else {			
			$page.eq(i).removeClass('show').addClass('hide')
		}
	}	

	$('.search_val span').text($('.page.show').length +'건')
}

$(document).on('click','.search_page button',function(){	
	searchFilter()
})



