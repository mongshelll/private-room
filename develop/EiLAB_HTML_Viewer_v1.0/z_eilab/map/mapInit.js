var mapCreator = (function(){
	return {
		init: function(){
			// 순서 변경 금지
			mapCreator.header(); // 헤더 영역 생성
			mapCreator.list(); // map list 생성
			mapCreator.button(); // 카테고리 버튼 생성
			mapCreator.path(); // path 생성
			mapCreator.calc(); // 진척률 계산
			mapCreator.write(); // 수정이력, 화면 공지사항
			mapCreator.tag(); // 태그
			mapCreator.search(); // 검색 기능 사용 시
			mapCreator.pubNotice(); // 퍼블리싱 공지사항
		},
/*----------------------------------------
	@ 헤더 영역 생성
----------------------------------------*/
		header: function(){
			$('.header .info').append(`
				<div class="release">
					<dl class="date"><dt>배포일</dt><dd></dd></dl>
					<dl class="ver"><dt>리소스 버전</dt><dd></dd></dl>
					<dl class="new"><dt>신규</dt><dd></dd></dl>
					<dl class="edit"><dt>수정</dt><dd></dd></dl>
					<button type="button" class="view-calc-btn" title="진척률 보기"></button>
					<button type="button" class="active-page-btn" title="활성화페이지 이동"></button>
					<button type="button" class="reduce-map-btn" title="맵 간단히 보기"></button>
				</div>
			`);
			$('.header > .inner').append(
				'<div class="row btns"></div>'
			);
			$('.header > .inner').append(
				'<div class="row func"></div>'
			);
		},
/*----------------------------------------
	@ map list 생성
----------------------------------------*/
		list: function(){
			if ( release.writers != null ){
				for ( var a0 = 0; a0 < $('.page').length; a0++ ){
					var page = $('.page').eq(a0);
					var file = page.find('>.row.file em span');
					var fileid = null;
					var pageInfo = [];
									
					if ( file.text().includes('/') ){
						var arr = file.text().split('/');
						fileid = arr[arr.length-1];
					} else {
						fileid = file.text();
					}
					page.data('id', fileid);
					page.attr('data-id', fileid);
	
					if ( page.children().length == 2 ){
						page.append('<ul class="row-modify init"></ul><ul class="row-notice init"></ul>')
					} else if ( page.children().hasClass('page') ){
						page.prepend('<div class="tmp temp1"></div><div class="tmp temp2"></div><ul class="row-modify init"></ul><ul class="row-notice init"></ul>')
						page.find('>.temp1').append( page.find('>.row.name') );
						page.find('>.temp2').append( page.find('>.row.file') );
					}
				}
				$('.tmp > .row').unwrap();
			}
			/*
				1. depth와 page를 기준으로 section 생성
			*/
			var sectionHtml = `
				<div class="section">
					<div class="pages"></div>
				</div>
			`;
			for ( var a = 0; a < $('.depth').length; a++ ){
				var dep = $('.depth').eq(a);

				// 뎁스안에 페이지만 있을때
				if ( dep.find('>.depth').length == 0 && dep.find('>.section').length == 0 && dep.find('>.page').length != 0 ){
					dep.prepend( sectionHtml );
					dep.find('>.section > .pages').append( dep.find('>.page') )
				} 
				// 뎁스안에 뎁스만 있을 때
				else if ( dep.find('>.depth').length != 0 && dep.find('>.section').length == 0 && dep.find('>.page').length == 0 ) {
					//
				} 
				// 뎁스안에 페이지와 뎁스 모두 있을 때
				else if ( dep.find('>.depth').length != 0 && dep.find('>.section').length == 0 && dep.find('>.page').length != 0 ){

					// 기초 섹션 만들기 - area라는 임시의 랩핑태그로 요소 묶어줌
					dep.prepend('<div class="area"></div>');
					if ( dep.find('>.depth').next().hasClass('page') ){
						dep.find('>.depth').next().wrap('<div class="area"></div>');
					}

					for ( var a1 = 0; a1 < dep.find('>.area').length; a1++ ){
						dep.find('>.area').eq(a1).append(
							dep.find('>.area').eq(a1).nextUntil('.depth')
						)
					}
				}
			}

			/*
				2. area를 section화
			*/
			for ( var b = 0; b < $('.area').length; b++ ){
				var area = $('.area').eq(b);

				if ( area.find('>*').length == area.find('>.page').length ){
					area.prepend( sectionHtml );
					area.find('>.section >.pages').append( area.find('>.page') );
				}
			}
			 /*
				3. area 제거
			*/
			$('.area > .section').unwrap();
			$('.area >.depth').unwrap();

			/*
				4. depth title 생성
			*/
			var wrapHtml = `<div class="wrap">
								<div class="title-calc">
									<div class="title"></div>
								</div>
							</div>`;
			for ( var ia = 0; ia < $('.category').length; ia++ ){
				var category = $('.category').eq(ia);
				// 4-1. 카테고리용 큰 타이틀 생성
				category.prepend(`
					<div class="big-title">
						<div class="title-calc">
							<div class="title"></div>
						</div>
					</div>
				`);
				category.find('.big-title .title-calc .title').append( category.find('>.depth').attr('data-depth') );

				// 4-2. 1뎁스 안의 뎁스명을 모두 찾음
				for ( var ib = 0; ib < category.find('.depth').length; ib++ ){
					var d = category.find('.depth').eq(ib);

					// 4-3. 타이틀 영역 생성(.wrap)
					if ( d.children().hasClass('section') ){ // section이 있으면
						d.find('>.section').prepend( wrapHtml );
						if ( d.children().length > 1 && d.children().eq(0).hasClass('section') ){
							// depth의 직속 자식의 수량이 1 이상이고 직속 자식의 첫번째가 section일 때
							// -> depth 구분용(=.just-depth) wrap 생성
							d.prepend( d.children().eq(0).find('>.wrap').clone() );
							d.children().eq(0).addClass('just-depth');
						}
					} else { // section이 없으면
						d.prepend( wrapHtml );
					} 
				}

				// 4-4. 생성한 .title을 기준
				for ( var ic = 0; ic < category.find('.title').length; ic++ ){
					var title = category.find('.title').eq(ic);

					// 4-5. .title에 뎁스별로 타이틀을 찾아서 밀어넣음
					for ( var l = 0; l < title.parents('.depth').length; l++ ){
						title.prepend(
							'<p>'+title.parents('.depth').eq(l).attr('data-depth')+'</p>'
						)
					}
				}

				// 4-6. .category을 제외한 나머지 depth에서 직속 자식 중 불필요한 title을 제거
				for ( var id = 0; id < category.find('.depth').length; id++ ){
					var depth = category.find('.depth').eq(id);

					for ( var ie = 0; ie < depth.children().length; ie++ ){
						if ( !depth.find('>.section').length && !depth.find('>.pages').length ){
							depth.find('>.wrap').addClass('just-depth')
						}
					}
				}
			}

			/*
				5. 링크 랩핑
			*/
			$('.page').each(function(){
				// 레이아웃을 위한 랩핑
				var name = $(this).find('>.name a').text();
				$(this).find('>.name a').wrap('<div class="link"></div>');
				$(this).find('>.name a').text('');
				$(this).find('>.name a').append('<span class="page-name">'+name+'</span>');
				if ( $(this).find('>*').hasClass('page') ){
					$(this).find('>.page').addClass('case');
				}
			})

			/*
				6. state 랩핑
			*/
			$('.state').wrap('<div class="state-wrap"></div>');

			/*
				7. 불필요한 wrap 영역 정리
			*/
			for ( var d = 0; d < $('.map .title-calc .title').length; d++ ){
				var title = $('.map .title-calc .title').eq(d);

				if ( title.children('p').length == 1 ){
					if ( title.closest('.wrap').next().hasClass('depth') ){
						title.closest('.wrap').remove();
					}
					if ( title.closest('.section').find('>.pages').children().length == 0 ){
						title.closest('.section').remove();
					}
					if ( title.closest('.depth').children().eq(0).hasClass('wrap') && title.closest('.depth').children().eq(1).hasClass('depth') ){
						title.closest('.depth').children().eq(0).remove();
					}
				}
			}
		},
/*----------------------------------------
	@ 카테고리 버튼 생성
----------------------------------------*/
		button: function(){
			for ( var i = 0; i < $('.category').length; i++ ){
				var category = $('.category').eq(i);

				$('.btns').append(
					'<button type="button" class="category-btn"><span class="text">'+category.find('.big-title').text()+'</span></button>'
				)
			}
		},
/*----------------------------------------
	@ path 생성
----------------------------------------*/
		path: function(){
			/*
				1. 경로 생성
			*/
			for ( var ia = 0; ia < $('.depth').length; ia++ ){
				var depth = $('.depth').eq(ia);

				if ( depth.attr('data-dir') ){
					depth.find('.wrap').append('<div class="path">'+depth.attr('data-dir')+'</div>');
				}
			}

			for ( var ib = 0; ib < $('.wrap').length; ib++ ){
				$('.wrap').find('.path:not(:last-child)').remove();
			}

			$('.just-depth .path').remove();

			/*
				2. 생성된 경로를 a에 밀어넣음
			*/

			for ( var ic = 0; ic < $('.page').length; ic++ ){
				var page = $('.page').eq(ic);
				var path = page.closest('.section').find('> .wrap .path');
				var a = page.find('> .name a');
				var em = page.find('> .file em');

				if ( page.find('.file').text().includes('/') ){
					a.attr({
						'href': ''+ em.text() +'',
						'target': 'frameView',
					})
					a.closest('.page').addClass('no-calc relative');
				} else {
					a.attr({
						'href': ''+ path.text() +'/' + ''+ em.text() +'',
						'target': 'frameView',
					})
				}
			}
		},
/*----------------------------------------
	@ 진척률 계산
----------------------------------------*/
		calc: function(){
			/*
				0. 진척률 계산 기준 세팅
			*/
			var length = {
				all : 0,
				now : 0,
				com : 0,
				not : 0,
			}
			var nowSum = 0;
			var allSum = 0;

			/*
				1. 진척률 계산 span 만들기
			*/
			function makeCalc(_common, _target, _idx){
				length.all = _common.eq(_idx).find('.page').length;
				length.now = _common.eq(_idx).find('.release-now').length;
				length.com = _common.eq(_idx).find('.release-completed').length;
				length.not = _common.eq(_idx).find('.no-calc').length;

				nowSum = Number(length.now + length.com);
				allSum = Number(length.all - length.not);

				var calculate = Math.floor( (nowSum/allSum)*100 );

				if ( allSum == 0 ){
					allSum = length.all;

					var html  = '<span class="calc">';
						html += '<span class="length">';
						html += '<span class="all-sum">'+allSum+''
						html += '</span>';
						html += '</span>';
						html += '<span class="per">-</span>';
						html += '</span>';

					_target.eq(_idx).append(html);
				} else {
					var html  = '<span class="calc">';
						html += '<span class="length">';
						html += '<span class="now-sum">'+nowSum+'/'
						html += '</span>';
						html += '<span class="all-sum">'+allSum+''
						html += '</span>';
						html += '</span>';
						html += '<span class="per">'+calculate+'';
						html += '%</span>';
						html += '</span>';

					_target.eq(_idx).append(html);
				}
			}

			/*
				2. 입력한 진척률에 따라 페이지 상태 변경
			*/
			for ( var j = 0; j < $('.page').length; j++ ){
				var page = $('.page').eq(j);
				var state = $('.page').eq(j).find('> .row.name .state').text();

				if ( state == release.date ){
					if ( !page.hasClass('no-calc') ){
						page.addClass('release-now');
					}
				} else {
					if ( state.match('[0-9]{4}([\-/\.])[0-9]{2}[\-/\.][0-9]{2}') ){
						if ( state < release.date && !page.hasClass('no-calc') ){
							page.addClass('release-completed');
						} 
					}
					for ( var k = 0; k < keywords.noCalc.length; k++ ){
						if ( state == keywords.noCalc[k] ){
							page.addClass('no-calc');
						}
					}
				}

				// 페이지 삭제
				if( page.hasClass('delete') ) {
					page.removeClass('release-now release-completed');
					page.addClass('no-calc');

					// 분기페이지
					page.find('.page').removeClass('release-now release-completed');
					page.find('.page').addClass('delete');
					page.find('.page').addClass('no-calc');
				}
			}
			/*
				3. 상단 버튼에 진척률 삽입 - 전체
			*/
			makeCalc( $('body'), $('.link-btn.project-name'), 0);

			/*
				4. 카테고리별 진척률
			*/
			for ( var i = 0; i < $('.category').length; i++ ){
				makeCalc( $('.category'), $('.category-btn'), i);
				makeCalc( $('.category'), $('.big-title .title-calc'), i);
			}

			/*
				5. section 별로 진척률 삽입
			*/
			for ( var j = 0; j < $('.section').length; j++ ){
				makeCalc($('.section') , $('.wrap:not(.just-depth) .title-calc'), j);
			}

			for ( var k = 0; k < $('.just-depth').length; k++ ){
				makeCalc( $('.just-depth').closest('.depth') , $('.just-depth .title-calc'), k);
			}

		},
/*----------------------------------------
	@ 수정이력, 화면 공지사항
----------------------------------------*/
		write: function(){
			if ( release.writers != null || release.writers != undefined ){
				var modiArr = [];
				/*
					1. modify
				*/
				for ( var z = 0; z < $('.page').length; z++ ){
					// 1-1. modify 전체 모아서 배열에 넣기
					var page = $('.page').eq(z);
					modiArr.push([]);
					for ( var a = 0; a < release.writers.length; a++ ){
						var getModifies = window['write'+a];
						var modify = getModifies.modify;

						if ( modify.length != 0 ){
							for ( var a1 = 0; a1 < modify.length; a1++ ){
								if ( modify[a1].id == page.data('id') && !page.hasClass('relative') ){
									for ( var a2 = 0; a2 < modify[a1].el.length; a2++ ){
										modify[a1].el[a2].id = modify[a1].id;
										modify[a1].el[a2].writer = getModifies.writer;
										modiArr[z].push( modify[a1].el[a2] );
									}
								}
							}
						}
					}
					// 1-2. 배열 순서 정렬
					for ( var b = 0; b < modiArr[z].length; b++ ){
						modiArr[z].sort(function(n1, n2){
							return n1.date < n2.date ? -1 : n1.date > n2.date ? 1 : 0;
						})
					}
					// 1-3. 수정내역 li로 append
					for ( var c = 0; c < modiArr[z].length; c++ ){
						page.find('>.row-modify').removeClass('init');
						page.find('>.row-modify').append(
							'<li data-date="'+modiArr[z][c].date+'">'+modiArr[z][c].date+'&nbsp;:&nbsp;<span class="text"><span title="'+modiArr[z][c].writer+'">'+modiArr[z][c].text+'</span></span></li>'
						);
					}
				}
				// 1-4. 동일 날짜 정리
				for ( var d = 0; d < $('.row-modify').length; d++ ){
					var modify = $('.row-modify').eq(d);
					for ( var d1 = 0; d1 < modify.children().length; d1++ ){
						var li = modify.children().eq(d1);
						var date =  li.text().replaceAll(/ /g, '').replaceAll(/	/g, '').slice(0,10);

						if ( modify.find('[data-date="'+date+'"]').length > 1 ){
							modify.find('[data-date="'+date+'"]').eq(0).find('>.text').append(
								modify.find('[data-date="'+date+'"]').find('>.text span')
							);
						}
					}
				}
				// 1-5. 1-4에서 정리한 빈 li 삭제
				for ( var f = 0; f < $('.row-modify > li').length; f++ ){
					var li = $('.row-modify > li').eq(f);
					if ( li.find('>.text').children().length == 0 ){
						li.addClass('empty');
					}
				}
				$('li.empty').remove();

				/*
					2. notice
				*/
				var notiArr = [];
				for ( var x = 0; x < $('.page').length; x++ ){
					// 2-1. notice 전체 모아서 배열에 넣기
					var page = $('.page').eq(x);
					notiArr.push([]);
					for ( var a = 0; a < release.writers.length; a++ ){
						var getNotices = window['write'+a];
						var notice = getNotices.notice;

						if ( notice.length != 0 ){
							for ( var a1 = 0; a1 < notice.length; a1++ ){
								if ( notice[a1].id == page.data('id') && !page.hasClass('relative') ){
									for ( var a2 = 0; a2 < notice[a1].el.length; a2++ ){
										notice[a1].el[a2].id = notice[a1].id;
										notice[a1].el[a2].writer = getNotices.writer;
										notiArr[x].push( notice[a1].el[a2] );
									}
								}
							}
						}
					}
					for ( var c = 0; c < notiArr[x].length; c++ ){
						page.find('>.row-notice').removeClass('init');
						page.find('>.row-notice').append(
							'<li title="'+notiArr[x][c].writer+'">'+notiArr[x][c].text+'</li>'
						);
					}
				}
			}
			/*
				3. 빈 modify, notice 정리
			*/
			$('.row-modify.init').remove();
			$('.row-notice.init').remove();

			/*
				4. modify 기본 세팅
			*/
			for ( var i = 0; i < $('.page').length; i++ ){
				var page = $('.page').eq(i);
				var modify = page.find('>.row-modify');

				if ( modify.children().length != 0 ){
					// modify 갯수 세기
					page.find('>.row.file').append(
						'<div class="modi-len"><button type="button">수정 <span>'+modify.children().length+'</span>건</button></div>'
					);
					// modify 기본으로 접어두기
					page.addClass('fold-modify');
				}
			}
		},
/*----------------------------------------
	@ 태그
----------------------------------------*/
		tag: function(){
			$('.page').find('.name .link a').prepend('<span class="taglist"></span>');

			var tagMake = function(_this, _tagclass, _tagname){
				_this.find('.taglist').append('<span class="tag '+ _tagclass +'">'+ _tagname +'</span>');
			}
			$('.page').each(function(){
				for ( var i = 0; i < keywords.tags.length; i++ ){
					if( $(this).hasClass(''+keywords.tags[i].class+'') ){
						tagMake($(this), ''+keywords.tags[i].class+'', ''+keywords.tags[i].name+'');
					}
				}
			});
			// 분기화면 태그 커스텀
			$('.page.case[data-tag="custom"]').each(function(){
				$(this).find('.taglist').empty();
				for ( var i = 0; i < keywords.tags.length; i++ ){
					if( $(this).hasClass(''+keywords.tags[i].class+'') ){
						tagMake($(this), ''+keywords.tags[i].class+'', ''+keywords.tags[i].name+'');
					}
				}
			});
		},
/*----------------------------------------
	@ 검색 대상 설정 - 검색 기능 활성 시 사용
----------------------------------------*/
		search: function(){
			$('.tag').addClass('search-target'); // 태그명
			$('.page-name').addClass('search-target'); // 화면명
			$('em > span').addClass('search-target'); // 파일명
			$('.title > p').addClass('search-target'); // 경로명
		},
/*----------------------------------------
	@ 퍼블리싱 공지사항
----------------------------------------*/
		pubNotice: function(){
			if ( release.ver != null ) {
				$('.pub-notice').prepend('<div class="title"><span class="date">'+release.date+'</span> 버전(리소스 버전 <span class="ver">'+release.ver+'</span>) 퍼블리싱 전달사항</div>');
			} else {
				$('.pub-notice').prepend('<div class="title"><span class="date">'+release.date+'</span> 퍼블리싱 전달사항</div>');
			}
		}
	}
})();


/*
	0. 레이아웃 배치에 필요한 값 영역 세팅
*/
var h = 0;
var wrap = {
	startOffset : [],
	endOffset : [],
	height: [],
}
var cate = {
	startOffset : [],
	endOffset : [],
}
var page = {
	startOffset : [],
}
var mapScroll = {
	now : 0,
	last : 0,
	lastOfNow : 0,
	direction : null,
}
var mapLayout = (function(){
	return {
		/*
			1. 레이아웃 init
		*/
		load: function(){
			$('body').prepend('<div class="clone"></div>');
			if (/Mobi|Android/i.test(navigator.userAgent)) {
				$('html').addClass('mo');
				$('html').css('height', $(window).outerHeight() );
			}
			// 순서 변경금지
			mapLayout.header();
			mapLayout.clone();
			mapLayout.offset();
		},
		header: function(){
			// 헤더 세팅용
			h = $('.header').outerHeight();
			$('.map').css('height', $(window).outerHeight() - $('.header').outerHeight() - 1)
			$('.clone').css('top', $('.header').outerHeight() );
		},
		clone: function(){
			$('.clone').empty();
			$('.clone').append($('.depth:not(.hide) >.section .wrap:not(.just-depth)').clone())
		},
		offset: function(){
			cate.startOffset = [];
			cate.endOffset = [];
			page.startOffset = [];
			page.endOffset = [];
			wrap.startOffset = [];
			wrap.endOffset = [];
			wrap.height = [];
			mapScroll.now = $('.map').scrollTop();

			// 스크롤 시 필요한 값 배열에 넣기
			for ( var a = 0; a < $('.category:not(.hide)').length; a++ ){
				cate.startOffset.push(
					Math.floor( $('.category:not(.hide)').eq(a).offset().top - h + mapScroll.now )
				)
				cate.endOffset.push(
					Math.floor( $('.category:not(.hide)').eq(a).offset().top + $('.category:not(.hide)').eq(a).outerHeight() - h + mapScroll.now )
				)
			}

			for ( var b = 0; b < $('.page').length; b++ ) {
				page.startOffset.push(
					Math.floor( $('.page').eq(b).offset().top - h + mapScroll.now )
				);
			}

			for ( var i = 0; i < $('.depth:not(.hide) >.section').length; i++ ){
				var section = $('.depth:not(.hide) >.section');
				var height = ( section.eq(i).hasClass('fold') ) ? section.find('>.wrap').outerHeight() : 0;
				wrap.height.push(
					Math.floor( height )
				)
				wrap.startOffset.push(
					Math.floor( section.eq(i).offset().top - h + mapScroll.now )
				);
				wrap.endOffset.push(
					Math.floor(
						section.eq(i).offset().top - h + section.find('>.pages').eq(i).outerHeight() - wrap.height[i] + mapScroll.now
					)
				);
			}

		},
		init: function(){
			mapLayout.header();
			mapLayout.clone();
			mapLayout.offset();
			mapLayout.scroll();
		},
		/*
			2. 스크롤 이벤트
		*/
		scroll: function(){
			mapScroll.now = $('.map').scrollTop();
			mapScroll.direction = mapScroll.now > mapScroll.nowOfLast ? 'down' : 'up';
			mapScroll.nowOfLast = mapScroll.now;

			// 뎁스
			for ( var i = 0; i < $('.map .wrap:not(.just-depth)').length; i++ ){
				var fixed = $('.clone').find('.wrap').eq(i);
				var section =  $('.depth:not(.hide) >.section').eq(i);
				var pages = section.find('.pages');
				var wrapH = section.find('.wrap').outerHeight();

				// 스크롤 내릴 때
				if ( mapScroll.direction == 'down' ){
					if ( mapScroll.now >= wrap.startOffset[i] ){
						$('.clone').find('.wrap').removeClass('active');
						fixed.addClass('active')
					}
					if ( mapScroll.now >= wrap.endOffset[i] ){
						pages.css('padding-top', wrapH )
						section.addClass('fold');
						fixed.removeClass('active');
					}
				} else {
					// 스크롤 올릴 때
					if ( mapScroll.now < wrap.endOffset[i] ){
						pages.css('padding-top', 0 )
						section.removeClass('fold');
						fixed.addClass('active');
					}
					if ( mapScroll.now < wrap.startOffset[i] ){
						fixed.removeClass('active');
					}
				}
			}

			// 카테고리 버튼
			for ( var a = 0; a < $('.category').length; a++ ){
				// 스크롤 내릴 때
				if ( mapScroll.direction == 'down' ){
					if ( mapScroll.now >= cate.startOffset[a] ){
						$('.category-btn').removeClass('active');
						$('.category-btn').eq(a).addClass('active');
					}
					if ( mapScroll.now >= cate.endOffset[a] ){
						$('.category-btn').eq(a).removeClass('active');
					}
				} else {
					// 스크롤 올릴 때
					if ( mapScroll.now < cate.endOffset[a] ){
						$('.category-btn').eq(a).addClass('active');
					}
					if ( mapScroll.now < cate.startOffset[a] ){
						$('.category-btn').eq(a).removeClass('active');
					}
				}
			}
		},
	}
})()


// 뷰어 리사이즈 대응
$(window).on('resize', function(){
	if ( this.resizeTO ){  clearTimeout(this.resizeTO) }
	this.resizeTO = setTimeout(function(){ $(this).trigger('resizeEnd') },100);
})

$(window).on('resizeEnd', function(){
	mapLayout.init();
})

$(window).on('scroll', function(){
	$('.clone').css('margin-left', -($(window).scrollLeft()) - 2 )
	mapLayout.init();
})