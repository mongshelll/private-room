var mapFunc = (function(){
	return {
		init: function(){
			mapFunc.activePage();
			mapFunc.moveCategory();
			mapFunc.moveActivePage();
			mapFunc.modify();
			mapFunc.releaseCount();
			mapFunc.calc();
			mapFunc.filenameCopy();
			mapFunc.fileRootCopy();
			mapFunc.pagenameCopy();
			mapFunc.pageRootCopy();
			mapFunc.hrefPage();
			mapFunc.reduceMap();
		},
		activePage: function(){
			$(document).on('click', '.page >.row.name a', function(){
				$('.page').removeClass('active');
				$(this).closest('.page').addClass('active');
			})
		},
		moveCategory: function(){
			$(document).on('click', '.category-btn', function(e){
				$('.map').scrollTop( cate.startOffset[ $(this).index()] + 1 )
				mapLayout.scroll();
			})
		},
		moveActivePage : function() {
			$(document).on('click', '.active-page-btn', function() {
				for(var i = 0; i < $('.page').length; i++ ) {
					if( $('.page').eq(i).hasClass('active') ) {
						$('.map').scrollTop( page.startOffset[i] - $('.page').eq(i).closest('.section').find('.wrap').outerHeight() );
						mapLayout.scroll();
						break;
					}
				}
			})
		},
		modify: function(){
			// modify 이력 클래스 뿌리기
			for ( var i = 0; i < $('.row-modify > li').length; i++ ){
				var li = $('.row-modify > li').eq(i);
				var convertText = li.text().replaceAll(/ /g, '').replaceAll(/	/g, '').slice(0,10);
				if ( convertText == release.date ){
					li.closest('.page').addClass('modify-now');
					li.addClass('today');
				}
			}
			// modify 클릭 이벤트
			$(document).on('click', '.modi-len button', function(){
				modiFold( $(this) );
				mapLayout.init();
			})
			function modiFold(target){
				var page = $(target).closest('.page');
				if ( page.hasClass('fold-modify') ){ page.removeClass('fold-modify') }
				else { page.addClass('fold-modify') };
			}
		},
		releaseCount: function(){
			$('.release .date dd').text(''+ release.date +'');
			if ( release.ver == null ) {
				$('.release .ver').hide();
			} else {
				$('.release .ver dd').text(''+ release.ver +'');
			}
			$('.release .new dd').text(''+ $('.page.release-now').length +'');
			$('.release .edit dd').text(''+ $('.page.modify-now').length +'');
		},
		calc: function(){
			$(document).on('click', '.view-calc-btn', function(){
				if ( $(this).hasClass('on') ){
					$('.clone').removeClass('hide');
					$(this).removeClass('on');
					$('.category').removeClass('view-on');
				} else {
					$('.clone').addClass('hide');
					$(this).addClass('on');
					$('.category').addClass('view-on');
					$('.title-calc .calc').removeClass('hide');
				}
			})

			for ( var i = 0; i < $('.per').length; i++ ){
				if ( $('.per').eq(i).text() == '100%' ){
					$('.per').eq(i).closest('.calc').addClass('end');
				}
			}
		},
		filenameCopy: function(){
			$(document).on('click', '.file em span', function(e){
				$('body').prepend("<input class='fake-input' type='text' value=''>");

				$('.fake-input').val($(this).text());
				navigator.clipboard.writeText($('.fake-input').val());
				$('.fake-input').remove();

				// 안내문
				$('body').append("<div class='copy-info'>파일명 복사</div>");
				$('.copy-info').css({'top': e.pageY - 5, 'left': e.pageX + 15})
				setTimeout(function(){
					$('.copy-info').remove();
				},300)
			})
		},
		fileRootCopy : function() {
			$(document).on('contextmenu', '.file em span', function(e) {
				e.preventDefault();
				$('body').prepend("<input class='fake-input' type='text' value=''>");

				var $path = $(this).closest('.depth').find('> .section').length ? $(this).closest('.depth').find('> .section').find('.path') : $(this).closest('.depth').find('.path');

				if( $(this).closest('.file').data('connectdir') == true ) {
					var rootTxt = $(this).text();
				} else {
					var rootTxt = $path.text() + '/' + $(this).text();
				}

				$('.fake-input').val(rootTxt);
				navigator.clipboard.writeText($('.fake-input').val());
				$('.fake-input').remove();

				// 안내문
				$('body').append("<div class='copy-info'>파일경로 복사</div>");
				$('.copy-info').css({'top': e.pageY - 5, 'left': e.pageX + 15})
				setTimeout(function(){
					$('.copy-info').remove();
				},300)

				return false;
			});
		},
		pagenameCopy: function(){
			var enter = false;
			var end = false;

			$(document).on('keydown', 'body', function(key) {
				if( key.keyCode == 192 ) { // ~(물결)
					enter = true;
				}
			});

			$(document).on('keyup', 'body', function(key) {
				if( key.keyCode == 192 ) { // ~(물결)
					enter = false;
				}
			});

			$(document).on('mouseup', '.name .link a', function(e){
				end = true;

				if ( enter && end ){

					$('body').prepend("<input class='fake-input' type='text' value=''>");

					$('.fake-input').val($(this).find('.page-name').text());
					navigator.clipboard.writeText($('.fake-input').val());
					$('.fake-input').remove();

					// 안내문
					$('body').append("<div class='copy-info'>화면명 복사</div>");
					$('.copy-info').css({'top': e.pageY - 5, 'left': e.pageX + 15})
					setTimeout(function(){
						$('.copy-info').remove();
					},300)

				}
				enter = false;
				end = false;
			})
		},
		pageRootCopy : function() {
			$(document).on('contextmenu', '.name .link a', function(e) {
				e.preventDefault();
				$('body').prepend("<input class='fake-input' type='text' value=''>");

				var rootTxt = '';
				var $path = $(this).closest('.depth').find('> .section').length ? $(this).closest('.depth').find('> .section').find('.title-calc .search-target') : $(this).closest('.depth').find('.title-calc .search-target');

				for(var i = 0; i < $path.length; i++ ) {
					rootTxt += $path.eq(i).text() + ' > ';
				}
				rootTxt += $(this).find('.page-name').text();

				$('.fake-input').val(rootTxt);
				navigator.clipboard.writeText($('.fake-input').val());
				$('.fake-input').remove();

				// 안내문
				$('body').append("<div class='copy-info'>페이지경로 복사</div>");
				$('.copy-info').css({'top': e.pageY - 5, 'left': e.pageX + 15})
				setTimeout(function(){
					$('.copy-info').remove();
				},300);
				return false;
			});
		},
		hrefPage: function(){
			$(document).on('dblclick', '.name .link a', function(e){
				window.open($(this).attr('href'),'_blank'); // 새창열기
			})
		},
		reduceMap : function() {
			$(document).on('click', '.reduce-map-btn', function() {
				if( $(this).hasClass('on') ) {
					$(this).removeClass('on');
					$('.page').removeClass('reduce');
				} else {
					$(this).addClass('on');
					$('.page').addClass('reduce');
				}
				mapLayout.init();
			});
		},
	}
})();




$(window).on('load', function(){
	// 기능 호출
	search.init();
});


/*----------------------------------------
	검색
----------------------------------------*/
/* 함수 */
var search = (function(){
	return {
		init : function() {
			$('.header .row.func').append(`
				<div class="search-wrap">
					<div class="search-page">
						<div class="sort">
							<select title="검색조건">
								<option value="all">전체</option>
								<option value="page">화면명</option>
								<option value="file">파일명</option>
								<option value="root">경로명</option>
							</select>
						</div>
						<div class="search">
							<input type="text" placeholder="검색명" title="검색">
							<button type="button" class="btn-search" title="검색"></button>
						</div>
					</div>
					<div class="search-result">검색결과 : <span>-건</span></div>
				</div>
			`);
			mapLayout.header();
		},
		func : function() {
			var sort = $('.search-page select').val(),
				keyword = $('.search-page input').val().replace(/ /g, '').toLowerCase();

			if( keyword == '' ) location.reload();
			$('.page').removeClass('show hide');
			$('.title-calc').removeClass('show');

			// 검색조건
			if( sort == 'all' ) { // 전체
				var $target = $('.map .search-target');
			} else if ( sort == 'page' ) { // 화면명
				var $target = $('.map .name .search-target');
			} else if ( sort == 'file' ) { // 파일명
				var $target = $('.map .file .search-target');
			} else if ( sort == 'root' ) { // 경로명
				var $target = $('.map .title-calc .search-target');
			}

			// 검색찾기
			for( var i = 0; i < $target.length; i++ ) {
				var $this = $target.eq(i),
					$thisSec = $this.closest('.section'),
					$thisPage = $this.closest('.page');

				var val = $this.text().replace(/ /g, '').toLowerCase();

				if( val.indexOf(keyword) > -1 ) {
					if( $this.closest('.title-calc').length != 0 ) {
						$this.closest('.title-calc').addClass('show');
						$thisSec.find('.page').removeClass('hide').addClass('show');
						continue;
					}
					if( $thisPage.hasClass('show') ) continue;
					$thisPage.removeClass('hide').addClass('show');
				} else {
					if( $this.closest('.title-calc').length != 0 && !$this.closest('.title-calc').hasClass('show') ) {
						$thisSec.find('.page').removeClass('show').addClass('hide');
						continue;
					}
					if( $thisPage.hasClass('show') ) continue;
					$thisPage.removeClass('show').addClass('hide');
				}
			}

			// 검색결과
			if( $('.page.show').length == 0 ) {
				$('.search-result span').text( '0건' );
			} else {
				$('.search-result span').text( $('.page.show').length +'건' );
			}
			mapLayout.init();
		}
	}
})();

/* 이벤트 */
$(document).on('click', '.btn-search', function() {
	search.func();
});
$(document).on('keydown', '.search input', function(key) {
	if( key.keyCode == 13 ) { // 엔터
		search.func();
	}
});



$(window).on('load', function(){
	// 기능 호출
	selectSearch.init();
});



/** -------------------------------------------
	배포일, 수정일, 태그 검색
---------------------------------------------*/
/* 함수 */
var selectSearch = (function () {
	return {
		init: function () {
			selectSearch.activeSelect();
			/** -------------------------------------------
			 * addOption type
			 * addOption('배포일', '수정일', '태그');
			 * forward(오름차순), reverse(내림차순), custom(자율설정)
			 * 수정일, 태그는 cutsom 없음
			 * text미포함시 dataTextArraySort 주석처리
			---------------------------------------------*/
			selectSearch.addOption('custom', 'reverse', 'forward');
			mapLayout.header();
		},
		/* select 생성 */
		activeSelect: function () {
			$('.row.func').append(
				`<div class='remote-wrap'>
					<div class='sort-wrap'>
						<div class='select-page'>
							<div class='select-date release'>
								<select title='배포일'>
									<option selected disabled hidden>배포일</option>
									<option value='alldateview'>전체보기</option>
								</select>
							</div>
							<div class='select-date modify'>
								<select title='수정일'>
									<option selected disabled hidden>수정일</option>
									<option value='alldateview'>전체보기</option>
									<option value='allmodify'>전체 수정건</option>
								</select>
							</div>
							<div class='select-date tags'>
								<select title='태그명'>
									<option selected disabled hidden>태그명</option>
									<option value='alldateview'>전체보기</option>
								</select>
							</div>
						</div>
						<div class='select-result'>선택결과 : <span>-건</span></div>
					</div>
				</div>`
			);
		},
		/* select option 값 설정 */
		addOption: function(_relType, _modiType, _tagType){
			var $relSelect = $('.select-date.release select'),
				$modiSelect = $('.select-date.modify select');
				$tagSelect = $('.select-date.tags select');
			var $page = $('.page'),
				$relDate = $('.state'),
				$tagDate = $('.taglist > .tag'),
				$modiWrap = $('.row-modify');

			// 삭제페이지 구분용
			$page.each(function(){
				if(!$(this).hasClass('delete')) {
					$(this).find($modiWrap).addClass('on');
				}
			})
			// 삭제된 페이지 제외용
			var $modiList = $('.row-modify.on > li');

			var regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/); // 날짜형식 기준

			var relArray = [], // 배포일 배열
				modiArray = [], // 수정이력 배열
				dataTextArray = [] // 텍스트 배열
				tagArray = []; // 태그 배열

			var relSelectArray = [], // option에 배포 날짜, 텍스트 들어갈 값
				modiSelectArray = [], // option에 수정일 들어갈 값
				tagSelectArray = []; // option에 tag 들어갈 값

			/* 배포일 검색 */
			// 배포일 relArray에 저장
			// 텍스트형식 dataTextArray에 저장
			// 날짜와 텍스트의 정렬순서가 다른경우 대비하여 따로 배열에 넣음
			$relDate.each(function(){
				// 텍스트 미포함시 해당 if문 주석처리
				if ( regex.test($(this).text()) ){
					relArray.push($(this).text());
				} else {
					dataTextArray.push($(this).text());
				}

				// 텍스트 미포함시 사용 if문
				// if ( regex.test($(this).text()) ) relArray.push($(this).text());
			});

			if(_relType == 'forward') {
				var relArraySort = relArray.sort(function(_a, _b){
						return new Date(_a) - new Date(_b); //오름차순
					});

				var dataTextArraySort = dataTextArray.sort(function(_a, _b){
					return _a < _b ? -1 : _a > _b ? 1 : 0; // 오름차순
					});
			}

			if(_relType == 'reverse') {
				var relArraySort = relArray.sort(function(_a, _b){
						return new Date(_b) - new Date(_a); // 내림차순
					});

				var dataTextArraySort = dataTextArray.sort(function(_a, _b){
					return _a > _b ? -1 : a < b ? 1 : 0; // 내림차순
					});
			}

			if(_relType == 'custom') {
				// relArray 정렬 정의해서 relArraySort 저장
				var relArraySort = relArray.sort(function(_a, _b){
						// return new Date(_a) - new Date(_b); // 오름차순
						return new Date(_b) - new Date(_a); // 내림차순
					});

				// dataTextArraySort text정렬 정의해서 dataTextArraySort에 저장
				var dataTextArraySort = dataTextArray.sort(function(_a, _b){
					return _a < _b ? -1 : _a > _b ? 1 : 0; // 오름차순
					// return _a > _b ? -1 : _a < _b ? 1 : 0; // 내림차순
					});
			}

			// 날짜, text배열 합치기 (텍스트 미포함시 해당 영역 주석처리)
			Array.prototype.push.apply(relArraySort, dataTextArraySort);

			// 중복배열 관리
			$.each(relArraySort, function(_key, _value){
				if($.inArray(_value, relSelectArray) === -1) relSelectArray.push(_value);
			});

			// option 값 넣기
			for(var i = 0; i < relSelectArray.length; i++){
				var result = relSelectArray[i];
				$relSelect.append(
					$('<option>').text(result).attr({value: result})
				);
			}


			/* 수정이력 날짜 검색 */
			// 배포일 modiArray에 저장
			$modiList.each(function(){
				var modiDate = $(this).text().match('[0-9]{4}([\-/\.])[0-9]{2}[\-/\.][0-9]{2}');
				modiArray.push(modiDate[0]);
			});

			if(_modiType == 'forward') {
				// modiArray 정렬 정의해서 modiArraySort 저장
				var modiArraySort = modiArray.sort(function(_a, _b){
					return new Date(_a) - new Date(_b); // 오름차순으로 정렬
				});
			}

			if(_modiType == 'reverse') {
				var modiArraySort = modiArray.sort(function(_a, _b){
					return new Date(_b) - new Date(_a); // 내림차순으로 정렬
				});
			}

			// 중복배열 관리
			$.each(modiArraySort, function(_key, _value){
				if($.inArray(_value, modiSelectArray) === -1) modiSelectArray.push(_value);
			});

			// option 값 넣기
			for(var i = 0; i < modiSelectArray.length; i++){
				var result = modiSelectArray[i];
				$modiSelect.append(
					$('<option>').text(result).attr({value: result})
				);
			}


			/* 태그 검색 */
			// 배포일 modiArray에 저장
			$tagDate.each(function(){
				tagArray.push($(this).text());
			});

			// tagArray 정렬 정의해서 datatagArraySort 저장
			if(_tagType == 'forward') {
				var dataTagArraySort = tagArray.sort(function(_a, _b){
					return _a < _b ? -1 : _a > _b ? 1 : 0; //오름차순
				});
			}

			if(_tagType == 'reverse') {
				var dataTagArraySort = tagArray.sort(function(_a, _b){
					return _a > _b ? -1 : a < b ? 1 : 0; //내림차순
				});
			}

			// 중복배열 관리
			$.each(dataTagArraySort, function(_key, _value){
				if($.inArray(_value, tagSelectArray) === -1) tagSelectArray.push(_value);
			});

			// option 값 넣기
			for(var i = 0; i < tagSelectArray.length; i++){
				var result = tagSelectArray[i];
				$tagSelect.append(
					$('<option>').text(result).attr({value: result})
				);
			}
		},
		/* 배포일 검색 */
		relSelectSearch: function(_target){
			var val = $(_target).val();
			var $page = $('.page'),
				$depth = $('.depth'),
				$section = $('.section'),
				$relDate = $('.state'),
				$modiList = $('.row-modify > li'),
				$tagList = $('.taglist');

			// 수정일, 태그 검색 셀렉트 초기화
			$('.select-date.modify select option:eq(0)').prop('selected', true);
			$('.select-date.tags select option:eq(0)').prop('selected', true);

			// 수정이력 검색으로 해제시킨 fold-modify 재설정
			$('.modi-len').closest($page).addClass('fold-modify');

			// 검색함수로 추가된 class 초기화
			$depth.removeClass('hide');
			$section.removeClass('hide');
			$page.removeClass('hide show');
			$modiList.removeClass('show');
			$tagList.removeClass('show');

			// 전체보기
			if ( val == 'alldateview' ){
				// .calc 초기화
				$('.title-calc .calc').removeClass('hide');

				$('.select-result span').text('0건');

			// 각각 배포일
			} else {
				// .calc 숨김
				$('.title-calc .calc').addClass('hide');

				$depth.addClass('hide');
				$page.addClass('hide');

				$relDate.each(function(){
					var date = $(this).text();
					if ( val == date ) {
						$(this).parents($depth).removeClass('hide');
						$(this).closest($page).removeClass('hide').addClass('show');
					}
				});

				$('.select-result span').text(($('.page.show').length+'건'));
			}

			mapLayout.init();
		},
		/* 수정이력 날짜 검색 */
		modiSelectSearch: function(_target){
			var val = $(_target).val();
			var $page = $('.page'),
				$depth = $('.depth'),
				$section = $('.section'),
				$modiList = $('.row-modify > li'),
				$tagList = $('.taglist');

				$modiList.text().match('[0-9]{4}([\-/\.])[0-9]{2}[\-/\.][0-9]{2}');

			// 배포날짜, 태그 검색 셀렉트 초기화
			$('.select-date.release select option:eq(0)').prop('selected', true);
			$('.select-date.tags select option:eq(0)').prop('selected', true);

			// 검색함수로 추가된 class 초기화
			$depth.removeClass('hide');
			$section.removeClass('hide');
			$page.removeClass('hide show');
			$modiList.removeClass('show');
			$tagList.removeClass('show');

			// 전체보기
			if ( val == 'alldateview' ){
				// .calc 초기화
				$('.title-calc .calc').removeClass('hide');

				//수정이력 검색으로 해제시킨 fold-modify 재설정
				if( $page.find($('.modi-len')).length > 0 ) {
					$('.modi-len').closest($page).addClass('fold-modify');
				}
				$('.select-result span').text('0건');

			// 전체 수정건
			} else if ( val == 'allmodify' ){
				// .calc 숨김
				$('.title-calc .calc').addClass('hide');

				$page.each(function(){
					if($(this).find($('.row-modify > li')).length > 0) {
						$(this).closest($depth).removeClass('hide');
						$(this).addClass('show').removeClass('fold-modify');

						if($(this).hasClass('delete')) {
							$(this).addClass('hide').removeClass('show');
							$(this).find($modiList).removeClass('show');
						}
					} else {
						$(this).addClass('hide').removeClass('show');
					}
				})

				$section.each(function(){
					if(!$(this).find($page).hasClass('show')) {
						$(this).addClass('hide');
					}
				})

				$depth.each(function(){
					if($(this).find($page).hasClass('show')) {
						$(this).removeClass('hide');
					} else {
						$(this).addClass('hide');
					}
				})

				$('.select-result span').text(($('.page.show').find($modiList).length)+'건');

			// 각각 수정건
			} else {
				// .calc 숨김
				$('.title-calc .calc').addClass('hide');

				$depth.addClass('hide');
				$page.addClass('hide');
				$modiList.each(function(){
					var modiText = $(this).text(),
						date = modiText.match('[0-9]{4}([\-/\.])[0-9]{2}[\-/\.][0-9]{2}');
					if ( val == date[0] ){
						$(this).parents($depth).removeClass('hide');
						$(this).closest($page).removeClass('hide fold-modify').addClass('show');
						$(this).addClass('show');

						if( $(this).closest($page).hasClass('delete')) {
							$(this).removeClass('show');
						}
					}
				});

				$page.each(function(){
					if($(this).hasClass('delete')) {
						$(this).removeClass('show').addClass('hide');
					}
				})

				$section.each(function(){
					if(!$(this).find($page).hasClass('show')) {
						$(this).addClass('hide');
					}
				})

				$depth.each(function(){
					if($(this).find($page).hasClass('show')) {
						$(this).removeClass('hide');
					} else {
						$(this).addClass('hide');
					}
				})

				$('.select-result span').text(($('.row-modify > li.show').length+'건'));
			}

			mapLayout.init();
		},
		/* 태그 검색 */
		tagSelectSearch: function(_target){
			var val = $(_target).val();
			var $page = $('.page'),
				$depth = $('.depth'),
				$section = $('.section'),
				$modiList = $('.row-modify > li'),
				$tagList = $('.taglist'),
				$tagDate = $tagList.find('span');

			// .calc 초기화
			$('.title-calc .calc').removeClass('hide');

			// 배포날짜, 수정일 검색 셀렉트 초기화
			$('.select-date.release select option:eq(0)').prop('selected', true);
			$('.select-date.modify select option:eq(0)').prop('selected', true);

			// 수정이력 검색으로 해제시킨 fold-modify 재설정
			$('.modi-len').closest($page).addClass('fold-modify');

			// 검색함수로 추가된 class 초기화
			$depth.removeClass('hide');
			$section.removeClass('hide');
			$page.removeClass('hide show');
			$modiList.removeClass('show');
			$tagList.removeClass('show');

			// 전체보기
			if ( val == 'alldateview' ){
				$('.select-result span').text('0건');

			// 각각 태그
			} else {
				// .calc 숨김
				$('.title-calc .calc').addClass('hide');

				$depth.addClass('hide');
				$page.addClass('hide');
				$tagDate.each(function(){
					var date = $(this).text();
					if ( val == date ){
						$(this).parents($depth).removeClass('hide');
						$(this).closest($page).removeClass('hide');
						$(this).closest($tagList).addClass('show');
					}
				})
				$('.select-result span').text(($('.taglist.show').length+'건'));
			}

			mapLayout.init();
		}
	}
})();

/* 이벤트 */
$(document).on('change', '.select-date.release select', function(){
	selectSearch.relSelectSearch($(this)); // 릴리즈날짜
});

$(document).on('change', '.select-date.modify select', function(){
	selectSearch.modiSelectSearch($(this)); // 수정이력
});

$(document).on('change', '.select-date.tags select', function(){
	selectSearch.tagSelectSearch($(this)); // 태그검색
});



/** -------------------------------------------
	Map List 모션적용
---------------------------------------------*/
/* 함수 */
var scrollMove = (function(){
	return {
		motion : function(){
			var $map = document.querySelector('.map');
			var $category = $('.category'),
				$page = $('.page'),
				$modiList = $('.row-modify > li'),
				$tagList = $('.taglist');

			if( $page.hasClass('show') || $modiList.hasClass('show') || $tagList.hasClass('show')) {
				var activeList = $category.find('.show');
				var targetPos = activeList.closest($category)[0].offsetTop;

				$map.scrollTo({
					top: targetPos,
					behavior: "smooth"
				});
			} else {
				$map.scrollTo({
					top: 0,
					behavior: "smooth"
				});
			}
		}
	}
})()