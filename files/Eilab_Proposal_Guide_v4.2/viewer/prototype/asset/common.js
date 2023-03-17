/******************************************************
	가이드
******************************************************/
// 가이드생성	
var guideCreate = function(){
	$('body').prepend('<div class="eilabHelper"><div class="btn btn_go re_btn non_hide">새로고침</div></div>')
	$('div[data-type="page"]').each(function(){
		$this = $(this);
		var pageTarget = $this.attr('data-name');
		$('.eilabHelper').append('<div class="btn btn_go non_hide" data-target="'+pageTarget+'">'+pageTarget+'</div>')
	});
	$('div[data-type="sliding"]').each(function(){
		$this = $(this);
		var pageTarget = $this.attr('data-name');
		$('.eilabHelper').append('<div class="btn btn_go btn_sliding non_hide">'+pageTarget+'</div>')
	});
};


/******************************************************
	이벤트 바인딩
******************************************************/
// 버튼 선택
var btnClick = function(){		

	var pageName = $(this).attr('data-target');
	var $pageActive = $('div[data-name="'+pageName+'"]');
	var $btnActive = $('div[data-target='+pageName+']');		

	if ( pageName != undefined){
		$pageActive.parent().find('div[data-type="page"].show').removeClass('show');
		$pageActive.addClass('show');
		$btnActive.addClass('active').siblings().removeClass('active');
		pageCheck();
		pointCheck(pageName);
	};	
};

// 버튼에 이벤트 부여
var btnEvent = function(){		
	$('.btn').each(function(){
		$this = $(this);
		var fn = $this.attr('data-function');
		$this.bind('click', eval(fn));
		$this.bind('click', btnClick);

		$this.bind('click', function(){
			var _this = $(this);
			// if ( !_this.hasClass('non_hide') ){
			// 	_this.addClass('hidden');
			// }
		})
	});
};

// 컨트롤러 이벤트 부여
var ctrlEvent = function(){
	$('.ctrl').each(function(){
		var $this = $(this),
			fn = $this.attr('data-function');

		$this.swipe(function(direction) {
			if( direction == 'left' || direction =='upleft' || direction =='downleft' ) direction = 'left';
			if( direction == 'right' || direction =='upright' || direction =='downright' ) direction = 'right';

			eval( fn+'("'+direction+'")' );
		});		
	});
};


/******************************************************
	공통함수
******************************************************/
/*-----------------------------------------------------
	default
-----------------------------------------------------*/
function getTransitionEndEventName() {
    var transitions = {
        "transition"      : "transitionend",
        "OTransition"     : "oTransitionEnd",
        "MozTransition"   : "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
     }
    var bodyStyle = document.body.style;
    for(var transition in transitions) {
        if(bodyStyle[transition] != undefined) {
            return transitions[transition];
        } 
    }
}


/*-----------------------------------------------------
	ebShow
-----------------------------------------------------*/
$.fn.ebShow = function(option) {
	var $this = this;

	var defaultOption = {
		onBeforeShow: function() { 
			// console.log('onBeforeShow');
		},
		onShow: function() {
			// console.log('onShow');
		},
		onAfterShow: function() {
			// console.log('onAfterShow');
		},
	}
	var option = $.extend({}, defaultOption, option);

	var _beforeShow = function(element) {
		// console.log('_beforeShow');

		var element = element;
		var $element = $(element);
		$element.removeClass('hide_animating');
		option.onBeforeShow();
	}
	var _show = function(element) {
		// console.log('_show');

		var element = element;
		var $element = $(element);
		$element.addClass('show');
		$element.addClass('show_animating');
		option.onShow();
	}
	var _afterShow = function(element) {
		// console.log('_afterShow');

		var element = element;
		var $element = $(element);
		$element.removeClass('show_animating');
		option.onAfterShow();
	}

	$this.each(function() {
		var element = this;
		var $element = $(this);
		var hasTransition = false;

		if ($element.hasClass('show')) return;

		$element.off(transitionEndEventName)

		_beforeShow(element);
		_show(element);

		// console.log('transitionnnnn', $element.css('transition-duration'));
		if ($element.css('transition-duration')!='0s') hasTransition = true;
		if (hasTransition) {
			$element.on(transitionEndEventName, function() {
				_afterShow(element);
				$element.off(transitionEndEventName)
			});
		} else {
			_afterShow(element);
		}

	})
}


/*-----------------------------------------------------
	ebHide
-----------------------------------------------------*/
$.fn.ebHide = function(option) {
	var $this = this;

	var defaultOption = {
		removeChildrenClass: null,
		onBeforeHide: function() {
			// console.log('onBeforeHide');
		},
		onHide: function() {
			// console.log('onHide');
		},
		onAfterHide: function() {
			// console.log('onAfterHide');
		},
	}
	var option = $.extend({}, defaultOption, option);

	var _beforeHide = function(element) {
		// console.log('_beforeHide');

		var element = element;
		var $element = $(element);
		$element.removeClass('show_animating');
		option.onBeforeHide();
	}
	var _hide = function(element) {
		// console.log('_hide');

		var element = element;
		var $element = $(element);
		$element.removeClass('show');
		$element.addClass('hide_animating');
		option.onHide();
	}
	var _afterHide = function(element) {
		// console.log('_afterHide');

		var element = element;
		var $element = $(element);
		if ( option.removeChildrenClass != null ){
			var classes = String(option.removeChildrenClass.split(' ')).replaceAll(',', ' ');
			$element.find('*').removeClass(''+classes+'');
		}
		$element.removeClass('hide_animating');
		option.onAfterHide();

		$(document).find('.btn.hidden').removeClass('hidden');
	}

	$this.each(function() {
		var element = this;
		var $element = $(this);
		var hasTransition = false;

		if ( option.removeChildrenClass != null && !$element.hasClass('show') ){
			var classes = String(option.removeChildrenClass.split(' ')).replaceAll(',', ' ');
			$element.find('*').removeClass(''+classes+'');
		}
		
		if (!$element.hasClass('show')) return;

		$element.off(transitionEndEventName)

		_beforeHide(element);
		_hide(element);

		if ($element.css('transition-duration')!='0s') hasTransition = true;
		if (hasTransition) {
			$element.on(transitionEndEventName, function() {
				_afterHide(element);
				$element.off(transitionEndEventName)
			});
		} else {
			_afterHide(element);
		}

	})
}


/*-----------------------------------------------------
	ebAutoplay
-----------------------------------------------------*/
var autoplayTimer = {};
$.fn.ebAutoplay = function(delay) {
    var $this = this;
 
    $this.each(function(){
		var element = this;
		var $element = $(this);

		$element.ebShow();
		clearTimeout(autoplayTimer[$element.data('name')])
		autoplayTimer[$element.data('name')] = setTimeout(function() {
			$element.ebHide();
		}, delay)
    })
}


/*-----------------------------------------------------
	ebFaceid
-----------------------------------------------------*/
var faceidCount = 0;
var faceidTimer = {};
$.fn.ebPlayFaceid = function(option) {
	var $this = $(this);

	var defaultOption = {
		onAfterPlay: function() {
			// console.log('onAfterPlay');
		}
	}
	var option = $.extend({}, defaultOption, option);

	$this.each(function() {
		var element = this;
		var $element = $(element);
		var $img = $element.find('.img_box img');

		var src = ($('body').hasClass('only_guide') ) ?  'asset/img/faceid/faceid_img' + faceidCount + '.gif' : '../asset/img/faceid/faceid_img' + faceidCount + '.gif';
		$img.attr('src', src);

		// var src = '../asset/img/faceid/faceid_img' + faceidCount + '.gif';
		// $img.attr('src', src);

		clearTimeout(faceidTimer[$element.data('name')])
		faceidTimer[$element.data('name')] = setTimeout(function() {
			option.onAfterPlay();
		}, 2000);
	})

	if (faceidCount < 9) {
		faceidCount ++
	} else {
		faceidCount = 0;
	}
}
$.fn.ebResetFaceid = function(option) {
	var $this = $(this);

	var defaultOption = {}
	var option = $.extend({}, defaultOption, option);

	$this.each(function() {
		var element = this;
		var $element = $(element);
		var $img = $element.find('.img_box img');

		$img.attr('src', '');
	})
}


/*-----------------------------------------------------
	ebCameraFlash
-----------------------------------------------------*/
$.fn.ebCameraFlash = function(option) {
	var element = this[0];
	var $element = this;

	var defaultOption = {
		onBeforeFlash: function() {},
		onFlash: function() {},
		onAfterFlash: function() {},
	}
	var option = $.extend({}, defaultOption, option);

	option.onBeforeFlash();
	option.onFlash();
	$element.addClass('flash');
	$element.on('animationend', function() {
		$element.removeClass('flash');
		option.onAfterFlash();
		$element.off('animationend');
	})
}


/*-----------------------------------------------------
	ebTimer
-----------------------------------------------------*/
$.fn.ebTimer = function( startText, sec, endText ){
 
    var $this = this;
 
    $this.text(startText);
    $this.addClass('counting').removeClass('end');
 
    $this.each(function(){
        var minutes = Math.floor(sec/60);
        var remSeconds = sec % 60;
 
        var timer = setInterval(downTime, 1000);
 
        function downTime() {
            if (sec > 0) {
                sec -= 1;
                myMinutes = Math.floor(sec / 60);
                remSeconds = sec % 60;
                if (remSeconds < 10) {
                    myMinutes < 10 ? $this.text( `0${myMinutes}:0${remSeconds}` ) : $this.text(`${myMinutes}:0${remSeconds}`);
                } else {
                    myMinutes < 10 ? $this.text(`0${myMinutes}:${remSeconds}`) : $this.text(`${myMinutes}:${remSeconds}`);
                }
 
            } else {
                $this.addClass('end').removeClass('counting');
                if ( endText == null ){
                    $this.text("인증 시간이 만료되었습니다.");
                } else {
                    $this.text(endText);
                }
                clearInterval(timer);
            }
        }
    })
}