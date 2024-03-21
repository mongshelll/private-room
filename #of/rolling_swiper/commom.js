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
	Modal #모달
---------------------------------------------*/
/* 함수 */
var stModal = (function(){
	// 기본 z-index
	var modalZIndex = 2000;

	// 호출 이전 포커스
	var focusTarget = [];

	// 딤 적용 모달 체크
	var activeModal = [],
		activeAlert = [];

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

					// 중복모달 내에 이전 닫힌 모달의 호출 요소가 있다면 포커스 후 활성화 포커스 배열에서 제거
					if( activeModal[0].find(focusTarget[0]) ) {
						focusTarget[0].focus();
						focusTarget.shift();
					} else {
						// 기존 후출요소 없는경우 body가 추가되므로 배열내 추가된 body 제거
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
		bottom: {
			uiOn: function(_target){
				var $thisModal = $(_target),
					$modalLayer = $thisModal.find('.modal-layer');

				if ( $(_target).hasClass('active') ) return;
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
		}
	}
})();


$(document).ready(function(){
	stModal.bottom.uiOn('#tempBottom01');
});

$(document).on('keydown', '.modal-wrap', function(e) {
	stModal.common.tabLoop(e);
});
