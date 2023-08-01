/* v0.2 | 2022-10-14 */
/** -------------------------------------------
    대분류
---------------------------------------------*/
/* 소분류 */
// 기타설명


$(window).on('load', function(){
	stInput.init();
	stRange.singleSlider();
	stRange.doubleSlider();
	stDatepicker.init();
	stCustomSelect.init();
	stAccordion.init();
});

$(window).on('scroll', function() {
	stCustomSelect.close();
});



/** -------------------------------------------
	BodyScroll #바디스크롤
---------------------------------------------*/
var stBodyScroll = (function(){
	return {
		offScroll: function(){
			$('body').addClass('hidden');
		},
		onScroll: function(){
			$('body').removeClass('hidden');
		}
	}
})();



/** -------------------------------------------
    Input #인풋
---------------------------------------------*/
/* 함수 */
var stInput = (function(){
	var stInputIsClear = false; // 인풋clear 체크용

	return {
		init : function() {
			$('.se-textfield').each(function(){
				// value 확인
				if ( $(this).find('input').val().length > 0 ) {
					$(this).addClass('has-value');
				}

				// sp-formset-full 있는 경우 value 확인
				if ( $(this).closest('.sp-formset-full').length > 0 && $(this).closest('.sp-formset-full').find('input').val().length > 0 ) {
					$(this).closest('.sp-formset-full').addClass('has-value');
					$(this).removeClass('has-value')
				}
			})
		},
		focus : function(){
			stInputIsClear = true;
		},
		focusout : function(){
			stInputIsClear = false;
		},
		clear : function(_target){
			var $input = $(_target),
				$inputP = $input.closest('.se-textfield'),
				$inputClear = $inputP.find('.textfield-clear');

				$inputP.removeClass('clear'); // 활성화된 인풋만 문구삭제버튼 활성화

			if ( stInputIsClear == true ) {
				if ( $input.prop('readonly') || $input.prop('disabled') ) return;

				if ( $inputP.find('input').val().length > 0 && $inputClear.length > 0 ) { // 인풋에 값이 있고 문구삭제 버튼이 있을 때
					$inputP.addClass('clear')
				} else {
					$inputP.removeClass('clear')
				}

				// sp-formset-full 있는 경우 문구삭제버튼 활성화
				if ( $input.closest('.sp-formset-full').length > 0 && $inputP.find('input').val().length > 0 ) {
					$inputP.closest('.sp-formset-full').find('.se-textfield').addClass('clear');
				}
			} else {
				$inputP.removeClass('clear')
			}
		},
		value : function(_target){
			var $input = $(_target),
				$inputP = $input.closest('.se-textfield');

			if ( $input.val().length > 0 ) {
				$inputP.addClass('has-value');
			} else {
				$inputP.removeClass('has-value');
			}

			// sp-formset-full 있는 경우 value 확인
			if ( $input.closest('.sp-formset-full').length > 0 ) {
				var $inputs = $input.closest('.sp-formset-full').find('input');
				var num = 0;

				$inputs.each(function(){
					num += Number($(this).val().length)
				})

				if ( num > 0 ) {
					$input.closest('.sp-formset-full').addClass('has-value');
					$inputP.removeClass('has-value')
				} else {
					$input.closest('.sp-formset-full').removeClass('has-value');
					$inputP.removeClass('has-value')
				}
			}
		}
	}
})();

/* 이벤트 */
$(document).on('focus keyup', '.se-textfield input', function() {
	stInput.focus();
	stInput.clear($(this));
	stInput.value($(this));
});

$(document).on('click', '.se-textfield .textfield-clear', function() {
	// sp-formset-full 있는 경우
	if ( $(this).closest('.sp-formset-full').length > 0 ) {
		var inputnum = $(this).closest('.sp-formset-full').find('input').length;
		var clearnum = $(this).closest('.sp-formset-full').find('.textfield-clear').length;

		if ( inputnum > clearnum ) {
			$(this).closest('.sp-formset-full').find('input').val('');
			$(this).closest('.sp-formset-full').removeClass('has-value');
		}
	}

	$(this).closest('.se-textfield').find('input').val('');
	stInput.focusout();
	stInput.clear($(this));
	stInput.value($(this));
});

$(document).on('focusout','.se-textfield .textfield-clear', function(){
	stInput.focusout();
	stInput.clear($(this));
});

// 인풋이외 영역 클릭시 문구삭제 버튼 숨김
$(document).on('click', function(e){
	if ( e.target.nodeName.toLowerCase() != 'input' && !$(e.target).hasClass('textfield-clear') && !$(e.target).hasClass('se-textfield') ) {
		$('.se-textfield').removeClass('clear');
	}
});



/** -------------------------------------------
    range #슬라이더
---------------------------------------------*/
/* 함수 */
var stRange = (function(){
	return {
		singleSlider : function() { // single handle
			var range = document.querySelectorAll('.sp-range [data-handle="single"]');

			for ( var i = 0; i < range.length; i++ ) {
				noUiSlider.create( range[i], {
					connect: [true,false], // 핸들/슬라이더 사이의 막대제어
					behaviour: 'tap-drag', // 핸들인터렉션
					range: { // 범위
						'min': Number(range[i].getAttribute('data-min')),
						'max': Number(range[i].getAttribute('data-max'))
					},
					start: Number(range[i].getAttribute('data-start')), // 초기핸들 위치
					step: Number(range[i].getAttribute('data-step')) // 변경간격
				});

				// 이벤트
				range[i].noUiSlider.on('update', function(values) {
					if ( $(this.target).data('disabled') == true ) { // 비활성화
						$(this.target).closest('.sp-range').addClass('disabled');
						this.target.setAttribute('disabled', true);
					}
					$(this.target).closest('.sp-range').find('.max').text(stRange.numberWithCommas(values));
				});
				range[i].noUiSlider.on('change', function(values) {
					$(this.target).closest('.sp-range').find('.max').text(stRange.numberWithCommas(values));
				});
			}
		},
		doubleSlider : function() { // double handle
			var range = document.querySelectorAll('.sp-range [data-handle="double"]');

			for ( var i = 0; i < range.length; i++ ) {
				noUiSlider.create( range[i], {
					behaviour: 'tap-drag',
					connect: true,
					range: {
						'min': Number(range[i].getAttribute('data-min')),
						'max': Number(range[i].getAttribute('data-max'))
					},
					start: [Number(range[i].getAttribute('data-start-left')),Number(range[i].getAttribute('data-start-right'))],
					step: Number(range[i].getAttribute('data-step'))
				});

				// 이벤트
				range[i].noUiSlider.on('update', function(values) {
					if ( $(this.target).data('disabled') == true ) { // 비활성화
						$(this.target).closest('.sp-range').addClass('disabled');
						this.target.setAttribute('disabled', true);
					}
					$(this.target).closest('.sp-range').find('.min').text(stRange.numberWithCommas(values[0]));
					$(this.target).closest('.sp-range').find('.max').text(stRange.numberWithCommas(values[1]));
				});
				range[i].noUiSlider.on('change', function(values) {
					$(this.target).closest('.sp-range').find('.min').text(stRange.numberWithCommas(values[0]));
					$(this.target).closest('.sp-range').find('.max').text(stRange.numberWithCommas(values[1]));
				});
			}
		},
		singleSliderUpdate : function() { // single handle update
			var range = document.querySelectorAll('.sp-range [data-handle="single"]');

			for ( var i = 0; i < range.length; i++ ) {
				range[i].noUiSlider.updateOptions({
					connect: [true,false], // 핸들/슬라이더 사이의 막대제어
					behaviour: 'tap-drag', // 핸들인터렉션
					range: { // 범위
						'min': Number(range[i].getAttribute('data-min')),
						'max': Number(range[i].getAttribute('data-max'))
					},
					start: Number(range[i].getAttribute('data-start')), // 초기핸들 위치
					step: Number(range[i].getAttribute('data-step')), // 변경간격,
				});
			}
		},
		doubleSliderUpdate : function() { // double handle update
			var range = document.querySelectorAll('.sp-range [data-handle="double"]');

			for ( var i = 0; i < range.length; i++ ) {
				range[i].noUiSlider.updateOptions({
					behaviour: 'tap-drag',
					connect: true,
					range: {
						'min': Number(range[i].getAttribute('data-min')),
						'max': Number(range[i].getAttribute('data-max'))
					},
					start: [Number(range[i].getAttribute('data-start-left')),Number(range[i].getAttribute('data-start-right'))],
					step: Number(range[i].getAttribute('data-step'))
				});
			}
		},
		numberWithCommas : function( _n ) {
			var n = Math.floor(_n);
			return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	}
})();



/** -------------------------------------------
    Date Picker #데이트피커
---------------------------------------------*/
/* 함수 */
var stDatepicker = (function(){
	var cur = -1, prv = -1;
	var d1, d2;
	var start = '', end = '';

	return {
		init : function() {
			/* 날짜 선택 */
			var $datepicker = $('[data-datepicker="el"] input');

			$datepicker.each(function(){
				var $this = $(this);

				if ( $this.attr('readonly') || $this.attr('disabled') ) return;

				// option 설정
				var options = {
					dateFormat : 'yy-mm-dd', // 날짜 표시 형식
					showOtherMonths: true, // 다른 월 날짜 표시
					showMonthAfterYear: true, // 년도 먼저 표시
					yearSuffix: "년", // 달력의 년도 부분 뒤에 붙는 텍스트
					dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'], // 달력의 요일 텍스트
					monthNames : ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"], // 달력의 월 부분 텍스트
					monthNamesShort : ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"], // 달력의 월 부분 Tooltip 텍스트
					nextText: '다음 달', // next 링크에 표시할 텍스트
					prevText: '이전 달', // prev 링크에 표시할 텍스트
				}

				$this.datepicker(options)
			});

			/* 기간 선택 */
			var $rangepicker = $('[data-datepicker="range"] input');

			$rangepicker.each(function(){
				var $this = $(this);

				if ( $this.attr('readonly') || $this.attr('disabled') ) return;

				// option 설정
				var options = {
					dateFormat : 'yy-mm-dd', // 날짜 표시 형식
					showOtherMonths: true, // 다른 월 날짜 표시
					showMonthAfterYear: true, // 년도 먼저 표시
					yearSuffix: "년", // 달력의 년도 부분 뒤에 붙는 텍스트
					dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'], // 달력의 요일 텍스트
					monthNames : ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"], // 달력의 월 부분 텍스트
					monthNamesShort : ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"], // 달력의 월 부분 Tooltip 텍스트
					nextText: '다음 달', // next 링크에 표시할 텍스트
					prevText: '이전 달', // prev 링크에 표시할 텍스트
					beforeShowDay: function ( _date ) {
						start = d1;
						end = d2;

						if ( $this.datepicker('getDate') == null ) {
							return [true, ''];
						}
						if ( _date.getTime() == Math.max(prv, cur) ) {
							return [true, 'ui-state-range-from'];
						}
						if ( _date.getTime() == Math.min(prv, cur) ) {
							return [true, 'ui-state-range-to'];
						}
						if ( _date.getTime() > Math.min(prv, cur) && _date.getTime() < Math.max(prv, cur) ) {
							return [true, 'ui-state-range'];
						} else {
							return [true, ''];
						}
					},
					onSelect: function ( _dateText, _inst, el ) {
						prv = cur;
						cur = (new Date(_inst.selectedYear, _inst.selectedMonth, _inst.selectedDay)).getTime();
						if ( prv == -1 ) { // 한개 선택
							prv = cur;
							$this.val( _dateText );
							_inst.inline = true;
						} else { // 두개선택

							if ( d1 != '' && d1 != d2 ) { //기간 변경 시
								$(this).datepicker('setDate', $.datepicker.formatDate( 'yy-mm-dd', new Date(cur), {}));
								d1 = $.datepicker.formatDate( 'yy-mm-dd', new Date(cur), {} );
								d2 = $.datepicker.formatDate( 'yy-mm-dd', new Date(cur), {} );

								$this.val( d1 );
								_inst.inline = true;
							}
							else {
								d1 = $.datepicker.formatDate( 'yy-mm-dd', new Date(Math.min(prv,cur)), {} );
								d2 = $.datepicker.formatDate( 'yy-mm-dd', new Date(Math.max(prv,cur)), {} );

								$this.val( d1+' ~ '+d2 );
								_inst.inline = false;
							}
						}
					},
					onClose : function(_date, _inst) {
						_inst.inline = false;
					}
				}

				$this.datepicker(options)
			});

			// 이벤트
			$(document).on('focus','[data-datepicker="range"] input', function(e){
				var v = this.value,
					d;

				try {
					if ( v.indexOf(' ~ ') > -1 ) {
						d = v.split(' ~ ');

						prv = $.datepicker.parseDate( 'yy-mm-dd', d[0] ).getTime();
						cur = $.datepicker.parseDate( 'yy-mm-dd', d[1] ).getTime();

					} else if ( v.length > 0 ) {
						prv = cur = $.datepicker.parseDate( 'yy-mm-dd', v ).getTime();
					}
				} catch ( e ) {
					cur = prv = -1;
				}
			});
		},
	}
})();



/** -------------------------------------------
    Custom Select #커스텀셀렉트
---------------------------------------------*/
/* 함수 */
var stCustomSelect = (function(){
	return {
		init : function() {
			$('.se-custom-select').each(function(){
				var $thisSlt = $(this),
					$fakeBtn = $thisSlt.find('.btn-select'),
					$opts = $thisSlt.find('.select-options > li');

				for ( var i = 0; i < $opts.length; i++ ) {
					if ( $opts.eq(i).hasClass('selected') ) {
						$opts.eq(i).attr('aria-selected', true);
						$thisSlt.addClass('selected');
						$fakeBtn.text( $opts.eq(i).text() );
						break;
					}
				}
			});

			$('.modal-container').on('scroll',function() {
				stCustomSelect.close();
			})
		},
		toggle : function( _target ) {
			var $fakeBtn = $(_target),
				$thisSlt = $fakeBtn.closest('.se-custom-select');

			if ( $fakeBtn.hasClass('disabled') ) return;

			if ( $thisSlt.hasClass('active') ) { // 닫힘
				this.close();
			} else { // 열림
				this.open( $fakeBtn );
				this.posChk( $fakeBtn );
			}
		},
		open : function( _target ) {
			var $thisSlt = $(_target).closest('.se-custom-select');

			$('.se-custom-select').removeClass('active');
			$('.se-custom-select').find('.btn-select').attr('aria-expanded', false);

			$thisSlt.addClass('active');
			$thisSlt.find('.btn-select').attr('aria-expanded', true);
		},
		close : function() {
			var $activeSelect = $('.se-custom-select.on').find('.btn-select');

			$('.se-custom-select').removeClass('active');
			$('.se-custom-select').removeClass('fixed top');
			$('.se-custom-select').find('.btn-select').attr('aria-expanded', false);

			$activeSelect.focus();
		},
		closeAll : function() {
			$('.se-custom-select').removeClass('active');
			$('.se-custom-select').removeClass('fixed top');
			$('.se-custom-select').find('.btn-select').attr('aria-expanded', false);
		},
		change : function( _target ) {
			var $opt = $(_target),
				$thisSlt = $opt.closest('.se-custom-select');

			if ( $opt.hasClass('disabled') ) return;

			$thisSlt.addClass('selected');
			$thisSlt.find('.btn-select').text( $opt.text() );

			$thisSlt.find('.select-options > li').removeClass('selected');
			$thisSlt.find('.select-options > li').attr('aria-selected', false)
			$opt.attr('aria-selected', true)
			$opt.addClass('selected');

			this.close();
		},
		posChk : function( _target ) {
			var $fakeBtn = $(_target),
				$slt = $fakeBtn.closest('.se-custom-select'),
				$sltOpts = $slt.find('.select-options');

			var sltH = $sltOpts.outerHeight() + $slt.outerHeight(),
				optsH = $sltOpts.outerHeight(),
				space = 15; // 여유공간

			// 위치체크
			if ( $fakeBtn.closest('.modal-container').length ) { // modal
				var $modal = $fakeBtn.closest('.modal-layer'),
					$modalHeader = $modal.find('.modal-header'),
					$modalContainer = $modal.find('.modal-container');

				var sltT = $slt.offset().top - ($modal.offset().top + $modalHeader.outerHeight()),
					sltBottomH = $modalContainer.outerHeight() - sltT;

				if ( ( $modalContainer.outerHeight() <  sltH + space ) ) { // 팝업크기 작은경우
					$slt.addClass('fixed');

					if ( $fakeBtn.closest('.sl-modal.modal-bottom').length ) {
						$slt.addClass('top');
						var top = 'auto',
							bottom = $(window).height() - $slt.offset().top + 10;
					} else {
						var top =  $slt.offset().top+ $slt.outerHeight() + 10,
							bottom = 'auto';
					}
					$sltOpts.css({
						top: top,
						bottom: bottom,
						left: $slt.offset().left,
						width: $slt.outerWidth(),
					});
				} else {
					if ( sltBottomH <= optsH ) {
						$slt.addClass('top');
					} else {
						$slt.removeClass('top')
					}
				}
			} else { // container
				var $container = $fakeBtn.closest('.container'),
					containerH = $container.outerHeight(),
					sltT = $slt.offset().top;

				// 방향설정
				if ( containerH <= (sltT + sltH + space) ) { // top
					$slt.addClass('top')
				} else { // bottom(기본)
					$slt.removeClass('top');
				};
			};
		},
	}
})();

/* 이벤트 */
$(document).on('click', '.se-custom-select .btn-select', function() {
	stCustomSelect.toggle( $(this) )
});

$(document).on('click', '.se-custom-select .select-options li', function() {
	stCustomSelect.change( $(this) );
});

// 외부영역 클릭시
$(document).on('click', function(e){
	var $target = $('.se-custom-select');

	if ( !($target.has(e.target).length) ) {
		stCustomSelect.closeAll();
	}
});



/** -------------------------------------------
	Modal #모달
---------------------------------------------*/
/* 함수 */
var stModal = (function(){
	// 기본 z-index
	var modalZIndex = 2000,
		alertZindex = 3000;

	// 호출 이전 포커스
	var focusTarget = [];

	// 딤 적용 모달 체크
	var activeModal = [],
		activeAlert = [];

	// panning 이동거리 확인용
	var tsY,
		teY;

	return {
		common: {
			dimCtrl: function(){
				if ( activeAlert.length > 0 ) {
					// 전체 딤 제거
					// 얼럿배열[0]에 딤 적용
					for ( var i = 0; i < activeModal.length; i++ ) {
						activeModal[i].removeClass('dim');
					}
					for( var b = 0; b < activeAlert.length; b++ ) {
						activeAlert[b].removeClass('dim');
					}
					activeAlert[0].addClass('dim');
				} else {
					// 전체 딤제거
					// 얼럿 이외 모달배열[0]에 딤 적용
					for ( var i = 0; i < activeModal.length; i++ ) {
						activeModal[i].removeClass('dim');
					}

					if ( activeModal.length > 0 ) {
						activeModal[0].addClass('dim');
					}
				}
			},
			tabLoop: function(e){
				var keyCode = e.keyCode;
				if (keyCode === 9) { // 탭 키의 키 코드는 9입니다.
					var focusableElements = $(e.currentTarget).find(':focusable');
					var focusedIndex = focusableElements.index($(document.activeElement));
					var lastElementIndex = focusableElements.length - 1;

					if (e.shiftKey) { // Shift키와 함께 눌렸을 때, 역순으로 탐색
						if ( focusedIndex === 0 ) {
							focusableElements.eq(lastElementIndex).focus();
							e.preventDefault();
						}
					} else {
						if ( focusedIndex === lastElementIndex ) { // Shift키 없이 눌렸을 때, 순방향으로 탐색
							focusableElements.eq(0).focus();
							e.preventDefault();
						}
					}
				}
			},
			offFocusCtrl: function(){
				if ( activeModal.length > 0 ) {
					var nextFocusTarget = activeModal[0].find(':focusable');

					// 중복모달의 첫 번째 포커스 요소에 포커스
					nextFocusTarget[0].focus();

					// 중복모달 내에 이전에 닫힌 모달의 호출요소가 있다면 포커스 후 활성화 포커스 배열에서 제거
					if( activeModal[0].find(focusTarget[0]) ) {
						focusTarget[0].focus();
						focusTarget.shift();
					} else {
						// 기존 호출요소 없는경우 body가 추가되므로 배열내 추가된 body 제거
						focusTarget.shift();
					}
				} else {
					if ( focusTarget.length > 0 ) {
						// 호출 전 포커스요소 확인하여 포커스 유지
						focusTarget[0].focus();
						focusTarget.shift();
					}
				}
			}
		},
		default: {
			uiOn: function(_target){
				if ( $(_target).hasClass('active') || $(_target).length <= 0 ) return;
				if ( $(_target).attr('data-animation') == 'off' ) {
					$(_target).addClass('active');
				} else {
					$(_target).addClass('active');
					setTimeout(function(){
						$(_target).addClass('ani');
					});
				}

				// 바디스크롤 제어
				stBodyScroll.offScroll();

				/* stModal.common 관리 */
				// z-index 관리
				$(_target).css('z-index', modalZIndex++);

				// dim 관리
				// 활성화 모달 배열 앞에 넣기
				activeModal.unshift($(_target));

				// 배열 활용해서 dim 처리
				stModal.common.dimCtrl();

				// 포커스 관리
				// 호출시 이전 포커스 확인
				focusTarget.unshift(document.activeElement);

				setTimeout(function(){
					// 호출 후 첫 번째 포커스 확인
					var newfocus = $(_target).find(':focusable')[0];

					// 호출 후 포커스 이동
					newfocus.focus();
				});
			},
			uiOff: function(_target){
				var $thisModal = $(_target).closest('.sl-modal');

				if ( $thisModal.hasClass('modal-default') ) {
					/* animation option */
					// default
					if ( $thisModal.attr('data-animation') == 'off' ) {
						$thisModal.removeClass('active dim');
						// 바디스크롤 제어
						if ( $('body').find('.sl-modal.active').length == 0 ) stBodyScroll.onScroll();
					} else {
						// animation
						$thisModal.removeClass('ani');
						setTimeout(function(){
							$thisModal.removeClass('active dim');
							// 바디스크롤 제어
							if ( $('body').find('.sl-modal.active').length == 0 ) stBodyScroll.onScroll();
						}, 300); //.modal-layer의 transition-duration 만큼 값 넣어서 사용
					}
				}

				/* stModal.common 관리 */
				// z-index 관리
				$thisModal.css('z-index', '');
				modalZIndex--;

				// dim 관리
				// 닫히는 모달 배열에서 제거
				activeModal.shift();

				// 모든 딤 제거하고 활성화 되어 있는 모달 확인해서 딤 추가
				stModal.common.dimCtrl();

				// 포커스 관리
				// 모닫 off후 포커스 관리
				stModal.common.offFocusCtrl();
			}
		},
		full: {
			uiOn: function(_target){
				if ( $(_target).hasClass('active') || $(_target).length <= 0 ) return;
				$(_target).addClass('active');

				/* stModal.common 관리 */
				// z-index 관리
				$(_target).css('z-index', modalZIndex++);

				// 포커스 관리
				// 호출시 이전 포커스 확인
				focusTarget.unshift(document.activeElement);

				setTimeout(function(){
					// 호출 후 첫 번째 포커스 확인
					var newfocus = $(_target).find(':focusable')[0];

					// 호출 후 포커스 이동
					newfocus.focus();
				});
			},
			uiOff: function(_target){
				var $thisModal = $(_target).closest('.sl-modal');

				if ( $thisModal.hasClass('modal-full') ) {
					var $thisModal = $(_target).closest('.sl-modal.modal-full');
					$thisModal.removeClass('active');
				}

				/* stModal.common 관리 */
				// z-index 관리
				$thisModal.css('z-index', '');
				modalZIndex--;

				// 포커스 관리
				// 모닫 off후 포커스 관리
				stModal.common.offFocusCtrl();
			}
		},
		bottom: {
			uiOn: function(_target){
				var $thisModal = $(_target).closest('.sl-modal'),
					$modalLayer = $thisModal.find('.modal-layer');

				if ( $(_target).hasClass('active') || $(_target).length <= 0 ) return;
				if ( $(_target).attr('data-animation') == 'off' ) {
					$(_target).addClass('active');
					$modalLayer.css('bottom', -stModal.bottom.modalHeight(_target));
					setTimeout(function(){
						$modalLayer.css('bottom', 0);
					});
				} else {
					$(_target).addClass('active');
					$modalLayer.css('bottom', -stModal.bottom.modalHeight(_target));
					setTimeout(function(){
						$modalLayer.css('bottom', 0);
						$(_target).addClass('ani');
					});
				}

				// 바디스크롤 제어
				stBodyScroll.offScroll();

				/* stModal.common 관리 */
				// z-index 관리
				$(_target).css('z-index', modalZIndex++);

				// dim 관리
				// 활성화 모달 배열 앞에 넣기
				activeModal.unshift($(_target));

				// 배열 활용해서 dim 처리
				stModal.common.dimCtrl();

				// 포커스 관리
				// 호출시 이전 포커스 확인
				focusTarget.unshift(document.activeElement);

				setTimeout(function(){
					// 호출 후 첫 번째 포커스 확인
					var newfocus = $(_target).find(':focusable')[0];

					// 호출 후 포커스 이동
					newfocus.focus();
				});
			},
			uiOff: function(_target){
				var $thisModal = $(_target).closest('.sl-modal'),
					$modalLayer = $thisModal.find('.modal-layer');

				if ( $thisModal.hasClass('modal-bottom') ) {
					/* animation option */
					// default
					if ( $thisModal.attr('data-animation') == 'off' ) {
						$modalLayer.css('bottom', -stModal.bottom.modalHeight(_target));
						$thisModal.removeClass('active dim on');
						// 바디스크롤 제어
						if ( $('body').find('.sl-modal.active').length == 0 ) stBodyScroll.onScroll();
					} else {
						// animation
						$thisModal.removeClass('ani');
						$modalLayer.css('bottom', -stModal.bottom.modalHeight(_target));
						setTimeout(function(){
							$thisModal.removeClass('active dim on');
							// 바디스크롤 제어
							if ( $('body').find('.sl-modal.active').length == 0 ) stBodyScroll.onScroll();
						}, 300); //.modal-layer의 transition-duration 만큼 값 넣어서 사용
					}
				}

				/* stModal.common 관리 */
				// z-index 관리
				$thisModal.css('z-index', '');
				modalZIndex--;

				// dim 관리
				// 닫히는 모달 배열에서 제거
				activeModal.shift();

				// 모든 딤 제거하고 활성화 되어 있는 모달 확인해서 딤 추가
				stModal.common.dimCtrl();

				// 포커스 관리
				// 모닫 off후 포커스 관리
				stModal.common.offFocusCtrl();
			},
			panningStart: function(_event){
				tsY = _event.originalEvent.changedTouches[0].screenY;
			},
			panningEnd: function(_event){
				teY = _event.originalEvent.changedTouches[0].screenY;
				var movement = tsY - teY;
				if ( movement > 50 ) {
					$('body').find('.sl-modal.ty-panning').addClass('on');
				} else if ( movement < 0 ) {
					$('body').find('.sl-modal.ty-panning').removeClass('on');
				}
			},
			modalHeight: function(_target){
				/**
				 *  커스텀 셀렉트를 사용 할 경우 애니메이션을 transform으로 조절하면
					modal-layer에 있는 overflow: hidden; 으로 인해서
					모달 바깥 커스텀 셀렉트 영역이 안보이는 현상이 있음.
					그러므로 modla-bottom을 transition으로 이용해 조절하기 위해 필요한 함수
				 */
				var $thisModal = $(_target).closest('.sl-modal');
				var modalH = $thisModal.find('.modal-layer').outerHeight();

				return modalH;
			}
		},
		alert: {
			uiOn: function(_target){
				if ( $(_target).hasClass('active') || $(_target).length <= 0 ) return;

				if ( $(_target).attr('data-animation') == 'off' ) {
					$(_target).addClass('active');
				} else {
					$(_target).addClass('active');
					setTimeout(function(){
						$(_target).addClass('ani');
					});
				}

				// 바디스크롤 제어
				stBodyScroll.offScroll();

				/* stModal.common 관리 */
				// z-index 관리
				$(_target).css('z-index', alertZindex++);

				// dim 관리
				// 활성화 얼럿 배열 앞에 넣기
				activeAlert.unshift($(_target));

				// 배열 활용해서 dim 처리
				stModal.common.dimCtrl();

				// 포커스 관리
				// 호출시 이전 포커스 확인
				focusTarget.unshift(document.activeElement);

				setTimeout(function(){
					// 호출 후 첫 번째 포커스 확인
					var newfocus = $(_target).find(':focusable')[0];

					// 호출 후 포커스 이동
					newfocus.focus();
				});
			},
			uiOff: function(_target){
				var $thisModal = $(_target).closest('.sl-modal');

				if ( $thisModal.hasClass('modal-alert') ) {
					/* animation option */
					// default
					if ( $thisModal.attr('data-animation') == 'off' ) {
						$thisModal.removeClass('active dim');
						// 바디스크롤 제어
						if ( $('body').find('.sl-modal.active').length == 0 ) stBodyScroll.onScroll();
					} else {
						// animation
						$thisModal.removeClass('ani');
						setTimeout(function(){
							$thisModal.removeClass('active dim');
							// 바디스크롤 제어
							if ( $('body').find('.sl-modal.active').length == 0 ) stBodyScroll.onScroll();
						}, 300); //.modal-layer의 transition-duration 만큼 값 넣어서 사용
					}
				}

				/* stModal.common 관리 */
				// z-index 관리
				$thisModal.css('z-index', '');
				alertZindex--;

				// dim 관리
				// 닫히는 얼럿 배열에서 제거
				activeAlert.shift();

				// 모든 딤 제거하고 활성화 되어 있는 모달 확인해서 딤 추가
				stModal.common.dimCtrl();

				// 포커스 관리
				// 얼럿 off후 포커스 관리
				stModal.common.offFocusCtrl();
			}
		}
	}
})();

/* 이벤트 */
$(document).on('keydown', '.modal-wrap', function(e) {
	stModal.common.tabLoop(e);
});

// modal-bottom ty-panning
// 터치 방향 감지
$(document).on('touchstart', '.se-btn.btn-modal-panning', function(_event){
	stModal.bottom.panningStart(_event);
});

$(document).on('touchend', '.se-btn.btn-modal-panning', function(_event){
	stModal.bottom.panningEnd(_event);
});



/** -------------------------------------------
	Toast #토스트
---------------------------------------------*/
/* 함수 */
var stToast = (function() {
	return {
		uiOn: function(_target, _position){
			if ( $(_target).hasClass('active') || $(_target).length <= 0 ) return;
			$(_target).addClass('active').attr('data-position', _position);
			setTimeout(function(){
				$(_target).addClass('ani');
			});
			setTimeout(function(){
				stToast.autoOff(_target);
			}, 3000);
		},
		autoOff: function(_target){
			var $thisModal = $(_target);

			/* animation */
			$thisModal.removeClass('ani');
			setTimeout(function(){
				$thisModal.removeClass('active').removeAttr('data-position');
			}, 300); //.sp-toast의 transition-duration 만큼 값 넣어서 사용
		}
	}
})();



/** -------------------------------------------
	Snackbar #스낵바
---------------------------------------------*/
/* 함수 */
var stSnackbar = (function() {
	return {
		uiOn: function(_target, _position){
			if ( $(_target).hasClass('active') || $(_target).length <= 0 ) return;
			$(_target).addClass('active').attr('data-position', _position);
			setTimeout(function(){
				$(_target).addClass('ani');
			});
			setTimeout(function(){
				stSnackbar.autoOff(_target);
				isOn = true;
			}, 3000);
		},
		autoOff: function(_target){
			var $thisModal = $(_target);

			/* animation option */
			$thisModal.removeClass('ani');
			setTimeout(function(){
				$thisModal.removeClass('active').removeAttr('data-position');
			}, 300); //sp-snackbar transition-duration 만큼 값 넣어서 사용
		}
	}
})();



/** -------------------------------------------
    Tooltip #툴팁
---------------------------------------------*/
/* 함수 */
var stToolip = (function(){
	var closetime;

	return {
		open : function(_target){
			var $btn = $(_target),
				$tooltip = $btn.closest('.sp-tooltip'),
				$tooltipLayer = $tooltip.find('.tooltip-layer');

			var	layerTopSpace = 3; // 툴팁레이어 여유 top 값

			/* 툴팁레이어 노출 */
			if ( $tooltip.hasClass('active') ) {
				clearTimeout(closetime);
				$tooltip.removeClass('active');
				$btn.find('.hidden-txt').text('말풍선 열기');
				return;
			} else {
				$('.sp-tooltip').removeClass('active');
				$tooltip.addClass('active');
				$btn.find('.hidden-txt').text('말풍선 닫기');
				closetime =  setTimeout(function(){ // 3초 후 사라짐
					$tooltip.removeClass('active');
					$btn.find('.hidden-txt').text('말풍선 열기');
					clearTimeout(closetime);
				},3000)
			}

			if ( $btn.closest('.modal-container').length ) { // modal 안에 툴팁 있는 경우
				var $modal = $btn.closest('.modal-layer'),
					$modalHeader = $modal.find('.modal-header'),
					$modalContainer = $modal.find('.modal-container');

				var layoutSpace = 20; // modal container 기본 좌우 여백
				var layerW = $modalContainer.outerWidth() - layoutSpace*2;
				var layerL = $btn.offset().left - $modal.offset().left - layoutSpace;
				var tooltipTopH = $tooltip.offset().top - ($modal.offset().top + $modalHeader.outerHeight());
				var tooltipBottomH = $modalContainer.outerHeight() -tooltipTopH;
			} else { // container 안에 툴팁 있는 경우
				var layoutSpace = 25; // 레이아웃 기본 좌우 여백
				var layerW = $(window).outerWidth() - layoutSpace*2;
				var layerL = $btn.offset().left - layoutSpace;
				var tooltipTopH = $tooltip.offset().top - $(window).scrollTop() + $tooltip.outerHeight();
				var tooltipBottomH = $(window).outerHeight() - tooltipTopH;
			};

			/* 툴팁레이어 크기, 위치 설정 */
			$tooltipLayer.css({
				'width' : layerW,
				'left' : - layerL,
			});

			/* 툴팁레이어 방향 설정 */
			var layerH = $tooltipLayer.outerHeight();

			if ( tooltipBottomH <=  layerH ) { // 툴팁 아래 공간 없을 때
				$tooltipLayer.css('top', - layerH - layerTopSpace);
			} else { // 툴팁 아래 공간 있을 때
				$tooltipLayer.css('top', $tooltip.outerHeight() + layerTopSpace);
			}
		},
		close : function(_target){
			var $btn = $(_target),
				$tooltip = $btn.closest('.sp-tooltip');

			clearTimeout(closetime);
			$tooltip.removeClass('active');
			$tooltip.find('.btn-tooltip-open').children('.hidden-txt').text('말풍선 열기');
		},
	}
})();

/* 이벤트 */
$(document).on('click', '.btn-tooltip-open', function(){
	stToolip.open($(this));
})

$(document).on('click', '.btn-tooltip-close', function(){
	stToolip.close($(this));
})



/** -------------------------------------------
    Tab #탭
---------------------------------------------*/
/* 함수 */
var stTab = (function(){
	return {
		init : function() {
		},
		toggle : function(_target){
			var $tabBtn = $(_target),
				$tabList = $tabBtn.closest('li'),
				$tab = $tabBtn.closest('.se-tab');

			if ( !$tab.data('tab-id') == (null || '') ) { // data-attribute가 있을 때 탭기능 활성화
				var tabId = $tab.data('tab-id'); // 탭아이디
				var tabIndex = $tabList.index(); // 활성화된 탭인덱스

				// 탭활성화
				$tabList.addClass('active').siblings().removeClass('active');
				$tabBtn.attr('title','선택됨');
				$tabList.siblings('li').find('.se-btn').removeAttr('title');

				// 탭컨텐츠활성화
				$('.se-tab-conts[data-tab-target="'+tabId+'"]').find('div').eq(tabIndex).addClass('active').siblings().removeClass('active');
			}
		}
	}
})();

/* 이벤트 */
$(document).on('click', '.se-tab .se-btn', function() {
	stTab.toggle( $(this) );
});



/** -------------------------------------------
    Accordion #아코디언
---------------------------------------------*/
/* 함수 */
var stAccordion = (function(){
	return {
		init : function() { // 초기화
			$('.sp-accordion').each(function() {
				for ( var i = 0; i < $(this).find(' > li').length; i++ ) {
					var $accordList = $(this).find(' > li').eq(i),
						$accordTit = $accordList.find('.p-title');

					if ( $accordList.hasClass('active') ) {
						$accordTit.find('.hidden-txt').text('내용닫기');
					} else {
						$accordTit.find('.hidden-txt').text('내용열기');
					}
				}
			});
		},
		toggle : function( _target ) { // 토글
			var $accordBtn = $(_target),
				$accordList = $accordBtn.closest('li'),
				$accordTit = $accordList.find('.p-title');

			if ( $accordList.hasClass('active') ) { // 닫기
				$accordTit.find('.hidden-txt').text('내용열기');
				$accordList.removeClass('active');

			} else { // 열기
				$accordTit.find('.hidden-txt').text('내용닫기');
				$accordList.addClass('active');
			}
		}
	}
})();

/* 이벤트 */
$(document).on('click', '.btn-accordion-open', function(e) {
	e.stopPropagation();
	stAccordion.toggle( $(this) );
});

$(document).on('click', '.sp-accordion a.p-title', function() {
	stAccordion.toggle( $(this) );
});
