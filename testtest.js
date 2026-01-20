/**
 * 사이다뱅크 2023
 * JS Loader : A Temp File
 */

if (!window.UICommon) {
    var UICommon = function () {
        let $focusableEl = '[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]';
        let $inputEl = 'input[type=text]:not([disabled]), input[type=tel]:not([disabled]), textarea:not([disabled])';
        let initCount = 0;
        let originalPotion = false;
        const pubOnly = location.href.indexOf('/_pub') > -1; // 가이드 페이지에서만 적용되야 하는 경우 예외 처리시 사용

        let init = function () {
            uiReset();
            // 외부에서 사용 및 테스트 중
            _front.init(); // form 관련 접근성 set
            Layer.init(); // 팝업
            tabMenu.init(); // 탭메뉴
            inputRange.init(); // 인풋레인지

            // 화면 set
            accordionButton.init(); //아코디온
            toggleButton.init(); //토글
            pressButton.init(); //토글
            tooltipButton.init(); //툴팁
            swipeButton.init(); // 스와이프버튼(이체하기)
            uiStep.init() // 체크박스 스텝
            uiFullpop.init(); // 풀팝업 확인용
            uiEffect.init(); //UI모션효과
            loading.init();
            prodIntroAni.init(); //상품안내 인터렉션
            transListAni.init(); //거래내역조회 인터렉션
            apng.init();

            if($('.focus-visual').length) uiAnimation.init(['.focus-visual', '.cascade']); //상품안내
            if(!$('.all-menu').length) uiSwiper.init(); // 스와이프
            if(pubOnly) {
                if(initCount == 0) setTimeout(()=>window.scrollTo(0,0),100);

                // 큰글씨모드 (워크시트용)
                const url = new URL(location.href);
                const uiMode = url.searchParams.get('uiMode') ? url.searchParams.get('uiMode') : false;
                if(uiMode) {
                    $('html').attr('data-ui', uiMode)
                }
            }
            initCount++;
        }

        let $pgWrap = function() {
            // mod-date:1122:화면개발쪽에서 동적 생성된 $('.pg-wrap')들 중 현재 보여지고 있는 페이지를 리턴
            return $('.pg-wrap').not('[aria-hidden=true]').last();
        }

        let uiReset = function () {
            Body.unlock();
            $('html').removeClass('keypad-open');
            if ($('.pg-wrap').length) $('.pg-wrap').removeAttr('aria-hidden');
            if ($('.pg-container').length) $('.pg-container').removeAttr('aria-hidden');
            originalPotion = false;
        }

        /* 페이지중복확인 */
        let $targetPage = function () {
            // return $('.pt-page').length > 1 ? $($('.pt-page')[1]) : $('.pt-page');
            let $returnDoc = $(document);
            if (window.SPA) {
                $returnDoc = $('.pt-page').length > 1 ? $($('.pt-page')[1]) : $('.pt-page');
            }
            return $returnDoc;
        }

        //모바일 디바이스 체크
        let uiMobile = {
            Android: function () {
                return navigator.userAgent.match(/Android/i) == null ? false : true;
            },
            BlackBerry: function () {
                return navigator.userAgent.match(/BlackBerry/i) == null ? false : true;
            },
            iOS: function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;
            },
            iPhone: function () {
                return navigator.userAgent.match(/iPhone/i) == null ? false : true;
            },
            iPad: function () {
                return navigator.userAgent.match(/iPad/i) == null ? false : true;
            },
            iPhoneVersion: function () {
                const $sliceStart = navigator.userAgent.indexOf('iPhone OS') + 10;
                const $sliceEnd = $sliceStart + 2;
                const $version = parseFloat(navigator.userAgent.slice($sliceStart, $sliceEnd));
                return $version;
            },
            Opera: function () {
                return navigator.userAgent.match(/Opera Mini/i) == null ? false : true;
            },
            Windows: function () {
                return navigator.userAgent.match(/IEMobile/i) == null ? false : true;
            },
            tablet: function () {
                if (uiMobile.any()) {
                    if (window.screen.width < window.screen.height) {
                        return window.screen.width > 760 ? true : false;
                    } else {
                        return window.screen.height > 760 ? true : false;
                    }
                }
            },
            any: function () {
                return uiMobile.Android() || uiMobile.iOS() || uiMobile.BlackBerry() || uiMobile.Opera() || uiMobile.Windows();
            },
            check: function () {
                if (uiMobile.any()) {
                    $('html').addClass('mobile');
                    if (uiMobile.tablet()) $('html').addClass('tablet');
                }
                if (uiMobile.iOS()) $('html').addClass('ios');
                if (uiMobile.Android()) $('html').addClass('android');
                //if(uiMobile.iPhoneVersion() >= 12)$('html').addClass('ios12');
            }
        };

        //디바이스체크 실행
        let uiDevice = {
            iPhone8PlusH: 736,
            screenH: window.screen.height,
            screenW: window.screen.width,
            isIPhoneX: function () {
                $('html').addClass('iPhone-X');
            },
            notIPhoneX: function () {
                $('html').removeClass('iPhone-X');
            },
            check: function () {
                uiMobile.check();
                uiPC.check();
                if (uiMobile.any()) {
                    const $pixelRatio = Math.round(window.devicePixelRatio);
                    if (!!$pixelRatio) $('html').addClass('pixel-ratio-' + $pixelRatio);
                }
                const $isIPhoneX = uiMobile.iPhone() && uiDevice.screenH > uiDevice.iPhone8PlusH ? true : false;
                if ($isIPhoneX) {
                    //첫로딩
                    if ($(window).width() < $(window).height()) {
                        uiDevice.isIPhoneX();
                    } else {
                        uiDevice.notIPhoneX();
                    }
                }
            },
            hide: function () {
                if ($('[data-device-hide]').length) {
                    $('[data-device-hide]').each(function () {
                        const $device = $(this).data('device-hide');
                        if (uiMobile.any()) {
                            //모바일
                            if ($device == 'ios' && uiMobile.iOS()) {
                                $(this).hide();
                            } else if ($device == 'android' && uiMobile.Android()) {
                                $(this).hide();
                            }
                        } else {
                            //PC
                            if ($device == 'ios' && $('html').hasClass('safari')) {
                                $(this).hide();
                            } else if ($device == 'android' && !$('html').hasClass('safari')) {
                                $(this).hide();
                            }
                        }
                    });
                }
            }
        };

        // 스크롤바 이동속도 제어 구현 SPA ::: 공통
        // 호출시 durationScrollTo(현재위치, 시간)
        const durationScrollTo = (y, duration = 1000) => {
            const stepY = (y - window.scrollY) / duration;
            const currentY = window.scrollY;
            const startTime = new Date().getTime();
            const scrollerInterval = setInterval(() => {
                const now = new Date().getTime() - startTime;
                window.scrollTo({ top: currentY + (stepY * now) });
                if (duration <= now) {
                    clearInterval(scrollerInterval);
                }
            }, 1);
        }

        /* 아코디언 */
        let accordionButton = {
            init: function () {
                accordionButton.accordion();
                // accordionButton.set();
            },

            set: function () {
                $('[data-ui=accordion]').each(function () {
                    let $accoItem = $(this).find('.acco-item'),
                        $li = $accoItem.parents('li'),
                        $accoBtn = $li.find('.acco-btn');

                    $(this).find('[role=button]').attr('tabindex', 0); //[접근성] 0705추가

                    $accoItem.next('div').wrap('<div class="acco-panel-wrap"></div>')
                    if ($li.hasClass('on')) {
                        $li.children('button, [role=button]').attr('aria-expanded', true);
                        $li.parents('li').addClass('on').children('button, [role=button]').attr('aria-expanded', true);
                        $li.filter('.on').find('.acco-panel-wrap').show();
                    }
                });
            },
            accordion: function () {
                accordionButton.set();
                let $trigger = '[data-ui=accordion] li > .acco-item, [data-ui=accordion] .acco-btn';

                $(document).off('click', $trigger).on('click', $trigger, function(e) {
                    e.preventDefault();
                    e.stopPropagation(); // button event stop
                    let $this = $(this),
                        $li = $this.parents('li'),
                        $ul = $li.parents('ul'),
                        spd = 0;

                    // this
                    $this.attr('aria-expanded', !$li.hasClass('on'));
                    if($li.hasClass('on')) {
                        $li.find('.acco-panel-wrap, .acco-panel').slideUp(spd, ()=>$li.removeClass('on'));
                    }else {
                        $li.addClass('on')
                        $li.find('.acco-panel-wrap, .acco-panel').slideDown(spd);
                    }

                    // others (1005: 상품안내 제외)
                    if (!$ul.hasClass('each-open') && !($ul.hasClass('prod') && $ul.parents('.pg-wrap').hasClass('prod-intro'))) {
                        $li.siblings('li').find('.acco-panel-wrap, .acco-panel').slideUp(spd, ()=>$li.siblings('li').removeClass('on'));
                        $li.siblings('li').find('button').attr('aria-expanded', false);
                    }
                    setTimeout(function(){UICommon.scTop.topMove($this);}, 0); //스크롤top
                });
            },
        }

        /* 토글 */
        let toggleButton = {
            init: function () {
                toggleButton.toggle();
            },
            toggle: function () {
                // wa-241113 | aria-expanded 초기상태 제공
                $('[data-ui=toggle]').each(function () {
                    $(this).attr('aria-expanded', $(this).hasClass('on'));
                });

                $(document).off('click', '[data-ui=toggle]').on('click', '[data-ui=toggle]', function(e) {
                    e.preventDefault();
                    let _this = $(this);

                    if (_this.hasClass('switch')) { // accordion
                        if (_this.hasClass('on')) {
                            _this.attr('aria-expanded', 'false').removeClass('on').parent('li').siblings('li').children('[data-ui=toggle]').removeClass('on').attr('aria-expanded', 'false');
                        } else {
                            _this.attr('aria-expanded', 'true').addClass('on').parent('li').siblings('li').children('[data-ui=toggle]').removeClass('on').attr('aria-expanded', 'false');
                        }
                    } else if (_this.attr('aria-controls') !== undefined) {
                        let $panel = $('#' + _this.attr('aria-controls'));
                        if (_this.hasClass('on')) {
                            _this.attr('aria-expanded', 'false');
                            _this.removeClass('on');
                            $panel.slideUp();
                        } else {
                            _this.attr('aria-expanded', 'true');
                            _this.addClass('on');
                            $panel.slideDown();
                        }
                    } else { // default
                        let _st = $(window).scrollTop();
                        let _gap = 400;
                        _this.parents('[data-ui=toggle]').toggleClass('on');

                        if (_this.hasClass('on')) {
                            _this.attr('aria-expanded', 'false').removeClass("on").next('.toggle-panel').slideUp(300);
                            let _st = $(window).scrollTop() - _gap;
                        } else {
                            // slideDown시 durationScrollTo 호출
                            _this.attr('aria-expanded', 'true').addClass("on").next('.toggle-panel').slideDown(300, () => {
                                if (_this.parents('.inform-btm-wrap').length > 0) {
                                    durationScrollTo(_this.parents('.inform-btm-wrap')[0].offsetTop - 32, 300)
                                }
                            });
                        }
                    }
                    if (_this.hasClass('hidden-btn')) _this.parent('.btns').hide();
                    if (_this.closest('.ui-swiper').length) setTimeout(function () { UICommon.uiSwiper.update(_this.closest('.ui-swiper')) }, 100);
                    if (_this.closest('.tab-swipe').length) setTimeout(function () { UICommon.tabMenu.tabSlider.update() }, 100);
                });
            },
        }

        /* Press Button */
        let pressButton = {
            init: function() {
                pressButton.press();
            },
            press: function() {
                $(document)
                .off('click.pressButton')
                .on('click.pressButton', '[data-ui=press]', function(e) {
                    e.preventDefault();
                    $this = $(this);
                    $this.toggleClass('on').attr('aria-pressed', $this.hasClass('on')).siblings('.sync').removeClass('on').attr('aria-pressed','false');
                    if($this.hasClass('on') && $this.attr('data-value')) {
                        $this.css({'background-color': '#'+$this.attr('data-value')});
                    }else {
                        $this.css({'background-color': ''});
                    }

                })
                .on('click.pressButton', '[data-ui=scroll-able] button', function(e) {
                    e.preventDefault();
                    $this = $(this);
                    $this.parents('[data-ui=scroll-able]').find("button").removeAttr("class").removeAttr("title");
                    $this.addClass("active").attr("title", "선택됨");
                });
            }
        }

        /* switch Button */
        let switchButton = {
            init: function() {
                switchButton.switch();
            },
            switch: function() {
                $(document).on('click','[data-ui="switchButton"]', function(e) {
                    $this = $(this);
                    if( $this.prop('checked') == true ) {
                        $this.siblings('.label').children('.move-label').text("금액보기");  //wa-241205: 잔액 텍스트 변경 //sscn 251210: 금액으로 변경
                        $this.parents('.scene01').find('.main-money').children('.show-money').show().siblings('.hidden-money').hide();
                    } else {
                        $this.siblings('.label').children('.move-label').text("금액숨김");  //wa-241205: 잔액 텍스트 변경 //sscn 251210: 금액으로 변경
                        $this.parents('.scene01').find('.main-money').children('.show-money').hide().siblings('.hidden-money').show();
                    }
                })
            }
        }

        /* Input Range */
        let inputRange = {
            events: [],
            init: function() {
                let rangeInputs = document.querySelectorAll('input[type="range"]:not(.range-pass)');
                let outputInputs = document.querySelectorAll(".rangevalue"); // 0605 [접근성]

                for(i in inputRange.events) {
                    let event = inputRange.events[i];
                    event.node.removeEventListener('input', event.handler)
                    event.node.removeEventListener('change', event.handler)
                }
                if (rangeInputs.length) {
                    for (var i=0; i<rangeInputs.length; i++){
                        let tar = rangeInputs[i];
                        $(tar).attr('dat-test', initCount)
                        // s : 0605 [접근성]
                        // mod-date:1129: aria-hidden제거로 스크립트 수정
                        // let unit = outputInputs[i].closest('[aria-hidden=true]').querySelector('.num-unit') ? outputInputs[i].closest('[aria-hidden=true]').querySelector('.num-unit').innerText:'';
                        // let unit = $(outputInputs[i]).siblings('.num-unit') ? $(outputInputs[i]).siblings('.num-unit').text():'';

                        // wa-241115 | price Inputrange - 한도 조회하기
                        let $price = $(outputInputs[i]).closest('button');
                        let unit = $price.find('.num-unit').length > 0 ? $price.find('.num-unit').text() : ''
                        $price.attr('aria-label', addComma(tar.value) + unit);

                        document.querySelectorAll(".rangevalue")[i].innerText = addComma(tar.value);
                        tar.ariaValueText = unit.indexOf('원') > -1 ? addComma(tar.value) + unit:tar.value + unit;
                        // e : 0605 [접근성]
                        tar.style.backgroundSize = (tar.value - tar.min) * 100 / (tar.max - tar.min) + '% 100%';
                        if(initCount == 0) {}

                        inputRange.action(rangeInputs, outputInputs);
                    }
                }
            },
            action: function(eleInpt, outputInputs){
                function handleInputChange(e) {
                    var target = e.target
                    if (e.target.type !== 'range') {
                        target = document.getElementById('range');
                    }

                    let min = target.min,
                    max = target.max,
                    val = target.value;
                    let idx = [...document.querySelectorAll('input[type="range"]')].indexOf(target)

                    // mod-date:1129: aria-hidden제거로 스크립트 수정
                    // let unit = outputInputs[idx].closest('[aria-hidden=true]').querySelector('.num-unit') ? outputInputs[idx].closest('[aria-hidden=true]').querySelector('.num-unit').innerText:'';
                    let unit = $(outputInputs[idx]).siblings('.num-unit') ? $(outputInputs[idx]).siblings('.num-unit').text():'';
                    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';

                    // wa-241115 | price Inputrange - 한도 조회하기
                    let price = outputInputs[idx].closest('button')
                    // s: sscn 250704: range 에러수정
                    if(price) {
                        unit = price.querySelector('.num-unit') ? price.querySelector('.num-unit').textContent : ''
                        price.setAttribute('title', addComma(target.value))
                    } else {
                        outputInputs[idx].setAttribute('title', addComma(target.value))
                    }
                    // e: sscn 250704: range 에러수정

                    // let rateValueCheck = target.dataset.rateValue ? true: false; //mod-date:0830: 연이자율반영
                    // let rateValue = rateValueCheck ? eval(target.dataset.rateValue+`(${val})`):''; //mod-date:0830: 연이자율반영
                    // s : 0605 [접근성]
                    target.dataset.event = e;
                    target.ariaValueText = (unit.indexOf('원') > -1 ? addComma(val) + unit:val + unit);// + (rateValueCheck ? ' ' + rateValue : ''); //mod-date:0830: 연이자율반영
                    outputInputs[idx].value = addComma(val);// sscn 250704: range 에러수정
                    // outputInputs[idx].value = unit.indexOf('원') > -1 ? addComma(val):val;
                    // if(rateValueCheck) target.parentNode.querySelector('.rate-value').innerHTML = rateValue; //mod-date:0830: 연이자율반영
                    // e : 0605 [접근성]
                }
                eleInpt.forEach(input => {
                    inputRange.events.push({node: input, handler: handleInputChange})
                    input.addEventListener('input', handleInputChange);
                    input.addEventListener('change', handleInputChange);// 0605: ios voiceover [접근성]
                });

            }
        }

        /* swipe Button */
        let swipeButton = {
            init: function($target, x, isScrolling) {
                if(!$('[data-ui=swipeButton]').length || (event && event.target.nodeName == 'BUTTON')) return false;
                if($target) {
                    $('html').removeClass('isSwiping')
                    if(isScrolling) {
                        $('[data-ui=swipeButton] .swipeButton-wrap').removeClass('isSwiping').css('transform', `translateX(${0}px)`)
                    }else {
                        $target.removeClass('isSwiping').css('transform', `translateX(${x*-1}px)`)
                    }
                }else {
                    // swipeButton.aria();
                    swipeButton.event();
                }
            },
            swipe: function($target, x) {
                $('html').addClass('isSwiping');
                if(uiMobile.iPhoneVersion() > 12 ) $target.addClass('isSwiping')
                $target.css('transform', `translateX(${x*-1}px)`)
            },
            event: function() {
                let ratio = $('[data-ui=swipeButton]').css('--button-width').indexOf('rem') > -1 ? 10:1;
                let sx = 0, x = 0, sy = y = 0, w = $('[data-ui=swipeButton]').css('--button-width') ? Number($('[data-ui=swipeButton]').css('--button-width').replace(/rem|px/g, '')*ratio):77;
                $(document)
                .off('.swipeButton')
                .on('touchstart.swipeButton', '[data-ui=swipeButton]', function(e) {
                    if(e.touches == undefined || swipeButton.isSwiping) return false;
                    let $target = $(e.target).closest('.swipeButton-wrap');
                    if(sx == 0) sx = e.touches[0].clientX;
                    if(sy == 0) sy = e.touches[0].clientY;
                    swipeButton.init($target, x, true)
                    $(this)
                    .off('touchmove touchend')
                    .on('touchmove', function(e) {
                        if(e.touches == undefined) return false;
                        let $target = $(e.target).closest('.swipeButton-wrap');
                        x = sx - e.touches[0].clientX;
                        y = sy - e.touches[0].clientY;
                        if(Math.abs(x) > Math.abs(y)) {
                            swipeButton.isSwiping = true;
                            if(x < 0) x = 0;
                            if(x > w) x = w;
                            swipeButton.swipe($target, x)
                            if(e.cancelable) e.preventDefault();
                        }
                    })
                    .on('touchend', function(e) {
                        if(e.touches == undefined) return false;
                        let $target = $(e.target).closest('.swipeButton-wrap');
                        x = (x > 20) ? w : 0;
                        // $target.find('.main').text('y '+ Math.floor(y)+ ' / x ' + Math.floor(x)+' / '+st)
                        if(swipeButton.isSwiping) swipeButton.init($target, x, false)
                        sx = sy = x = y = 0;
                        swipeButton.isSwiping = false;
                    })
                })
            },
            set: function(hasBtn) {
                // 접근성
                $('[data-ui=swipeButton]').find('.his-item[role=button]').each(function(i) {
                    let $this = $(this).is('li') ? $(this).find('> div').eq(0): $(this);
                    let name = $this.find('.name').text();
                    let type = hasBtn ? '' : $this.find('.main').hasClass('fc-point')? '이체하기':'가져오기';
                    let money = $this.find('.main').text();
                    let cls = $this.find('.main').hasClass('fc-point')? 'primary':'point';
                    let temp = hasBtn ? '' : `
                    <div class="btns swipe-btns">
                    <button type="button" class="btn ${cls}" aria-label="${name} ${money} ${type}">${type}</button>
                    </div>`;
                    let wrap = `<div class="swipeButton-wrap"></div>`;
                    $this.attr({'aria-label': `${$this.text()} 포커스 이동하시면 ${type} 버튼이 있습니다`, 'tabindex': -1});
                    if(!hasBtn && !$this.siblings('.swipe-btns').length) $this.after(temp);
                    if(!$this.parents('.swipeButton-wrap').length) $this.parent().wrapInner(wrap);
                })
            }
        }

        /* 텝메뉴 */
        let tabMenu = {
            init: function () {
                tabMenu.tabMove();
                tabMenu.tab();
               // tabMenu.tabSwipe();
               // tabMenu.tabRadio();
                tabMenu.tabBar();
                tabMenu.tabResize(); //0803 resize
            },
            tab: function () {
                $('.tab-wrap .tab-list a.active').attr('title', '선택됨');
                $('.tab-wrap .tab-list').find('button.active').attr('title', '선택됨'); // mod-date:1017:[접근성]
                $(document).on('click', '.tab-wrap [role=tab]', function (e) {
                    e.preventDefault();
                    let _this = $(this),
                        _tabWrap = _this.closest('.tab-wrap'),
                        _thisPannel = _tabWrap.children('.tab-panel');
                    if (_tabWrap.find('.ly-cnt').length) _thisPannel = _tabWrap.children('.ly-cnt').children('.tab-panel');
                    if (_tabWrap.find('.tab-scroller').length) {
                        _thisPannel = _tabWrap.children('.tab-scroller').children('.tab-panel');
                        _tabWrap.find('.tab-scroller').stop().scrollTop(0); // sscn 251210: 계좌선택 바텀시트 스크롤 수정
                    }
                    let _thisControls = _thisPannel.filter('#' + _this.attr('aria-controls'));
                    _this.attr('aria-selected', 'true').attr('title', '선택됨').siblings('[role=tab]').attr('aria-selected', 'false').removeAttr('title'); // mod-date:1017:[접근성]

                    if (_thisPannel.length) {
                        _thisControls.addClass('active').siblings('.tab-panel').removeClass('active');
                        if (_thisControls.find('.ui-swiper').length) uiSwiper.update(_thisControls.find('.ui-swiper'));
                    };
                    if (_this.closest('.pop-body').length) {
                        _this.closest('.pop-body').stop().scrollTop(0);
                    }
                    // 240503
                    // 전체계좌조회 > 사이다뱅크, 다른금융 탭 선택시 스크롤 최상단으로 초기화하기 위해 추가
                    if(_this.parents().is('.pg-wrap.total')){ // 최상단 pg-wrap클래스에 total이라는 클래스 존재할시 실행으로 구분
                        $(window).scrollTop(0,0);
                        $('.tab-list.sticky').removeClass('on');
                        $('.scroll-panel').removeClass('on');
                        $('.tab-list .scroll-wrap button').eq(0).addClass('active').siblings().removeClass('active');
                    }
                    const pageFlag = $('.pg-wrap').is('.bg-fixed-gr01');  // 상품 : 공통
                    _this.addClass('active').siblings('button').removeClass('active'); // @0615
                    tabMenu.tabScroll(_this);
                    tabMenu.tabBar(pageFlag ? 300 : 0);

                    // s: sscn 251024: 메인 상품 탭 버튼 스크롤 적용
                    if (_this.closest('.pg-wrap.main-prod').length) {
                        $(window).scrollTop(0, 0);

                        const scrollXActiveFn = (_target) => {
                            const _container = _target.closest('.scroll-area');
                            if(_container.length > 0) {
                                _container[0].scrollTo({
                                    left: _target[0].offsetLeft,
                                    behavior: "smooth"
                                })
                            } else {
                                const targetScrArea = _target.closest('.tab-list').find('.scroll-area');
                                targetScrArea[0].scrollTo({
                                    left: 0,
                                    behavior: "instant"
                                })
                            }
                        }

                        _this.closest('.tab-list').find('[role=tab]').attr('aria-selected', 'false').removeAttr('title');
                        _this.attr('aria-selected', 'true').attr('title', '선택됨');
                        scrollXActiveFn(_this)
                    }
                    // e: sscn 251024: 메인 상품 탭 버튼 스크롤 적용
                });
                // $(document).on('click', '.tab-list button', function (e) { // 클릭 이벤트 중복 위로 이동 @0615
                //     let _this = $(this);
                //     _this.addClass('active').siblings('button').removeClass('active');
                //     tabMenu.tabScroll(_this);
                //    //_front.contentsReH();
                // });
            },
            tabResize: function() {
                $(window).off('resize.tabMenuEvent').on('resize.tabMenuEvent', function() {
                    tabMenu.tabBar();
                });
            },
            tabMove: function (el) {//popup
                if (el === undefined) {
                    $('.tab-list').each(function () {
                        $this = $(this);
                        ($this.find('[aria-selected=true]').length) ? el = $this.find('[aria-selected=true]') : el = $this.find('button.active');
                        let $tabWrap = el.closest('.tab-wrap'),
                            $lyCnt = $tabWrap.children('.ly-cnt'),
                            $tabScroller = $tabWrap.children('.tab-scroller'),
                            $thisPannel = $tabWrap.children('.tab-panel'),
                            index = el.index();
                       // if ($this.find('.tab-bar').length) index = index - 1;

                        if ($lyCnt.length) $thisPannel = $lyCnt.children('.tab-panel');
                        if ($tabScroller.length) $thisPannel = $tabScroller.children('.tab-panel');
                        $thisPannel.eq(index).addClass('active');
                        // if ($this.find(".tab-list-sub")) {
                        //     $(".tab-list-sub").find("button[aria-selected=true]").trigger("click");
                        // }
                        tabMenu.tabScroll(el);
                    });
                    return false;
                }
            },
            tabScroll: function (el) {
				try{
                    if (el.length < 1) return

					if(el.closest('.tab-wrap').hasClass('fit')) return;
                    let $parent = el.closest('.tab-wrap').find('.tab-list'),
                    $parentWidth = $parent.outerWidth(),
                    $parentScrollW = $parent.get(0).scrollWidth,
                    sb = Number(el.css('margin-left').replace('px', '')),
                    $thisLeft = el.position().left + sb,
                    $thisWidth = el.outerWidth() + sb,
                    $scrollLeft = $thisLeft - ($parentWidth / 2) + ($thisWidth / 2),
                    $speed = Math.max(300, Math.abs($scrollLeft * 2)),
                    $line = $parent.find('.tab-bar');
                if ($parentWidth < $parentScrollW) $parent.stop().animate({ scrollLeft: $scrollLeft }, 300); //$speed
				}catch(e){
					console.log("제이쿼리 에러발생 :" ,e);
				}
            },
            tabBar: function (delay = 0) {
                $('.tab-wrap').each(function () {
                    let $this = $(this),
                        $bar = $this.find('.tab-bar'),
                        timer; // debounce
                    if ($bar.length) {
                        clearTimeout(timer);
                        let $btn = $this.find('[role=tab]'),
                            $tabWrap = $this.closest('.tab-wrap'),
                            $active = $tabWrap.find('[aria-selected=true]'),
                            $list = $btn.parent();

                        if ($active.length < 1) return

                       // ($tabWrap.hasClass('box')) ? $tabWrap.addClass('') : $tabWrap.addClass('line'); 0531 test중
                        timer = setTimeout(function () {
                            let $tabWidth = $active.outerWidth(),
                                $listLeft = parseInt($list.css('margin-left')),
                                sb = Number($active.css('margin-left').replace('px', '')),
                                $tabLeft = $listLeft + $active.position().left + $btn.position().left + sb;

                            //$bar.css({ 'width': $tabWidth, 'left': $tabWrap.is('.line:not(.fixed)') ? $tabLeft + 24 : $tabLeft});
                           // $bar.css({ 'width': $tabWidth, 'left': $tabWrap.is('.fit, .box') ? $tabLeft : $tabLeft});
                            $bar.css({ 'width': $tabWidth, 'left': $tabLeft});
                        }, delay);
                    }
                });
            },

            tabSwipeArray: [],
            tabSlider: null,
            tabSwipe: function () {
                if ($('.tab-swipe').length) {
                    $('.tab-swipe').each(function () {
                        let $this = $(this),
                            $btn = $this.closest('.tab-wrap').find('.tab-list').find('button'),
                            $active = $this.closest('.tab-wrap').find('.tab-list').find('[aria-selected=true]'),
                            $panel = $this.find('.tab-panel'),
                            _tabFix = 0,
                            _headH = ($('#header').length>0) ? $('#header').outerHeight() : 0,
                            isFixed = false;
                        $(window).on('scroll', function () {
                            if($this.closest('.tab-wrap').find('.tab-list-wrap.fixed').length) {
                                isFixed = true;
                                _tabFix = $this.closest('.tab-wrap').offset().top - _headH;
                            } else {
                                isFixed = false;
                                _tabFix = 0;
                            }
                        });
                        if (!$this.find('swiper-wrapper').length) {
                            $this.wrapInner('<div class="swiper-wrapper"></div>');
                            $panel.addClass('swiper-slide').attr('aria-hidden', true);
                        }
                        let opt = {
                            slidesPerView: 1,
                            speed: 300,
                            autoHeight: true,
                            touchRatio: 0.1,
                            resistance: true,
                            resistanceRatio: 0.5,
                            initialScroll: 0,
                            on: {
                                slideChangeTransitionEnd: function (e) {
                                    // [S] main tab 스와이퍼 개발 callback 추가
                                    this.$el.find('.swiper-slide').each(function () {
                                        let _this = $(this);
                                        if (_this.closest('.m-service-tab').length && _this.is('.swiper-slide-active')) {
                                            if (window.SPA_COMMON) {
                                                window.SPA_COMMON.callbackWithSPA('onMainSubSwiperChange', _this);
                                                window.SPA_COMMON.callbackWithSPA('onMainSub2SwiperChange', _this);
                                            }
                                        }
                                    });
                                    // [E] main tab 스와이퍼 개발 callback 추가
                                }
                            }
                        };
                        if ($this.hasClass('swiper-initialized')) {
                            if (tabMenu.tabSlider !== undefined) tabMenu.tabSlider.update();
                        } else {
                            tabMenu.tabSlider = new Swiper(this, opt);
                        }
                        let current = $active.index();
                        tabMenu.tabSlider.slideTo(current);
                        $panel.eq(current).attr('aria-hidden', false);
                        $btn.on('click', function () {
                            let $this = $(this), tabIndex = $this.index();
                            tabMenu.tabSlider.slideTo(tabIndex);
                            $panel.eq(tabIndex).attr('aria-hidden', false).siblings('.tab-panel').attr('aria-hidden', true);
                            if(isFixed) $('html, body').animate({scrollTop:_tabFix}, 300);
                        });
                        tabMenu.tabSlider.on('slideChangeTransitionStart', function () {

                            let tabIndex = $this.find('.tab-panel.swiper-slide.swiper-slide-active').index(),
                                //thisSlide = $this.find('.tab-panel.swiper-slide.swiper-slide-active'),
                                $tabActive = $btn.eq(tabIndex);
                            $tabActive.attr('aria-selected', 'true').siblings('[role="tab"]').attr('aria-selected', 'false');
                            $panel.eq(tabIndex).attr('aria-hidden', false).siblings('.tab-panel').attr('aria-hidden', true);
                            tabMenu.tabScroll($tabActive);
                            tabMenu.tabBar();
                            if(isFixed) $('html, body').animate({scrollTop:_tabFix}, 300);
                            aniAdd('.m-ani');
                            if($this.find('.chart').length) UICommon._front.chartClear('.chart .bar.in'); //차트 애니메이션 리셋
                            // console.log(thisSlide);
                            // if (window.SPA_COMMON) {
                            //     console.log(thisSlide);
                            //     window.SPA_COMMON.callbackWithSPA('onSwiperChange', thisSlide);

                            // }
                        });
                        tabMenu.tabSlider.on('slideChangeTransitionEnd', function () {
                            if($this.find('.chart').length) UICommon._front.chart('.chart .bar.in'); //차트 애니메이션 실행
                        });

                        let aniAdd = function(tar){
                            if($this.find(tar).length) $this.find(tar).removeClass('on').addClass('on');
                        };
                        aniAdd('.m-ani');

                        tabMenu.tabSwipeArray.push(tabMenu.tabSlider);
                        $this.on('touchstart', function (e) {
                            if (!$(e.target).parents("[data-bubble='false']").length) {
                                tabMenu.tabSlider.allowTouchMove = true;
                            }
                        });
                    });
                }
            },
            tabRadio: function () {
                $('.tab-radio').each(function () {
                    let $tabRadio = $(this),
                        $rdo = $tabRadio.find('input'),
                        $current = $tabRadio.find('input:checked'),
                        $tar = $tabRadio.attr('data-show'),
                        $panel = $tabRadio.closest('.tab-wrap').find('.tab-panel');
                    $panel.eq($current.parent().index()).addClass('active');
                    $rdo.on('change', function () {
                        let $this = $(this), tabIndex = $this.parent().index();
                        $panel.eq(tabIndex).addClass('active').siblings('.tab-panel').removeClass('active');
                    });
                });
            }
        }

        /* 툴팁 */
        let tooltipButton = {
            init: function () {
                $(document).off('click', '[data-ui=tooltip]').on('click', '[data-ui=tooltip]', function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    _this = $(this);
                    let _winW = $('body').width(),
                        _tooltipWrap = _this.parents('.tooltips').find('.tooltip-wrap'),
                        _tooltipWrapL = _this.offset().left - 24,
                        _tooltipWrapR = _winW - (_this.offset().left + 44);

                    $('[data-ui=tooltip]').removeClass('on');

                    if ($(e.target).closest('.tooltips').length === 0) {
                        _tooltipWrap.removeClass('show');
                        setTimeout(function () {
                            _tooltipWrap.hide().removeClass('top').attr('aria-hidden', 'true').closest('.tooltips').parent().css('z-index', '').parent().css('z-index', '');
                        }, 300);
                    };

                    let close = function () {
                        _tooltipWrap.removeClass('show').off('keydown', keyDownHandler);
                        setTimeout(function () {
                            _tooltipWrap.hide().removeClass('top').attr('aria-hidden', 'true').closest('.tooltips').parent().css('z-index', '').parent().css('z-index', '');
                        }, 300);
                        setTimeout(function () {
                            _this.focus().removeClass('on');
                        }, 100);
                    };

                    if (_tooltipWrap.hasClass('show')) {
                        close();
                    } else {
                        $('.tooltip-wrap').hide().removeClass('top').attr('aria-hidden', 'true').closest('.tooltips').parent().css('z-index', '').parent().css('z-index', '');
                        tooltipButton.position(_this, _tooltipWrap);
                        _this.addClass('on').closest('.tooltips').parent().css('z-index', '101').parent().css('z-index', '101');
                        _tooltipWrap.show().attr('aria-hidden', 'false');
                        _tooltipWrap.parents('.acc-pannel').parents('div').hasClass('section-f') ? _tooltipWrap.css({ 'left': -_tooltipWrapL - 8, 'right': -_tooltipWrapR - 8 }) : _tooltipWrap.css({ 'left': -_tooltipWrapL, 'right': -_tooltipWrapR });
                        setTimeout(function () {
                            _tooltipWrap.addClass('show');
                        }, 100);
                    }

                    $('.btn-tooltip-x').off('click').on('click', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        close();
                    });

                    // wa-240924 : tooltip 포커스
                    let $focusEl = _tooltipWrap.find($focusableEl)
                    let focusElLength = $focusEl.length

                    $focusEl.each((idx, el) => {
                        el.setAttribute('data-focus-idx', idx)
                    })

                    _tooltipWrap.on('keydown', keyDownHandler)
                    function keyDownHandler (e) {
                        if (e.keyCode ? e.keyCode : e.which === 9) {
                            let focusIdx = parseInt(e.target.dataset.focusIdx)

                            if (e.shiftKey && focusIdx === 0) {
                                $focusEl[focusElLength - 1].focus()
                                e.preventDefault()
                                e.stopPropagation();

                            } else if (focusIdx === focusElLength - 1) {
                                $focusEl[0].focus()
                                e.preventDefault()
                                e.stopPropagation();
                            }
                        }
                    }
                });
            },
            position: function (t, e) {
                $(window).scroll(function () {
                    let deviceH = t.parents('.pop-body').length?t.parents('.pop-body').height():screen.height,
                        offsetT = t.offset().top,
                        scrollT = t.parents('.pop-body').length?t.parents('.pop-body').offset().top:$(document).scrollTop(),
                        tipWrapT = offsetT - scrollT,
                        tipWrapD = deviceH - (offsetT - scrollT);
                        console.log(deviceH , offsetT, scrollT, tipWrapT, tipWrapD);
                    (tipWrapT > tipWrapD) ? e.addClass('top') : e.removeClass('top');
                });
                $(window).scroll();
            }
        }

        let _front = {
            init: function () {
                _front.form();
                _front.slider();
                _front.event();
            },
            step: function () {
                let _step = $targetPage().find("[data-ui=step]");
                let _stepH = parseInt(_step.outerHeight());
                let _hdH = $targetPage().find("#header").outerHeight() == undefined ? 0 : parseInt($targetPage().find("#header").outerHeight());
                let _aniVal = _stepH + _hdH + 20;

                $(window).on('scroll.formEvent', function () {
                    let _st = $(this).scrollTop();
                    if (_st > _aniVal) {
                        if (!$('[data-ui=step]').hasClass('on')) _step.clone().prependTo('.pg-container').addClass("on");
                    } else {
                        $('[data-ui=step].on').remove();
                    }
                });
            },
            scroll: function () {
                let _isStep = ($targetPage().find("[data-ui=step]").length > 0) ? true : false;
                if (_isStep) _front.step();
                $(window).off('scroll.formEvent').on('scroll.formEvent', function () {
                    let _st = $(this).scrollTop();
                    let _headerH = $('.pg-header').height();
                    let $curentPgWrap = $pgWrap();

                    if ($curentPgWrap.find('.sticky').length) {
                        $('.sticky').parents('.tab-panel').length ? _headerH = $('.pg-header').height() - $('.tab-list').height() : _headerH = $('.pg-header').height();
                    }

                    //$(".pg-gnb").addClass('fixed on');
                   // (_st > _headerH && !($('.pg-wrap').find('.sticky'))) ? $(".pg-gnb").addClass('fixed') : $(".pg-gnb").removeClass('fixed');  //Header Fixed

                    if (_st > _headerH) {
                        $curentPgWrap.find('.sticky').length > 0 ? $('.pg-gnb').addClass('fixed noline') : $('.pg-gnb').addClass('fixed');
                        $(".bg-check").length ? $(".lists-headnote").addClass("bg-col") : $(".lists-headnote").removeClass("bg-col"); //스크롤 될때 bg 변경
                    } else {
                        $(".pg-gnb").removeClass('fixed noline');
                    }


                    if ($(".card-focus.solid").length) {
                        let cardFocus = $(".card-focus.solid");
                        let cardFocusTop = cardFocus.offset().top + cardFocus.height();
                        if (cardFocusTop <= _st) {
                            $(".card-focus.flat").css("display", "flex")
                        } else {
                            $(".card-focus.flat").css("display", "none")
                        }
                    }
                    // mod-date:0926 스티키 수정
                    if ($curentPgWrap.find('.sticky-area.nofix').length) {
                        let sticky = $(".sticky-area.nofix");
                        let stickyTop = sticky.offset().top + sticky.height() - _headerH + 5;

                        $(".sticky-area.sticky").css("display", stickyTop <= _st ? 'block' : 'none');
                    }

                    // s: sscn 250730: 스티키 영역 추가
                    if ($('[data-scroll=target]').length) {
                        const $targetArea = $('[data-scroll=target]');
                        const $fixedArea = $('[data-scroll=fixed]');
                        const scrollT = $targetArea.offset().top + $targetArea.height() - _headerH;

                        if (scrollT <= _st) {
                            // 아이계좌관리서비스 메인의 경우
                            if($targetArea.closest('[data-profile=child].main-child')) {
                                $fixedArea.slideDown(100, 'linear');
                            }

                            $fixedArea.css('display', 'flex');
                            $fixedArea.siblings('.pg-gnb').css('position', 'relative')
                            $(".pg-gnb").addClass('noline');
                        } else {
                            // 아이계좌관리서비스 메인의 경우
                            if($targetArea.closest('[data-profile=child].main-child')) {
                                $fixedArea.siblings('.pg-gnb').removeAttr('style')
                                $fixedArea.slideUp(100, 'linear');
                                return;
                            }

                            $fixedArea.css("display", "none");
                            $(".pg-gnb").removeClass('noline');
                        }
                    }
                    // e: sscn 250730: 스티키 영역 추가
                });
            },
            slider: function () {
                if ($('.slider-select').length) {
                    $('.slider-select').each(function () {
                        let $slider = $(this).find('.slider'),
                            $list = $(this).find('.range'),
                            $inp = $(this).find('input[type=hidden]'),
                            $unit = $list.data('unit'),
                            $title = $list.attr('title'),
                            $min = parseInt($slider.data('min')),
                            $max = parseInt($slider.data('max')),
                            $val = parseInt($slider.data('value')),
                            $step = parseInt($slider.data('step')),
                            $d = parseInt($slider.data('drainage')),
                            $sync = $slider.data('sync');

                        if (!$min) $min = 0;
                        if (!$max) $max = 5;
                        if (!$step) $step = 1;
                        if (!$val) $val = $min;

                        if ($list.length) {
                            $list.empty();
                            if (!!$title) $list.removeAttr('title').append('<strong class="hidden">' + $title + '</strong>');
                            let _total = ($max - $min) / $step;
                            let _stepLeft = 100 / _total;
                            let _w = 100 / _total - 5;
                            $list.append('<ul></ul>');
                            for (let i = $min; i <= ($max / $step); i++) {
                                let _setLeft = _stepLeft * i;
                                if ($d != NaN && i % $d === 0) {
                                    $list.find('ul').append('<li style="left:' + _setLeft + '%;width:' + _w + '%"><button class="slider-num n">' + i * $step + '<span class="hidden">' + $unit + '</span></button></li>');
                                } else {
                                    $list.find('ul').append('<li style="left:' + _setLeft + '%;width:' + _w + '%"><button class="slider-num">' + i * $step + '<span class="hidden">' + $unit + '</span></button></li>');
                                }
                            }
                        }

                        if ($inp.length) $inp.val($val);
                        let range = $slider.slider({
                            min: $min,
                            max: $max,
                            value: $val,
                            step: $step,
                            range: 'min',
                            create: function (e) {
                                $slider.find('.ui-slider-handle').attr({ 'tabindex': -1 }).html('<span class="offscreen">선택한 값은</span><i>' + $val + '</i><span class="offscreen">' + $unit + '입니다.</span>');
                                $list.find('li').eq($val / $step).addClass('on');
                            },
                            stop: function (event, ui) {
                                $(ui.handle).find('i').html(ui.value);
                                if ($inp.length) $inp.val(ui.value).change();
                                $slider.data('value', ui.value);
                                $list.find('li').eq(ui.value / $step).siblings().removeClass('on');
                                $list.find('li').eq(ui.value / $step).addClass('on').children('button').attr('title', '현재선택');
                            },
                            slide: function (event, ui) {
                                if ($sync !== undefined) $($sync).val(ui.value).change();
                            }
                        });

                        $list.find('button').click(function (e) {
                            e.preventDefault();
                            let $txt = parseInt($(this).text());
                            range.slider('value', $txt);
                            $slider.find('.ui-slider-handle i').text($txt);
                            if ($inp.length) $inp.val($txt).change();
                            if ($sync !== undefined) $($sync).val($txt).change();
                            $list.find('li').removeClass('on').find('button').removeAttr('title');
                            $(this).attr('title', '현재선택').parent().addClass('on');
                        });

                        if ($sync !== undefined) {
                            $($sync).on("change", function () {
                                range.slider('value', this.value);
                            });
                        }
                    });
                }
            },
            form: function () {
                // wa-241211 | prod-chk 접근성 수정
                $(document).on('click', '.prod-chk[role=button]', function (e) {
                    let label = $(this).attr('aria-label');
                    if ($(this).hasClass('on')) {
                        $(this).attr('aria-label', label.replace(/선택됨, /g, ''));
                    } else {
                        if (label.indexOf('선택됨') < 0) {
                            $(this).attr('aria-label', '선택됨, ' + label);
                        }
                    }
                })


                // wa-241113 | aria-expanded 초기상태 제공
                $('[data-ui=toggle]').each(function () {
                    $(this).attr('aria-expanded', $(this).hasClass('on'));
                });

                // wa-241113 | toggle ui title 제공
                $('.toggle-box').each(function () {
                    let $toggle = $(this).find('[data-ui=toggle]');
                    let $label = $(this).find('.toggle-label');

                    let titleText = ($label.children().length > 0) ? $label.children().eq(0).text() : $label.text().replace(/\s/g, '');
                    $toggle.attr('title', titleText + ' 상세보기');
                })

                // wa-241113 | chk-card -> aria-label 제공
                $('.chk-card').each(function () {
                    let labelText = ''
                    $(this).find('#' + $(this).attr('aria-labelledby')).children().each(function (idx) {
                        labelText +=  (idx > 0 ? ', ' : '') + $(this).text().replace(/\s/g, '');
                    });
                    $(this).attr('aria-label', labelText);
                });

                //[접근성] 숫자 role=text
                // numLabel(); aria-label 빈값으로 읽어주지 않음

                //hr aria-hidden 추가 : 접근성
                $('hr').attr('aria-hidden', 'true');

                //textarea init
                $(".textarea").each(function () {
                    let _this = $(this);
                    let _textarea = _this.find("textarea");
                    let _numInfo = _this.find(".byte");
                    let _numInfoLen = _numInfo.length;

                    if (_numInfoLen > 0) { _this.addClass("textarea-byte") }
                    if (_textarea.is('[readonly]')) {
                        _this.closest('.textarea').addClass("textarea-readonly");
                    } else if (_textarea.is('[disabled]')) {
                        _this.closest('.textarea').addClass("textarea-disabled");
                    }
                });
                //input init
                $(".form-ele input").add(".form-ele .inp-btn, .form-ele .select-btn").each(function (e) {
                    let _this = $(this);

                    _this.parents('.form-group').find('.tip.error').attr({'role':'alert','aria-live':'assertive'}); //[접근성] error message

                    if (_this.is('[readonly], [disabled], .readonly, .disabled') || _this.parents('.form-row').is('.success, .error')) { // .select-btn 라인삭제노드 추가
                        _this.siblings('.btn-clear').remove();
                    }
                });

                $(".form-sel input[type=radio], [role=radio]").each(function (e) {
                    if($(this).prop('checked')) $(this).parents('.form-sel').addClass('on');
                    if($(this).siblings('label').attr('role') === 'text') $(this).siblings('label').removeAttr('role'); //1221 [접근성]
                    if($(this).prop('checked') && ($(this).closest('.box-wrap'))) $(this).closest('.box-wrap').addClass('on') // sscn 250630: radio box type2 추가
                    addAriaLabel($(this));
                });

                $(".form-sel input[type=checkbox], [role=checkbox]").each(function (e) {
                    // s : 0605 [접근성]
                    // if($(this).is('[readonly], [disabled], .readonly, .disabled, .disable')) {
                    //     $(this).add($(this).siblings('label')).off('click').on('click', function() {
                    //         return false;
                    //     })
                    // }
                    // e : 0605 [접근성]
                    if($(this).prop('checked')) {
                        $(this).parents('.form-sel').addClass('on');
                        if($(this).parents('.pg-wrap.wallet') && $(this).parents('.card-set')) $(this).closest('.card-wrap').addClass('on'); //1214: 전자문서지갑
                    }
                    addAriaLabel($(this));
                });

                // $('.chk-card-wrap').each(function() { //INQ_13_ 006,007,008
                //     $(this).find('.rdo').removeAttr('aria-checked');
                // });

                //select init
                $('.form-ele').each(function () {
                    let _this = $(this);
                    let _select = _this.find("select");
                    let _btn = _this.find("button");
                    let _val = _select.children("option[value='none']").index();
                    let _selected = _select.children("option:selected").index();

                    if(_btn.find('.point.sm').length) {
                        let _formLabel = _this.parents('.form-row').siblings('.form-label');
                        let _formLabelName = _formLabel.length ? _formLabel.text() : _this.parents('.section').find('[class^=ht-]').text();

                        _btn.removeAttr('title').find('.point.sm').removeAttr('aria-hidden').prepend(`<span class="hidden">${_formLabelName}</span>`);
                    } //1019 [접근성] input > 검색버튼 (집주소 등)

                    if (_btn.is('.readonly')) _btn.attr('disabled', 'disabled');

                    if (_val == 0 && _selected == 0) {
                        _this.addClass("placeholder");
                    } else {
                        _this.removeClass("placeholder");
                    }

                    if (_select.length) {
                        _select.each(function () {
                            const $sel = $(this);
                            let $selId = $sel.attr('id');
                            let $title = $sel.attr('title');
                            if ($selId == undefined) $selId = 'none';
                            if ($title == undefined) $title = '선택';
                            const $btnTitle = '팝업으로 ' + $title;
                            const $btnHtml = `<button type="button" id="${$selId}" class="select-btn ui-select-open" title="${$btnTitle}"><span class="select-btn-val">${$sel.val()}</span></button>`;

                            if (!$sel.siblings('.select-btn').length) {
                                $sel.hide().after($btnHtml);
                                const $forLbl = $('label[for="' + $selId + '"]');
                                if ($forLbl.length) {
                                    $forLbl.addClass('ui-select-lbl').attr('title', $btnTitle);
                                }
                            }
                        });
                    }
                });
            },
            event: function() {

                // document 이벤트
                $(document).off('.formEvent')
                .on("click.formEvent", "a[href='#'], a[href='#none']", function (e) { e.preventDefault(); })
                .on('click.formEvent', '.toggle-wrap.chk-list .toggle-item:not(.disable)', function(){
                    let $tgchk = $(this);
                    // //체크박스
                    // $tgchk.toggleClass('checked');

                    if ($tgchk.hasClass('checked')) {
                        // $tgchk.attr('aria-checked', true); //체크여부
                        $tgchk.closest('.toggle-wrap.chk-list').addClass('on'); //배경색상
                        $tgchk.css('z-index',1);
                    } else {
                        $tgchk.removeAttr('style');
                        // $tgchk.attr('aria-checked', false);
                        $tgchk.closest('.toggle-wrap.chk-list').removeClass('on');
                    }
                })
                .on('click.formEvent', '.toggle-wrap.chk-list .toggle-btn', function(){ //라인색상
                    let $tgbtn = $(this);
                    //토글버튼
                    if ($tgbtn.hasClass('on')) {
                        $tgbtn.closest(".toggle-wrap.chk-list").removeClass('open');
                    } else {
                        $tgbtn.closest(".toggle-wrap.chk-list").addClass('open');
                    }
                })
                .on('click.formEvent', '.info-msg-list .head-wrap', function() {
                    // 250829 이자조회 화면 card-wrap 영역 토글이 아닌 관계로 static 추가 및 수정
                    var $this = $(this).parents('.info-msg-list');
                    if($this.attr('data-ui') === "static") {
                        console.log('토글이 아닌 기본(static)')
                    } else {
                        //토글 - 강병욱
                        var $userA = $(this);
                        var $userWrap = $userA.parent('.card-wrap');
                        $userWrap.siblings('.on').removeClass('on').find('.head-wrap').attr('aria-expanded' ,'false');
                        if($userWrap.hasClass('on')){
                            $userWrap.removeClass('on').find('.head-wrap').attr('aria-expanded' ,'false');
                        }else {
                            $userWrap.addClass('on').find('.head-wrap').attr('aria-expanded' ,'true');
                        }
                    }

                })
                .on('click.formEvent', '.btns.ico-list button', function() {
                    var _btn = $(this);
                    _btn.addClass("on").siblings().removeClass("on");
                })
                .on('change.formEvent', '.form-ele select',function () {
                    const $val = $(this).val();
                    let $selectTxt = $(this).find(':selected').text();
                    if ($selectTxt == '') $selectTxt = '선택';
                    $(this).siblings('.select-btn').find('.select-btn-val').html($selectTxt);

                    if ($val == '') {
                        $(this).siblings('.select-btn').removeClass('on');
                    } else {
                        $(this).siblings('.select-btn').addClass('on');
                    }
                })
                .on('change.formEvent', 'input[type=radio]', function() {
                    let $this = $(this);
                    let $index = $this.closest('.form-sel').index(); // 250915 추가

                    if ($this.parents('.form-sel').length) {
                        let $radioGroup = $(`[name=${$this.attr('name')}]`);
                        $radioGroup.parents('.form-sel, .agree-chk, .prod-chk, .box-wrap').removeClass('on'); // sscn 250630: radio box type2 추가
                        $this.parents('.form-sel, .agree-chk, .prod-chk, .box-wrap').addClass('on'); // sscn 250630: radio box type2 추가

                        $radioGroup.each(function() {
                            $('#' + $(this).attr('aria-controls')).hide();
                        })
                        addAriaLabel($this);
                    }

                    // 250926 data-ani="characterWrap", 한달적금 이미지 애니메이션 추가
                    const $characterWrap = $("[data-ani='character-wrap']");
                    const $characterCover = $("[data-ani='character-cover']");
                    const $characterflip = $("[data-ani='character-flip']");
                    const $textBox = $characterWrap.find('.character-box .character-text .text-box');
                    if ($characterWrap.length > 0) {
                        $textBox.eq($index).addClass('on').siblings().removeClass('on');
                        $characterflip.toggleClass('on');
                        if($index == 0) {
                            $characterCover.addClass('penguin1').removeClass('penguin2'); /* 251022 수정 */
                        } else if($index == 1) {
                            $characterCover.addClass('penguin2').removeClass('penguin1'); /* 251022 수정 */
                        }
                    }
                })
                .on('change.formEvent', 'input[type=checkbox]', function() {
                    let $this = $(this);
                    // 0615:개발요청 MSB_TRA_09_006 order클래스 있는 경우 예외처리
                    if ($this.parents('.form-sel').length && !$this.parents('.form-sel').closest('.order').length) {
                        //$this.parents('.form-sel, .agree-chk, .prod-chk').toggleClass('on');
                        $this.is(':checked') === true ? $this.parents('.form-sel, .agree-chk, .prod-chk').addClass('on') : $this.parents('.form-sel, .agree-chk, .prod-chk').removeClass('on');
                    }

                    // s: sscn 251103: 약관 동의 전체체크 기능 복구
                    $agreeItem = $this.parents('.agree-inr').siblings('.agree-item'); // 1depth 동의
                    $agreeItemInr = $this.parents('.agree-item').next('.agree-item-inr'); // 2depth 하위리스트
                    $agreeItemInput = $this.parents('.agree-item-inr').prev('.agree-item').find('input'); // 2depth 동의

                    // s: sscn 250731: 선택약관동의 전체선택 수정
                    const depth1_target = $this.closest('[data-ui="terms-check"]');

                    // 1depth 동의 체크시 하위 2depth 동의 전체 체크
                    if(depth1_target && depth1_target.find('input').is(':checked') === true){
                        $agreeItemInr.find('input').prop('checked', true); // 동의체크
                    } else {
                        $agreeItemInr.find('input').prop('checked', false); // 동의해제
                    }
                    // e: sscn 250731: 선택약관동의 전체선택 수정

                    // 250227 하위 2depth동의 전체 체크시 1depth 동의 체크
                    if($this.parents('.rdoChk-group').find('input').length && $this.parents('.rdoChk-group').find('input:checked').length){
                        $agreeItemInput.prop('checked', true); // 동의체크
                        $agreeItem.find('.form-sel.lg').addClass('on');
                    } else {
                        $agreeItemInput.prop('checked', false); // 동의해제
                        $agreeItem.find('.form-sel.lg').removeClass('on');
                    }
                    // e: sscn 251103: 약관 동의 전체체크 기능 복구

                    //1214 전자문서지갑
                    if ($this.parents('.pg-wrap.wallet').length && $this.parents('.card-set').length) $this.closest('.card-wrap').toggleClass('on');
                })
                _front.scroll();
                // 이벤트 캡쳐링 필요한 경우 formEvent 이벤트 추가
                for(let v in _front.formEvent) {
                    let eventTrigger = _front.formEvent[v][0] == null ? document : document.querySelector(_front.formEvent[v][0]);
                    let eventType = _front.formEvent[v][1];
                    let eventFn = _front.formEvent[v][2];
                    let capturing = _front.formEvent[v][3];
                    for(let i in eventType) {
                        eventTrigger.removeEventListener(eventType[i], eventFn, capturing);
                        eventTrigger.addEventListener(eventType[i], eventFn, capturing);
                    }
                }

            },
            /**
             * @property {formEvent}
             * {keyName : [trigger, event type, function, capturing]}
             * trigger : null ? document:querySelector('')
             * event type : []
             * capturing : boolean 캡처링 필요할때만 true (예: mai0080100.act)
             */
            formEvent: {
                customInput:[
                    null,
                    [uiMobile.iPhoneVersion() == 12 ? 'touchend':'click'],
                    function(e) {
                        let $checkbox = $(e.target).closest('[role=checkbox]').not('.disable, .already, .chk-null');
                        let $radio = $(e.target).closest('[role=radio]').not('.disable, .already, .chk-null');
                        if($checkbox.length) {
                            $checkbox.toggleClass('checked').attr('aria-checked', $checkbox.hasClass('checked'));

                            let $child = $checkbox.siblings('.chk-card-wrap').find('[role=text]').not('.disable, .already');
                            $child.toggleClass('active');
                            addAriaLabel($checkbox);
                        }else if($radio.length) {
                            let $radioGroup = $radio.parents('[role=radiogroup]');
                            if($radioGroup.length) {
                                $radioGroup.find('[role=radio]').removeClass('checked selected');
                                $radioGroup.find('[role=radio]').removeAttr('aria-checked');
                            }else {
                                console.log('[role=radiogroup]을 추가해주세요')
                                // $radio.siblings().removeClass('checked selected').removeAttr('aria-checked');
                            }
                            $radio.addClass('checked selected').attr('aria-checked', true);
                        }
                    },
                    true
                ],
                setClass: [
                    null,
                    // [uiMobile.iOS() ? 'click' : 'focusin'],
                    ['focusin'], // sscn 251202: ios 이벤트 수정
                    function(e) {
                        let $this = $(e.target);
                        let targets = '.textarea, .form-ele';
                        // mod-date:1016: [개발대응] 안드로이드 키패드 스티키 버튼 위치 fixed -> relative
                        if($this.is($inputEl)) {
                            // sscn 251212: keypad-up 수정불가인 경우 체크 추가
                            if (!$this.is('[readonly], [disabled]')) $this.closest('.pg-wrap').find('.pg-footer').addClass('keypad-up')
                        }
                        if($this.closest(targets).length && !$this.closest(targets).hasClass('focus')) {
                            // S : input btn-clear 버튼
                            let $parent = $this.closest(".form-ele");
                            if($this.is('.form-ele input') && $parent.find('.btn-clear').length == 0) {
                                // 버튼 추가
                                if (!$this.parents('.form-group').is('.between') && !$this.parents('.form-row').is('.col') && !$parent.is('.outline') && $this.is(':not([type=tel])') && !$this.is('[readonly], [disabled]') && !$this.parents('.unit').is('.decimal') && !$this.is('.right') && !$this.is('.none-clear')) {
                                    $this.after('<button type="button" class="btn-clear"><span class="hidden">입력내용 초기화</span></button>'); // mod-date:1128: parents.append -> this.after로 포커스 논리순서를 위해 변경
                                    $(document).off('click', '.form-ele .btn-clear').on('click', '.form-ele .btn-clear', function(e) {
                                        $(e.target).hide().parent(".form-ele").find('input').val('').focus();
                                        // sscn 251208: aos 키패드 대응
                                        setTimeout(()=>$this.closest('.pg-wrap').find('.pg-footer').addClass('keypad-up'))
                                    });
                                }
                                // 버튼 여백
                                if ($this.siblings('button').length) {
                                    let _inpBtnW = Math.round($this.siblings('button').not('.btn-clear').outerWidth() + .6);
                                    if (!$this.is('[type=tel]')) {
                                        $this.siblings(".btn-clear").css('right', _inpBtnW + 'px');
                                    } else {
                                        $this.css('padding-right', _inpBtnW + 'px');
                                    }
                                };
                            }
                            // E : input btn-clear 버튼
                            if(($this.is($inputEl) || $this.is('.inp-btn, .select-btn, .textarea')) && !$this.is('[readonly], .readonly, .disabled')) {
                                if($this.parents('.success, .error').length == 0) {
                                    //$this.parents('.form-group').siblings().find(targets).removeClass('focus'); //0824(smp0050101)
                                    //$this.closest(targets).addClass('focus');
                                    $this.parents('.form-group').siblings().find(targets).removeClass('focus');
                                    $this.closest(targets).addClass('focus');
                                }
                            }

                        }
                        if($this.closest('.form-date-term')) $this.closest('.form-date-term').addClass('focus');
                        if($this.val() !== '' && $this.closest('.inp-ref-wrap').length) $this.closest(".form-row").find(".inp-ref-pos").show();
                        if($this.val() !== '' && $this.siblings('.btn-clear').length) $this.siblings('.btn-clear').show();
                        else $this.siblings('.btn-clear').hide();
                    },
                    false
                ],
                removeClass: [
                    null,
                    // [uiMobile.iOS() ? 'mouseout' : 'focusout'], // mod-date:1016: blur event 삭제
                    ['focusout'], // sscn 251202: ios 이벤트 수정
                    function(e) {
                        let $this = $(e.target);
                        let targets = '.textarea, .form-ele, .form-date-term, .form-row';
                        // mod-date:1016: [개발대응] 안드로이드 키패드 스티키 버튼 위치 relative -> fixed
                        if($this.is($inputEl)) {
                            setTimeout(function(){
                                $this.closest('.pg-wrap').find('.pg-footer').removeClass('keypad-up')
                            }, $this.closest(".form-row").find(".inp-ref-pos").is(":visible") ? 200 : 0);
                        }
                        if($this.is($inputEl) || $this.is('.inp-btn, .select-btn')) {

                            if($this.is('textarea') || $this.is('input')) {
                                //$this.closest(targets).removeClass('focus');
                                $this.closest(targets).removeClass('focus');
                            }
                            // 0726:개발요청으로 삭제
                            // if(pubOnly) {
                                //if(!$this.hasClass('pop--focused')) $this.closest(targets).removeClass('focus');
                                if(!$this.hasClass('pop--focused')) $this.closest(targets).removeClass('focus');
                            // }
                            setTimeout(function(){
                                if (!($this.is(":focus"))) $this.closest(".form-row").find(".inp-ref-pos").hide();
                                if (!($this.is(":focus"))) $this.siblings(".btn-clear").hide();
                            }, 200);
                        }
                    },
                    false
                ],
                input: [
                    null,
                    ['keyup'],
                    function(e) {
                        if($(e.target).is('.form-ele input')) {
                            let $this = $(e.target);
                            $this.next('.unit').addClass('on');
                            if (!$this.val().length) {
                                $this.next('.unit').removeClass('on');
                                $this.siblings(".btn-clear").hide()
                            }else {
                                $this.siblings(".btn-clear").show()
                                if(pubOnly && $this.closest('.inp-ref-wrap').length) $this.closest(".form-row").find(".inp-ref-pos").show();
                            }
                        }
                    },
                    false
                ],
            },
        };

        let scTop = {
            init: function () {
                scTop.btnSctop();
            },
            btnSctop: function () {
                $(document).on('click', '.btn-sctop', function (e) {
                    let $html = $('html, body');
                    $this = $(this);
                    $offsetTop = $this.offset().top - 70;
                    if (!$('.sctop-fix').hasClass('on')) {
                        $html.animate({ scrollTop: $offsetTop }, 300);
                    }
                    e.preventDefault();
                });
            },
            topMove: function (e) {
                let $tar = $(e),
                    $pBody = $tar.closest('.pop-body'),
                    $header = $tar.closest('.pg-wrap').find('.pg-header'),
                    $tabFixed = $tar.closest('.pg-wrap').find('.tab-list-wrap.fixed'),
                    _hH = $header.length > 0 ? $header.outerHeight() : 70,
                    _tH = $tabFixed.length > 0 ? $tabFixed.outerHeight() : 20,
                    $notMoveEl = '.main-account';
                $html = $('html, body');

                //if ($tar.is('.tit') && $tar.parents().is('[data-ui=accordion]') || $tar.parents().is($notMoveEl) || $('body').height() >= $('.pg-wrap').height()) {

                //console.log('aaa: ' + $('body').height(), $('.pg-wrap').height())
                // mod-data:1013: $('.pg-wrap').height() -> $tar.closest('.pg-wrap').height()
                if ($('body').height() >= $tar.closest('.pg-wrap').height()) {
                    return false;
                } else {
                    $pBody.length ? $pBody.animate({ 'scrollTop': $tar.position().top }, 0) : $html.animate({ 'scrollTop': $tar.offset().top - (_hH+_tH) }, 0);
                }
                $tar.attr('tabindex', 0).focus();
                //setTimeout(function () { $tar.removeAttr('tabindex') }, 100);
            }
        }

        //레이어팝업(Layer): 레이어 팝업은 .pg-container 밖에 위치해야함
        let Layer = {
            id: 'uiLayer',
            popClass: 'popup',
            pageClass: 'page',
            wrapClass: 'pop-wrap',
            sclWrapClass: 'pop-scl-wrap',
            headClass: 'pop-head',
            bodyClass: 'pop-body',
            contClass: 'pop-section',
            tabClass: 'tab-scroller',
            footClass: 'pop-foot',
            innerClass: 'section',
            showClass: 'show',
            loadClass: 'load-show',
            etcCont: '.pg-header,.pg-gnb,.pg-container,.pg-footer',
            focusedClass: 'pop--focused',
            focusInClass: 'ui-focus-in',
            removePopClass: 'ui-pop-remove',
            closeRemoveClass: 'ui-pop-close-remove',
            alertClass: 'ui-pop-alert',
            lastPopClass: 'ui-pop-last',
            bgNoCloseClass: 'bg-no-click',
            noDimmedClass: 'no-dimmed',
            beforeCont: [],
            content: '',
            overlapChk: function () {
                //focus 이벤트 시 중복열림 방지
                const $focus = $(':focus');
                if (!!event) {
                    if (event.type === 'focus' && $($focus).hasClass(Layer.focusedClass)) {
                        return false;
                    }
                }
                //같은 내용 중복열림 방지
                if (Layer.beforeCont.indexOf(Layer.content) >= 0) {
                    return false;
                } else {
                    Layer.beforeCont.push(Layer.content);
                }
                return true;
            },
            alertHtml: function (type, popId, btnActionId, btnCancelId) {
                let $html = '<div id="' + popId + '" class="' + Layer.popClass + ' modal alert ' + Layer.alertClass + '" role="dialog" aria-hidden="true">';
                $html += '<article class="' + Layer.wrapClass + '">';
                $html += '<div class="' + Layer.headClass + '"><h1>알림</h1></div>';
                $html += '<div class="' + Layer.bodyClass + '">';
                $html += '<div class="' + Layer.innerClass + '">';
                if (type === 'prompt') {
                    $html += '<div class="form-lbl mt-0">';
                    $html += '<label for="inpPrompt" role="alert" aria-live="assertive"></label>';
                    $html += '</div>';
                    $html += '<div class="form-item">';
                    $html += '<div class="input"><input type="text" id="inpPrompt" placeholder="입력해주세요."></div>';
                    $html += '</div>';
                } else {
                    $html += '<div class="message">';
                    $html += '<div role="alert" aria-live="assertive"></div>';
                    $html += '</div>';
                }
                $html += '</div>';
                $html += '</div>';
                $html += '<div class="' + Layer.footClass + '">';
                if (type === 'positive') { // 250515 positive 케이스 추가
                    $html += '<div class="btns between">';
                    $html += '<button type="button" id="' + btnCancelId + '" class="btn primary2">다른 상품 보기 </button>';
                } else {
                    $html += '<div class="btns">';
                    if (type === 'confirm' || type === 'prompt') {
                        $html += '<button type="button" id="' + btnCancelId + '" class="btn secondary lg">취소</button>';
                    }
                }
                $html += '<button type="button" id="' + btnActionId + '" class="btn primary lg">확인</button>';
                $html += '</div>';
                $html += '</div>';
                $html += '</article>';
                $html += '</div>';

                $('body').append($html);
            },
            alertEvt: function (type, option, callback, callback2, callback3, callback4) {
                const $length = $('.' + Layer.alertClass).length;
                const $popId = Layer.id + 'Alert' + $length;
                const $actionId = $popId + 'ActionBtn';
                const $cancelId = $popId + 'CancelBtn';

                if (typeof option === 'object') {
                    Layer.content = option.content;
                } else if (typeof option == 'string') {
                    //약식 설절
                    Layer.content = option;
                }

                //텍스트가 아닌 배열이나 객체일때 텍스트 변환
                if (typeof Layer.content !== 'string') Layer.content = JSON.stringify(Layer.content);

                //내용있는지 체크
                if ($.trim(Layer.content) == '' || Layer.content == undefined) return false;

                //중복팝업 체크
                if (Layer.overlapChk() === false) return false;

                //팝업그리기
                Layer.alertHtml(type, $popId, $actionId, $cancelId);
                if (!!option.title || (typeof callback === 'string' && callback !== '')) {
                    const $insertTit = typeof callback === 'string' && callback !== '' ? callback : option.title;
                    console.log($insertTit);
                    ($insertTit === 'noTitle') ? $('#' + $popId).find('.' + Layer.wrapClass + ' h1').remove() : $('#' + $popId).find('.' + Layer.wrapClass + ' h1').html($insertTit);
                }
                let $actionTxt;
                if (!!option.actionTxt) $actionTxt = option.actionTxt;
                if (typeof callback2 === 'string' && callback2 !== '') $actionTxt = callback2;
                if ($actionTxt) $('#' + $actionId).text($actionTxt);

                let $cancelTxt;
                if (!!option.cancelTxt) $cancelTxt = option.cancelTxt;
                if (typeof callback3 === 'string' && callback3 !== '') $cancelTxt = callback3;
                if ($cancelTxt) $('#' + $cancelId).text($cancelTxt);

                const $htmlContent = Layer.content;
                if (type === 'prompt') {
                    $('#' + $popId)
                        //.find('.form-lbl label')
                        .html($htmlContent);
                } else {
                    const $textAry = $htmlContent.split(' '),
                        $textLengthAry = [];
                    for (let i = 0; i < $textAry.length; i++) {
                        $textLengthAry.push($textAry[i].length);
                    }
                    const $maxTxtLength = Math.max.apply(null, $textLengthAry);
                    if ($maxTxtLength > 20)
                        $('#' + $popId)
                            .find('.message>div')
                            .addClass('breakall');
                    $('#' + $popId)
                        .find('.message>div')
                        .html($htmlContent);
                }

                // s: sscn 250704: 얼럿 타입추가
                let $curentPgWrap = $pgWrap();
                if ($curentPgWrap.is('.sscn, .ty-child')) $('#' + $popId).addClass('sscn')
                // e: sscn 250704: 얼럿 타입추가

                Layer.open('#' + $popId);

                //click
                let $result = '';
                const $actionBtn = $('#' + $actionId);
                const $cancelBtn = $('#' + $cancelId);
                let $inpVal = '';

                $actionBtn.on('click', function () {
                    $result = true;
                    $inpVal = $('#' + $popId)
                        .find('.form-ele input')
                        .val();

                    const $actionEvt = function () {
                        if (type === 'prompt') {
                            if (!!option.action) option.action($result, $inpVal);
                            if (!!option.callback) option.callback($result, $inpVal);
                            if (typeof callback === 'function') callback($result, $inpVal);
                            if (typeof callback2 === 'function') callback2($result, $inpVal);
                            if (typeof callback3 === 'function') callback3($result, $inpVal);
                            if (typeof callback4 === 'function') callback4($result, $inpVal);
                        } else {
                            if (!!option.action) option.action($result);
                            if (!!option.callback) option.callback($result);
                            if (typeof callback === 'function') callback($result);
                            if (typeof callback2 === 'function') callback2($result);
                            if (typeof callback3 === 'function') callback3($result);
                            if (typeof callback4 === 'function') callback4($result);
                        }
                    };
                    Layer.close('#' + $popId, $actionEvt);
                });
                $cancelBtn.on('click', function () {
                    $result = false;
                    const $cancelEvt = function () {
                        if (!!option.cancel) option.cancel();
                        if (!!option.callback) option.callback($result);
                        if (typeof callback === 'function') callback($result);
                        if (typeof callback2 === 'function') callback2($result);
                        if (typeof callback3 === 'function') callback3($result);
                        if (typeof callback4 === 'function') callback4($result);
                    };
                    Layer.close('#' + $popId, $cancelEvt);
                });
            },
            alert: function (option, callback, callback2, callback3) {
                Layer.alertEvt('alert', option, callback, callback2, callback3);
            },
            confirm: function (option, callback, callback2, callback3, callback4) {
                Layer.alertEvt('confirm', option, callback, callback2, callback3, callback4);
            },
            positive: function (option, callback, callback2, callback3, callback4) { // 250515 positive 케이스 추가
                Layer.alertEvt('positive', option, callback, callback2, callback3, callback4);
            },
            prompt: function (option, callback, callback2, callback3, callback4) {
                Layer.alertEvt('prompt', option, callback, callback2, callback3, callback4);
            },
            BottomChkSelect: function(){ //Check List in BottomSheet
                $('.list-block').off('click').on('click', function(){ //.pop-body
                    if ($(this).parents('.multi-check').length > 0) {
                        $(this).hasClass('selected') ? $(this).removeClass('selected').attr('title','선택해제됨') : $(this).addClass('selected').attr('title','선택됨');
                    } else {
                        $(this).addClass('selected').attr('title','선택됨').siblings().removeClass('selected').removeAttr('title');
                    }
                })
                $('.pop-body .list-block-btn').off('click').on('click', function(){
                    if ($(this).parents('.multi-check').length > 0) {
                        $(this).hasClass('selected') ? $(this).removeClass('selected').attr('title','선택해제됨') : $(this).addClass('selected').attr('title','선택됨');
                    } else {
                        $(this).addClass('selected').attr('title','선택됨').parents('.list-block-wrap').siblings().find('.list-block-btn').removeClass('selected').removeAttr('title');
                    }
                })
            },
            bottomTouch: function (tar) {
                const $popup = $(tar);
                const $wrap = $popup.find('.' + Layer.wrapClass);
                const $head = $popup.find('.' + Layer.headClass);
                const $body = $popup.find('.' + Layer.bodyClass);
                const $tabScroller = $body.find('.' + Layer.tabClass);
                const $foot = $popup.find('.' + Layer.footClass);
                const $trigger = $popup.hasClass('body-swipe') ? Layer.tabClass : Layer.headClass;
                let _footH = 0;
                if ($foot.length) _footH = $foot.outerHeight();
                //swipe 영역 추가
                if ($popup.hasClass('is-swipe') && !$head.find('span.swipe').length) $head.prepend('<span class="swipe"></span>');
                const _headH = $head.outerHeight() + 24;
                const $bodyMinHeight = $popup.find('span.swipe').outerHeight();

                let isMove = false;
                const $animateSpeed = 300;
                let $startH = 0;
                let $startX = 0;
                let $startY = 0;
                let $distanceX = 0;
                let $distanceY = 0;
                let $directionX = false;
                let $directionY = false;
                let $duration = 0;
                let $durationTimer;

                $(tar)
                    .find('.' + $trigger)
                    .on('touchstart mousedown', function (e) {
                        isMove = true;
                        const $this = $(this);
                        const $clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
                        const $clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
                        $startX = $clientX;
                        $startY = $clientY;
                        $startH = $this.closest('.' + Layer.wrapClass).outerHeight();
                        $distanceX = 0;
                        $distanceY = 0;
                        $directionX = false;
                        $directionY = false;
                        if ($this.data('first-height') === undefined) $this.data('first-height', $startH);
                        if ($this.data('is-full') === undefined) $this.data('is-full', false);
                        $duration = 0;
                        $durationTimer = setInterval(function () {
                            $duration += 10;
                        }, 10);
                        $wrap.stop(false, true);
                        if ($(tar).hasClass('touch-move')) $(tar).addClass('touch-moving');
                        if($tabScroller.hasClass('scroll')) $tabScroller.css('overflow-y','hidden');

                    });

                $(tar)
                    .find('.' + $trigger)
                    .on('touchmove mousemove', function (e) {
                        if (!isMove) return false;
                        const $this = $(this);
                        const $clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
                        const $clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
                        $distanceX = $clientX - $startX;
                        $distanceY = $clientY - $startY;

                        const $min = $bodyMinHeight;
                        const $max = $(tar).hasClass('touch-move') ? $popup.height() : $popup.outerHeight();
                        const $height = Math.max($min, Math.min($max, $startH - $distanceY));
                        const _bodyH = $height - _headH - _footH;

                        $wrap.css('height', $height);
                        $body.css('max-height', _bodyH);
                    });

                $(tar)
                    .find('.' + $trigger)
                    .on('touchend mouseup mouseleave', function (e) {
                        if (!isMove) return false;
                        isMove = false;
                        const $this = $(this);
                        const $isFull = $this.data('is-full');
                        const $clientX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
                        const $clientY = e.type === 'touchend' ? e.changedTouches[0].clientY : e.clientY;
                        $distanceX = $clientX - $startX;
                        $distanceY = $clientY - $startY;
                        if ($distanceX !== 0) $directionX = $distanceX > 0 ? 'right' : 'left';
                        if ($distanceY !== 0) $directionY = $distanceY > 0 ? 'down' : 'up';
                        const $firstHeight = $this.data('first-height');
                        const $min = $bodyMinHeight;
                        const $max = $(tar).hasClass('touch-move') ? $popup.height() : $popup.outerHeight();

                        clearInterval($durationTimer);
                        const $powerRatio = $duration === 0 || $distanceY === 0 ? 0 : Math.abs($distanceY) / $duration;
                        const $power = (1 + Math.round($powerRatio * 3)) * Math.round($powerRatio * 30);
                        const $powerDistance = Math.round((($distanceY * -1) / $duration) * $power);
                        if ($(tar).hasClass('touch-move')) {
                            $(tar).removeClass('touch-moving');
                            const $wrapHeight = $wrap.outerHeight();
                            const $endHeight = Math.max($min, Math.min($max, $wrapHeight + $powerDistance));
                            const $endSpeed = Math.min(2000, Math.abs($powerDistance * 10));

                            if ($directionY === 'up') {
                                $wrap.animate({ height: $endHeight }, $endSpeed, 'easeOutQuint');
                            } else if ($directionY === 'down' && $tabScroller.hasClass('scroll')) {
                                //Layer.close(tar);
                                $wrap.animate({ height: $endHeight }, $endSpeed, 'easeOutQuint');
                            }
                            $body.css('max-height', $endHeight - _headH - _footH);

                        } else if ($(tar).hasClass('body-swipe')) {
                            const _tabS = $tabScroller.scrollTop();
                            const _tabH = $body.find('.tab-list').outerHeight();
                            (_tabS <= 0) ? $tabScroller.removeClass('on').addClass('scroll') : $tabScroller.removeClass('scroll').addClass('on');
                            if (Math.abs($distanceY) > 25) {
                                if ($popup.hasClass('bottom') && !$isFull) {
                                    //if ($directionY === 'up' && $this.hasScroll()) {
                                    if ($directionY === 'up') {
                                        $wrap.animate({ height: '100%' }, $animateSpeed);
                                        $tabScroller.css('max-height', parseInt(Layer.popMaxH - _headH - _footH - _tabH));
                                        $tabScroller.removeClass('scroll').addClass('on');
                                        $tabScroller.css('overflow-y','');
                                    } else if ($directionY === 'down' && $tabScroller.hasClass('scroll')) {
                                        $wrap.animate({ height: $popup.data('isWrapH') }, $animateSpeed);
                                        //const _popH = parseInt(($(window).height() / 3) * 2);
                                        const _popH = parseInt($(window).height() * 0.8);
                                        setTimeout(function(){
                                            if ($popup.hasClass('transfer') || $popup.hasClass('half') || $popup.hasClass('default')) {
                                                $tabScroller.css('max-height', parseInt($popup.data('isBodyH') - _tabH));
                                            } else {
                                                $tabScroller.css('max-height', parseInt(_popH - _headH - _footH - _tabH));
                                            }
                                        }, 300);
                                    }
                                }
                            }
                        } else {
                            if (Math.abs($distanceY) > 25) {
                                if ($popup.hasClass('bottom') && !$isFull) {
                                    if ($directionY === 'up') {
                                        $wrap.animate({ height: '100%' }, $animateSpeed);
                                    } else if ($directionY === 'down') {
                                        Layer.close(tar);
                                    }
                                }
                            } else {
                                $wrap.animate({ height: $firstHeight }, $animateSpeed, function () {
                                    $this.removeData('first-height');
                                });
                            }
                        }

                        $this.removeData('is-full');
                    });
            },
            moveStream: function () { //연속팝업
                $(document).on('click', '.stream-wrap [data-ui=pop-next]', function (e) {
                    let $this = $(this),
                        $popWrap = $this.parents('.pop-wrap'),
                        $dataNo = $this.data('no');

                    $popWrap.find('.stream-wrap').eq($dataNo).css('display', '').show().siblings('.stream-wrap').hide();
                    $popWrap.parents('.popup').data('no', $dataNo); //0726:포커스이슈 있어 data에 마지막 순서 저장
                    let $isShowing = $popWrap.find(".tab-list[role='tablist'] .active");
                    ($isShowing.is(":visible")) ? $isShowing.trigger('click') : null;  // [0324] 온주담 검수를 위해 임시적용
                    UICommon.Layer.setHeight('#'+$popWrap.parents('.popup').attr('id')); // 0824(smp0050101)
                });
            },
            toast: function (txt, fn, type, delayTime) {
                if (type === undefined) type = 'toast';
                const $isAlarm = type === 'alarm';
                const $isFn = !!fn;
                const $className = '.' + type + '-box';
                const $overlap = $(".alarm-box.on");

                if ($overlap.length) return;
                if (delayTime == undefined) delayTime = 2000;
                let $boxHtml = '<div class="' + $className.substring(1) + '" role="alert" aria-live="assertive" aria-atomic="true" tabindex="0">';

                if ($isFn) {
                    $boxHtml += '<button type="button" class="txt">' + txt + '</button>';
                } else {
                    $boxHtml += '<div class="txt">' + txt + '</div>';
                }
                if ($isAlarm) {
                    $boxHtml += '<button type="button" class="pop-close-x" data-ui="pop-close" title="알람팝업 닫기"></button>';
                }
                $boxHtml += '</div>';

                // s: sscn 251105: 토스트 생성 수정
                // 개발에서 여러개의 .pg-wrap 사용하는 경우 토스트가 중복 생성되어 수정함
                // $('.pg-wrap').before($boxHtml);
                $pgWrap().before($boxHtml);
                // e: sscn 251105: 토스트 생성 수정
                const $toast = $($className).last();
                const $toastClose = function () {
                    $toast.removeClass('on');
                    $toast.one('transitionend', function () {
                        $(this).remove();
                    });
                };
                const $spaceH = $('.bottom-fixed-space').outerHeight();
                if ($spaceH) {
                    $toast.css('bottom', $spaceH);
                }
                // s: sscn 250704: 토스트 위치추가
                let $curentPgWrap = $pgWrap();
                if ($curentPgWrap.is('.sscn, .ty-child') && $curentPgWrap.find('.pg-footer').length > 0) {
                    $toast.attr({
                        style: `bottom: calc(constant(safe-area-inset-bottom) + 10.4rem); bottom: calc(env(safe-area-inset-bottom) + 10.4rem); bottom: 10.4rem;`
                    });
                }
                // e: sscn 250704: 토스트 위치추가
                setTimeout(function () {
                    $toast.addClass('on');
                    $($className).attr('tabindex', 0).focus();
                }, 10);
                let $closeTime;
                if (!$isAlarm) {
                    $closeTime = setTimeout($toastClose, delayTime);
                }
                if ($isFn) {
                    $toast.find('a.txt').one('click', function (e) {
                        e.preventDefault();
                        fn();
                        // 이벤트 실행시 바로 닫기
                        clearTimeout($closeTime);
                        $toastClose();
                    });
                }
            },
            // alarm: function (txt, fn, delayTime) {idx
            //     Layer.toast(txt, fn, 'alarm', delayTime);
            // },
            reOpen: false,
            openEl: '',
            openPop: [],
            opening: 0,
            popMaxH: $(window).height() * 0.8, // mod-date:0919
            setHeight: function(tar) { // 0824 함수에 담아서 사용
                const $popup = $(tar);
                const $wrap = $popup.find('.' + Layer.wrapClass);
                const $head = $wrap.find('.' + Layer.headClass);
                const $foot = $wrap.find('.' + Layer.footClass);
                const $body = $wrap.find('.' + Layer.bodyClass);
                const _headH = $head.outerHeight() + ($popup.hasClass('bottom') ? 24 : 20); //const _headH = $head.outerHeight();
                let _footH = 0;

                if ($foot.length) {
                    _footH = $foot.css('display') == 'none' ? 0 : $foot.filter(':visible').outerHeight(); // 0727: 높이 수정
                    $popup.addClass('foot');
                }
                // s: mod-date:0919: 헤더푸터 높이값 지정
                //const _parseHeadH = $head.length ? $head.outerHeight() : 0;
                const _parseHeadH = $head.length ? 80 : 0; //1213: 연속바텀 height 임의지정
                const _parseFootH = $foot.length ? $foot.css('display') == 'none' ? 0 : $foot.outerHeight() : 0;
                const _dataHeight = $popup.attr('data-height') ? $popup.attr('data-height') : Layer.popMaxH + 'px';
                const _dataBodyH = $body.css('max-height', `calc(${_dataHeight} - ${_parseHeadH/10}rem - ${_parseFootH/10}rem)`);
                // 2: mod-date:0919: 헤더푸터 높이값 지정

                // 0221 links 하단링크 포함시 하단공백 부분
                if ($popup.hasClass('links')) {
                    $body.css('max-height', Layer.popMaxH - _headH - _footH);
                    $wrap.find(".fixed-btm").css("top", parseInt(Layer.popMaxH) - 50);
                } else if ($popup.find('.stream-wrap').length > 0)  {
                    //$body.css('max-height', Layer.popMaxH - _headH - _footH - 50);
                    $wrap.find('.pop-wrap, .stream-wrap').css('height', ($popup.hasClass('fix') || $popup.attr('data-height')) ? _dataBodyH : 'auto');
                } else {
                    _dataBodyH
                }
            },
            open: function (tar, popTitle, popClose, callback) {
                const _this = this;
                const $popup = $(tar);
                const $popWrap = $popup.find('.' + Layer.wrapClass);
                const $popHead = $popWrap.find('.' + Layer.headClass);
                const $popBody = $popup.find('.' + Layer.bodyClass);
                const $btnPopClose = $popup.find('.pop-wrap .pop-close');
                const $tabScroller = $popup.find('.' + Layer.tabClass);
                const no = event && $(event.target).data('no') ? $(event.target).data('no') : 0;
                if(no !== null) $popup.data('no', no); //0726: 포커스 수정
                $('html').removeClass('keypad-open');
                if($popup.closest('.pg-wrap').length && $popup.find($inputEl).length || $popup.hasClass('more')){
                    $('.pg-wrap').after($popup);
                }
                if ($('.pg-wrap').length && !$popup.hasClass('no-dimmed')) $('.pg-wrap').attr({'aria-hidden': true});
                if ($('.pg-container').length && !$popup.hasClass('no-dimmed')) $('.pg-container').attr({'aria-hidden': true});

                // // mod-date:1130:접근성 수정
                if ($popup.hasClass('loading')) {
                    // 개발공통에서 팝업이 닫힐때 Layer.close() 를 실행안하고 다른 로직이 있어서...
                    $popup.attr('aria-hidden', false);
                }

                if ($tabScroller.length) $tabScroller.removeClass('on').addClass('scroll');
                if ($popup.length && $popWrap.length) {
                    Layer.opening++;
                    const $idx = $popup.index('.' + Layer.popClass);
                    const $show = $('.' + Layer.popClass + '.' + Layer.showClass).not('.' + Layer.alertClass).length;
                    const $alertShow = $('.' + Layer.popClass + '.' + Layer.showClass + '.' + Layer.alertClass).length;
                    let $id = $popup.attr('id');
                    // mode-date:1010:실행 순서 변경:0920:팝업 높이 지정 data-height="??vh" 체크
                    if($popup.data('height')) $popup.find('.' + Layer.wrapClass).css('max-height', $popup.data('height'));
                    let $lastPop = '';

                    if (Layer.openPop.length) $lastPop = Layer.openPop[Layer.openPop.length - 1];
                    if ($popup.hasClass(Layer.alertClass && !$alertShow)) {
                        $popup.css('z-index', '+=' + $alertShow);
                    } else if ($show) {
                        $popup.css('z-index', '+=' + $show);
                    }
                    if ($id == undefined) {
                        $id = Layer.id + $idx;
                        $popup.attr('id', $id);
                    }
                    if ($btnPopClose.length) $btnPopClose.attr('id', $id + '-dev');

                    if (popTitle != undefined && popTitle != null && popTitle != '') $popup.find('.pop-head h1').text(popTitle);
                    if (popTitle === 'noTitle' && popTitle != '') $popup.find('.pop-head h1').empty();
                    if ($btnPopClose.length && popClose === 'noClose') {
                        $popup.addClass('no-close');
                        $btnPopClose.remove();
                    }
                    if (!$popup.hasClass(Layer.alertClass)) {
                        if (Layer.openPop.length) {
                            let $last;
                            $.each(Layer.openPop, function () {
                                const $this = '' + this;
                                if (!$($this).hasClass(Layer.alertClass)) $last = $this;
                            });
                            $($last).removeClass(Layer.lastPopClass);
                        }
                        $popup.addClass(Layer.lastPopClass);
                    }
                    if (Layer.openPop.indexOf('#' + $id) < 0) Layer.openPop.push('#' + $id);

                    // bg close
                    /*
                    if (!$popup.hasClass(Layer.alertClass) && !$popup.hasClass(Layer.bgNoCloseClass)) {
                        const $bgClick = '<div class="pop-bg-close" data-ui="pop-close" role="button" aria-label="팝업창 닫기"></div>';
                        if (!$popup.find('.pop-bg-close').length) $popup.prepend($bgClick);
                    }
                    *//* 0825: [기획요청] 딤드닫기 기능삭제 */

                    const $openDelay = 100 * Layer.opening;
                    const $callbackDelay = 450;

                    //if ($popup.hasClass('bottom')) $popup.find('.pop-body').addClass('scroll');
                    if ($popup.hasClass('bottom')) { //0918 컨펌버튼 영역 테스트
                        $('.pg-wrap').find('.pg-footer').addClass('nofix');
                        $popup.find('.pop-body').addClass('scroll');
                    }
                    if ($popup.hasClass('bottom') && $popup.find('.tab-wrap').length) {
                        $popup.find('.pop-body').addClass('is-tab');
                        $popup.find('.stream-wrap').each(function() { //연속팝업+tabmenu
                            if ($popup.find('.tab-wrap')) {
                                $popup.find('.pop-body').removeClass('is-tab');
                                $popup.find('.stream-wrap .tab-wrap').parent('.pop-body').addClass('is-tab');
                            }
                        })
                        if(!$popup.find('.tab-scroller').length) $popup.find('.tab-wrap').contents().not('.tab-list').wrapAll('<div class="tab-scroller scroll"></div>');
                        $popup.hasClass('transfer') ? $popup.addClass('body-swipe') : $popup.addClass('body-swipe default'); //tab 메뉴 체크
                    }

                    $popup.attr('aria-hidden', false);
                    if ($popup.hasClass('modal')) {
                        $popup.css('display', 'flex');
                    } else {
                        $popup.show();
                    }

                    // wa-241204 | popup input aria-label
                    $popup.find('.form-sel').find('input[type=checkbox], input[type=radio]').each(function (idx, el) {
                        addAriaLabel($(this));
                    });

                    const $FocusEvt = function (event) {
                        //리턴 포커스
                        let $focusEl = '';
                        try {
                            if (event.currentTarget != document) {
                                $focusEl = $(event.currentTarget);
                            } else {
                                $focusEl = $(document.activeElement);
                            }
                        } catch (error) {
                            $focusEl = $(document.activeElement);
                        }

                        if (Layer.openEl != '' && !$focusEl.is($focusableEl)) $focusEl = $(Layer.openEl);
                        if ($($lastPop).data('returnFocus') == $focusEl) $focusEl = $(Layer.openEl);
                        if ($($focusEl).is($focusableEl)) {
                            $popup.data('returnFocus', $focusEl);
                            $focusEl.addClass(Layer.focusedClass);
                          //  if ($focusEl.hasClass('select-btn')) $focusEl.closest('.form-ele').addClass('focus'); 2/24 수정
                        }

                        // 팝업 in 포커스
                        // wa-241204 | focus: pop-head h1, pop-close
                        let $h1 = $popWrap.find('.pop-head h1');
                        let isTitle = $h1.length > 0 && $h1[0].textContent.replace(/\s/g, '').length > 0;
                        if (isTitle) {
                            $popHead.removeAttr('tabindex');
                            $popHead.find('h1').attr('tabindex', 0).focus().one('blur', e => $(e.target).removeAttr('tabindex'));
                        } else {
                            if ($btnPopClose.length > 0) {
                                $popWrap.prepend($btnPopClose).find('.pop-close').focus();
                            } else {
                                $popWrap.attr('tabindex', 0).focus().one('blur', e => $(e.target).removeAttr('tabindex'));
                            }
                        }
                    };

                    setTimeout(function () {
                        $(Layer.etcCont).attr({'aria-hidden': true});

                        //열려있는 팝업
                        // wa-241205 | popup stream-wrap - aria-hidden:false
                        if (Layer.openPop.length && $lastPop) {
                            if (!$($lastPop).hasClass('stream-wrap')) {
                                $($lastPop).attr({'aria-hidden': true});
                            }
                        }

                        //웹접근성
                        const $tit = $popup.find('.' + Layer.headClass + ' h1');
                        if ($tit.length) {
                            if ($tit.attr('id') == undefined) {
                                $tit.attr('id', $id + 'Label');
                                // $popup.attr('aria-labelledby', $id + 'Label');       // wa-241204 | popup aria-labelledby 삭제
                            } else {
                                // $popup.attr('aria-labelledby', $tit.attr('id'));     // wa-241204 | popup aria-labelledby 삭제
                            }
                        }

                        //팝업안 고정탭
                        if ($popup.find('.tab-wrap').length) tabMenu.init();

                        //팝업안 swiper
                        if ($popup.find('.ui-swiper').length) uiSwiper.update($popup.find('.ui-swiper'));

                        //열기
                        if (!$('html').hasClass('lock') && !$popup.hasClass('no-dimmed')) Body.lock();
                        $popWrap.scrollTop(0);
                        $popup.addClass(Layer.showClass);

                        //타이틀 유무 체크
                        if ($popup.find('.pop-head h1').length == 0) $popup.addClass('no-title');

                        //iframe
                        if ($('iframe.load-height').length) ui.Util.iframe();
                        if (!uiMobile.any()) Layer.focusMove(tar);
                        Layer.position(tar);

                        setTimeout(function () {
                            Layer.resize();
                            if ($popup.hasClass('bottom') || $popup.hasClass('modal')) {
                                let $height = $(window).height() - 50;
                                const $wrap = $popup.find('.' + Layer.wrapClass);
                                const $head = $wrap.find('.' + Layer.headClass);
                                //const _headH = $head.outerHeight() + ($popup.hasClass('bottom') ? 24 : 20); //const _headH = $head.outerHeight();
                                const _headH = $head.outerHeight();
                                const $foot = $wrap.find('.' + Layer.footClass);
                                const $body = $wrap.find('.' + Layer.bodyClass);
                                const _contH = $wrap.find('.' + Layer.contClass).height();
                                const $tabScroller = $body.find('.tab-scroller');
                                let _footH = 0;
                                let _popH = 0;
                                let isScroll = false;

                                if ($foot.length) {
                                    _footH = $foot.css('display') === 'none' ? 0 : $foot.filter(':visible').outerHeight(); // 0727: 높이 수정
                                    $popup.addClass('foot');
                                }

                                $wrap.css('max-height', $popup.data('height') ? $popup.data('height') : Layer.popMaxH); // mode-date:0919: pop-wrap max-height

                                Layer.setHeight(tar); // 0824(smp0050101) 수정

                                if ($popup.hasClass('transfer')) {
                                    let $popMark = $('.pop-mark');
                                    if ($popMark.length) {
                                        let _tH = parseInt($(window).height() - ($popMark.offset().top + $popMark.height() + 24));
                                        _popH = (230 > _tH) ? 230 : _tH;
                                    } else {
                                        //_popH = parseInt(($(window).height() / 3) * 2);
                                        _popH = parseInt($(window).height() * 0.8);
                                    }
                                } else if ($popup.hasClass('half')) {
                                    _popH = parseInt($(window).height() / 2);
                                } else if ($popup.hasClass('default')) {
                                    //_popH = parseInt(($(window).height() / 3) * 2);
                                    _popH = parseInt($(window).height() * 0.8);
                                }

                                _popH = $popup.data('height') ? parseInt($popup.data('height')) / 100 * $(window).height() : Layer.popMaxH; // mod-date:0919
                                let _bodyH = _popH - _headH - _footH;
                                if ($popup.hasClass('bottom') && !$popup.find('.pop-foot').length) $popBody.addClass('-sab'); //0908: 바텀하단버튼없는 경우 노치대응

                                (_bodyH < _contH || $popup.find('.tab-wrap').length) ? isScroll = true : $body.removeClass('scroll').addClass('no-scroll');
                                //if (_bodyH < _contH || $popup.find('.tab-wrap').length) isScroll = true;

                                if ($popup.hasClass('transfer') || $popup.hasClass('half') || $popup.hasClass('default')) {
                                    if (isScroll) {
                                        $wrap.css('height', _popH);
                                        $popup.data('isWrapH', _popH);
                                        $popup.data('isBodyH', _bodyH);
                                    }
                                }
                                //탭 컨텐츠 스크롤이 필요할때
                                if($tabScroller.length) {
                                    const _tabH = parseInt($body.find('.tab-list').outerHeight());
                                    // 0221 links 하단링크 포함시 하단공백 부분
                                    if ($popup.hasClass('links')) {
                                        $tabScroller.css('max-height', parseInt(_bodyH - _tabH) - 20);
                                        //$tabScroller.css('max-height', parseInt(_bodyH - _tabH) - 36);
                                        $popup.find(".fixed-btm").css("top", parseInt(_bodyH - _tabH) + 15);
                                    } else {
                                        $tabScroller.css('max-height', parseInt(_bodyH - _tabH - 20));
                                        //$tabScroller.css('max-height', `calc(100% - ${parseInt(_tabH)})`);
                                    }
                                }
                                //swipe 기능
                                if ($popup.hasClass('is-swipe') && !$popup.hasClass('is-swipe--init') || $popup.hasClass('body-swipe')) {
                                    $popup.addClass('is-swipe--init');
                                    if ($popup.find('.stream-wrap')) $popup.removeClass('is-swipe--init') //.stream-wrap + .tab-wrap 일때 height auto
                                   // if (!$popBody.hasClass('no-scroll')) Layer.bottomTouch(tar); 230308 사용x
                                }
                            }
                        }, 100);

                        setTimeout(function () {
                            if (!$popup.hasClass('no-dimmed')) $FocusEvt();
                            if (!!callback) callback();
                            $(document).trigger('Layer.show', {id: $id});
                            _this.inert($popup, true);

                            // 20220826: 좌우분할 스크롤 목록 초기값 처리용(개발요청)
                            // Layer.setScrollBetweenTop();
                        }, $callbackDelay);
                        Layer.opening--;
                    }, $openDelay);
                } else {
                    if($('.pg-wrap').filter('[data-ui^=pull-pop-]').length > 0) return; //full popup 일때 return
                    // mod-date:1130:딤드로딩팝업 포커싱
                    if ($popup.hasClass('loading')) {
                        $popup.find('.loading-cont .txt').attr({ tabindex: 0 }).focus();
                    }
                    //팝업 없을때
                    if (!Layer.reOpen) {
                        Layer.reOpen = true;
                        console.log(tar, '팝업없음, 0.5초 후 open 재시도');
                        setTimeout(function () {
                            Layer.open(tar, callback);
                        }, 500);
                    } else {
                        Layer.reOpen = false;
                        console.log(tar, '재시도해도 팝업없음');
                    }
                }

                return $popup;
            },
            inert: function ($popup, isInert) {
                $('.pg-wrap')[isInert ? 'attr' : 'removeAttr']('inert', '');
                if (isInert) {
                    const _$pgWrap = $popup.closest('.pg-wrap');
                    if (_$pgWrap.attr('inert') !== undefined || _$pgWrap.attr('inert') === '') {
                        _$pgWrap.removeAttr('inert');
                    }
                }
            },
            close: function (tar, callback) {
                this.inert($(tar), false);

                const $popup = $(tar);
                if (!$popup.hasClass(Layer.showClass)) return console.log(tar, '해당팝업 안열려있음');
                const $id = $popup.attr('id');
                let $closeDelay = 510;
                let $callbackDelay = ($popup.hasClass('morphing')) ? 0 : 510;
                let $lastPop = '';
                const $visible = $('.' + Layer.popClass + '.' + Layer.showClass).length;

                if ($('.pg-wrap').length) $('.pg-wrap').removeAttr('aria-hidden');
                if ($('.pg-container').length) $('.pg-container').removeAttr('aria-hidden');

                Layer.openPop.splice(Layer.openPop.indexOf('#' + $id), 1);
                if (Layer.openPop.length) $lastPop = Layer.openPop[Layer.openPop.length - 1];

                if ($visible == 1) {
                    if (!$popup.hasClass('morphing')) Body.unlock();
                    $(Layer.etcCont).removeAttr('aria-hidden');
                }
                if ($lastPop != '') $($lastPop).removeAttr('aria-hidden');

                //리턴포커스
                const $focusEvt = function () {
                    const $returnFocus = $popup.data('returnFocus');
                    if ($returnFocus != undefined) {
                        if($returnFocus.hasClass('btn-tooltip on')) $returnFocus.removeClass('on'); // mod-date:1010: 툴팁 액티브 클래스 삭제
                        $returnFocus.removeClass(Layer.focusedClass).focus();
                        //if ($returnFocus.hasClass('select-btn') && !$popup.data('no')) $returnFocus.closest('.form-ele').removeClass('focus'); //0824(smp0050101)
                        if ($returnFocus.hasClass('select-btn') && !$popup.data('no')) $returnFocus.closest('.form-ele').removeClass('focus');
                    } else {
                        //리턴 포커스가 없을때
                        if ($('#header').length) {
                            if ($('.head-back').length) {
                                $('.head-back').focus();
                            } else {
                                $('#header').attr({ tabindex: 0 }).focus();
                            }
                        } else {
                            $('.pg-container').find($focusableEl).first().focus();
                        }
                    }
                    //0726: 포커스 수정
                    if($popup.data('no')) {
                        $('[data-ui=pop-open]').filter('[data-no='+$popup.data('no')+']').focus();
                    }
                };
                setTimeout(function () {
                    $focusEvt();
                }, 0);

                //닫기
                $popup.removeClass(Layer.showClass).data('focusMove', false).data('popPosition', false);
                $popup.attr({'aria-hidden': true}).removeAttr('tabindex aria-labelledby');
                if ($popup.hasClass('no-motion')) $closeDelay = 10;

                const $closeAfter = function () {
                    $popup.removeAttr('style');
                    if ($popup.hasClass('is-swipe')) {
                        $popup.find('.' + Layer.wrapClass).removeAttr('style');
                        if ($popup.hasClass('full')) $popup.removeClass('full').addClass('bottom');
                    }
                    $popup
                        .find('.' + Layer.headClass)
                        .removeAttr('style')
                        .removeClass('shadow')
                        .find('h1')
                        .removeAttr('tabindex');
                    $popup.find('.' + Layer.bodyClass).removeAttr('tabindex style');
                    $popup.find('.' + Layer.focusInClass).removeAttr('tabindex');
                    if ($popup.find('.pop-close.last-focus').length) $popup.find('.pop-close.last-focus').remove();

                    // 닫을 때 없어져야하는 요소
                    if ($popup.find('.' + Layer.closeRemoveClass).length) $popup.find('.' + Layer.closeRemoveClass).remove();

                    // 닫기 후 팝업 자체가 없어지는 케이스
                    if ($popup.hasClass(Layer.alertClass) || $popup.hasClass(Layer.selectClass) || $popup.hasClass(Layer.removePopClass)) {
                        if ($popup.hasClass(Layer.selectClass)) Layer.isSelectOpen = false;
                        if ($popup.hasClass(Layer.alertClass)) {
                            const $content = $popup.find('.message>div').html();
                            Layer.beforeCont.splice(Layer.beforeCont.indexOf($content), 1);
                        }
                        $popup.remove();
                    }
                };
                setTimeout(function () {
                    $closeAfter();
                }, $closeDelay);

                setTimeout(function () {
                    //callback
                    if (!!callback) callback();

                    // wa-241030 | 공통 popup close - event trigger
                    $(document).trigger('Layer.hide', {id: $id});
                }, $callbackDelay);

                return $popup;
            },
            resize: function () {
                const $popup = $('.' + Layer.popClass + '.' + Layer.showClass);
                if (!$popup.length) return;
                const headHeight = function (headCont, contentCont) {
                    const $headH = headCont.children().outerHeight();
                    const $position = headCont.css('position');
                    const $padTop = parseInt(contentCont.css('padding-top'));
                    if ($headH > $padTop) {
                        contentCont.css('padding-top', $headH);
                    }
                };
                const footHeight = function (footCont, contentCont) {
                    const $footH = footCont.children().outerHeight();
                    const $padBottom = parseInt(contentCont.css('padding-bottom'));
                    if ($footH > $padBottom) {
                        contentCont.css('padding-bottom', $footH);
                    }
                };
                $popup.each(function () {
                    const $this = $(this);
                    const $wrap = $this.find('.' + Layer.wrapClass);
                    const $head = $wrap.find('.' + Layer.headClass);
                    const _headH = $head.length ? $head.outerHeight() : 0;
                    const $tit = $head.find('h1');
                    const $foot = $wrap.find('.' + Layer.footClass);
                    const $body = $wrap.find('.' + Layer.bodyClass);
                    const _bodyH = $body.find('.section').outerHeight();
                    let _footH = 0;

                    $head.removeAttr('style').removeClass('shadow');
                    if(!$this.data('height'))  $body.removeAttr('tabindex style'); //0823 수정

                    //바텀시트 선택요소로 스크롤
                    if ($this.hasClass(Layer.selectClass) && $this.find('.selected').length && !$wrap.hasClass('scrolling')) {
                        const $headH = $head.outerHeight();
                        const $wrapH = $wrap.outerHeight();
                        const $wrapH2 = $wrap.get(0).scrollHeight;
                        const $selected = $wrap.find('.selected');
                        const $selectedH = $selected.outerHeight();
                        const $selectedTop = $selected.position().top;

                        if ($wrapH < $wrapH2) {
                            $wrap.addClass('scrolling');
                            const $sclTop = $selectedTop - $wrapH + $wrapH / 2 - $selectedH / 2 + $headH / 2;
                            $wrap.animate({ scrollTop: $sclTop }, 300, function () {
                                $wrap.removeClass('scrolling');
                            });
                        }
                    }
                });
            },
            fixed: function (el) {
                //  pop fixed
                const $wrap = $(el).hasClass(Layer.wrapClass) ? $(el) : $(el).closest('.' + Layer.wrapClass);
                const $head = $wrap.find('.' + Layer.headClass);
                const $foot = $wrap.find('.' + Layer.footClass);
                const $scrollTop = $wrap.hasClass(Layer.pageClass) ? $(window).scrollTop() : $wrap.scrollTop();
                const $scrollHeight = $wrap.hasClass(Layer.pageClass) ? $('body').get(0).scrollHeight : $wrap[0].scrollHeight;
                const $wrapHeight = $wrap.hasClass(Layer.pageClass) ? $(window).height() : $wrap.outerHeight();
                const $topClassName = 'pop-top-fixed';
                const $bottomClassName = 'pop-bottom-fixed';
                if ($head.length) {
                    if ($scrollTop > 0) {
                        $head.addClass($topClassName);
                    } else {
                        $head.removeClass($topClassName);
                    }
                }

                if ($foot.length) {
                   // console.log($scrollTop, $wrapHeight, $scrollHeight);

                    if ($scrollTop + $wrapHeight >= $scrollHeight - 10) {
                        $foot.removeClass($bottomClassName);
                    } else {
                        $foot.addClass($bottomClassName);
                    }
                }
                const $fixed = $wrap.find('.pop-fixed');
                const $wrapTop = $wrap.position().top;
                if ($fixed.length) {
                    $fixed.each(function () {
                        const $this = $(this);
                        const $offsetTop = $this.data('top') !== undefined ? $this.data('top') : Math.max(0, getOffset(this).top);
                        const $topMargin = ui.Common.getTopFixedHeight($this, $topClassName);
                        let $topEl = $this;
                        const $top = $offsetTop - $wrapTop;
                        if ($scrollTop + $topMargin > $top) {
                            $this.data('top', $offsetTop);
                            $this.addClass($topClassName);
                            if ($topEl.css('position') !== 'fixed' && $topEl.css('position') !== 'sticky') $topEl = $topEl.children();
                            if ($topMargin !== parseInt($topEl.css('top')) && $topEl.css('position') === 'fixed') $topEl.css('top', $topMargin);
                            if ($head.hasClass($topClassName)) $head.addClass('no-shadow');
                        } else {
                            $this.removeData('top');
                            if ($topEl.css('position') !== 'fixed' && $topEl.css('position') !== 'sticky') $topEl = $topEl.children();
                            $topEl.removeAttr('style');
                            $this.removeClass($topClassName);
                            if (($head.hasClass($topClassName) && $wrap.find('.' + $topClassName).length === 1) || !$wrap.find('.' + $topClassName).length) $head.removeClass('no-shadow');
                        }
                    });
                }
            },
            position: function (tar) {
                const $popup = $(tar);
                if (!$popup.hasClass(Layer.showClass)) return false;
                if ($popup.data('popPosition') == true) return false;
                $popup.data('popPosition', true);
                let $wrap = $popup.find('.' + Layer.wrapClass);
                let $wrapH = $wrap.outerHeight();
                let $wrapSclH = $wrap[0].scrollHeight;
                const $head = $popup.find('.' + Layer.headClass);
                const $body = $popup.find('.' + Layer.bodyClass);
                const $foot = $popup.find('.' + Layer.footClass);
                const $footBtn = $foot.find('.button');
                Layer.fixed($wrap);
            },
            focusMove: function (tar) {
                if (!$(tar).hasClass(Layer.showClass)) return false;
                if ($(tar).data('focusMove') == true) return false;
                $(tar).data('focusMove', true);
                const $tar = $(tar);
                const $focusaEls = $tar.find($focusableEl);
                let $isFirstBackTab = false;

                $focusaEls.on('keydown', function (e) {
                    const $keyCode = e.keyCode ? e.keyCode : e.which;
                    const $focusable = $tar.find($focusableEl).not('.last-focus');
                    const $focusLength = $focusable.length;
                    const $firstFocus = $focusable.first();
                    const $lastFocus = $focusable.last();
                    const $index = $focusable.index(this);

                    $isFirstBackTab = false;
                    if ($index == $focusLength - 1) {
                        //last
                        if ($keyCode == 9) {
                            if (!e.shiftKey) {
                                $firstFocus.focus();
                                e.preventDefault();
                            }
                        }
                    } else if ($index == 0) {
                        //first
                        if ($keyCode == 9) {
                            if (e.shiftKey) {
                                $isFirstBackTab = true;
                                $lastFocus.focus();
                                e.preventDefault();
                            }
                        }
                    }
                });

                $tar.on('keydown', function (e) {
                    const $keyCode = e.keyCode ? e.keyCode : e.which;
                    const $focusable = $tar.find($focusableEl).not('.last-focus');
                    const $lastFocus = $focusable.last();

                    if (e.target == this && $keyCode == 9) {
                        if (e.shiftKey) {
                            $lastFocus.focus();
                            e.preventDefault();
                        }
                    }
                });

                $(document).on('focusin', $tar.selector + ' .last-focus', function (e) {
                    const $focusable = $tar.find($focusableEl).not('.last-focus');
                    const $firstFocus = $focusable.first();
                    const $lastFocus = $focusable.last();
                    if ($isFirstBackTab) {
                        $lastFocus.focus();
                    } else {
                        $firstFocus.focus();
                    }
                });
            },
            init: function () {
                if ($('.' + Layer.popClass + '.' + Layer.showClass + '[aria-hidden="true"]').length) {
                    Layer.open('.' + Layer.popClass + '.' + Layer.showClass + '[aria-hidden="true"]');
                }
                const $winpop = $('.' + Layer.wrapClass + '.' + Layer.pageClass);
                if ($winpop.length) {
                    Layer.page($winpop);
                }

                $(document).on('click', $focusableEl, function (e) {
                    Layer.openEl = e.currentTarget;
                });
                setTimeout(function () {
                    Layer.openEl = '';
                }, 100);


                //열기
                $(document).on('click', '[data-ui=pop-open]', function (e) {
                    e.preventDefault();
                    $currentTarget = $(e.currentTarget);
                    let $btnTooltip = $('[data-ui=tooltip]'); // mod-date:1010:
                    let $tooltipWrap = $('.tooltip-wrap');

                    //연속팝업
                    if($currentTarget.filter('[data-no]').length > 0) {
                        let $dataNo = $currentTarget.data('no');
                        let $popFoot = $('.stream-wrap').eq($dataNo).find('.pop-foot');

                        if ($currentTarget.data('no') === 0) {
                            $('.stream-wrap').find('.pop-foot').children('.btns').show();
                        } else {
                            $popFoot.find('[data-ui=pop-close]').remove();
                            $popFoot.children('.btns').hide();
                            $popFoot.append('<div class="btns"><button type="button" class="btn primary lg" data-ui="pop-close">확인</button></div>');
                        }
                        $(`${Layer.openPop}`).find('.stream-wrap').hide().eq($dataNo).css('display', 'flex').show();
                    }

                    if ($currentTarget.is('.btn-tooltip')) $currentTarget.addClass('on');
                    if ($tooltipWrap) {
                        $tooltipWrap.hide();
                        $btnTooltip.removeClass('on'); // mod-date:1010
                        //$currentTarget.addClass('on');
                    }
                    setTimeout(function () {
                        $('.alarm-box.on').find('.txt').attr('tabIndex', 0).focus();
                    }, 0);
                });

                //팝업 닫기 - mod-date:0918 : .off('click', '[data-ui=pop-close], .pop-close') 추가
                $(document).off('click', '[data-ui=pop-close], .pop-close').on('click', '[data-ui=pop-close], .pop-close', function (e) {
                    e.preventDefault();
                    let $pop = $(this).attr('href');

                    $('.pg-wrap').find('.pg-footer').removeClass('nofix'); //0918 컨펌버튼 영역 테스트

                    if ($pop == '#' || $pop == '#none' || $pop == undefined) $pop = $(this).closest('.' + Layer.popClass);
                    if ($pop.length) Layer.close($pop);

                    if($(this).closest('.alarm-box').is('.on')) {
                        const $box = $(this).closest('.alarm-box');
                        $box.removeClass('on');
                        $box.on('transitionend', function () {
                            $(this).remove();
                        });
                    };

                    if($('.stream-wrap').length > -1) $pop.find('.stream-wrap').hide().eq(0).show().css('display', 'flex'); //연속팝업

/*                     try {
                        if(!$currentTarget.is('.ui-select-open.on')) $currentTarget.removeClass('on');
                    } catch {}; *//* 0824: 개발테스트중 */
                    //$currentTarget.removeClass('on');
                    //$currentTarget.focus(); (2/24 테스트중 : 2741라인 리턴포커스와 중복됨)
                });

                // Layer.keyEvt();
                // Layer.selectUI();
                Layer.BottomChkSelect();

                $(document).on('click', '[data-popup]', function (e) {
                    e.preventDefault();
                    const $popup = $(this).data('popup');
                    Layer.load($popup, 'full');
                });
                $(document).on('click', '[data-popup-full]', function (e) {
                    e.preventDefault();
                    const $popup = $(this).data('popup-full');
                    Layer.load($popup, 'full');
                });
                $(document).on('click', '[data-popup-modal]', function (e) {
                    e.preventDefault();
                    const $popup = $(this).data('popup-modal');
                    Layer.load($popup, 'modal');
                });
                $(document).on('click', '[data-popup-bottom]', function (e) {
                    e.preventDefault();
                    const $popup = $(this).data('popup-bottom');
                    Layer.load($popup, 'bottom');
                });
                $(document).on('click', '[data-popup-left]', function (e) {
                    e.preventDefault();
                    const $popup = $(this).data('popup-left');
                    Layer.load($popup, 'side-left');
                });
                $(document).on('click', '[data-popup-right]', function (e) {
                    e.preventDefault();
                    const $popup = $(this).data('popup-right');
                    Layer.load($popup, 'side-right');
                });
            },
            /*  setScrollBetweenTop
            *   20220826: 좌우 분할 목록에 선택값이 있는 경우 해당 요소까지 자동 스크롤 처리
            */
            /* setScrollBetweenTop: function () {
                if ($('.scroll-between-wrap').length > 0) {
                    $(".scroll-between-wrap ul.list").each(function () {
                        let selectedElem = $(this).find('.sel');
                        // 20220831: 스크롤 위치 보정
                        let scrollTo = $(this).scrollTop() + selectedElem.position().top;
                        if (selectedElem.length === 1) {
                            // 1개 요소만 선택되어 있다면
                            $(this).animate({ scrollTop: scrollTo }, 300);
                        }
                    });
                }
            } */
            // setScrollBetweenTop -->
        };

        //레이어팝업(full)
        let uiFullpop = {
            obj: {},
            arr:[],
            delay: 100,
            length: 0,
            init: function(type) {
                const $this = uiFullpop;
                $('[data-ui=full-open]').each(function() {
                    let obj = this.dataset;
                    if(!(obj.target in $this.obj)) {
                        obj['direction'] = $(this).data('targetMove') ? $(this).data('targetMove') : 'left';
                        $this.obj[obj.target] = obj;
                        if(obj.href) $this.load(obj)
                    }
                })
                $this.length = $('[data-ui=full-open]').length;
                $this.events();
            },
            load: function(obj) {
                const $this = uiFullpop;
                let url = obj.href;
                if(url) {
                    $.ajax({
                        url: url,
                    })
                    .done(function(result) {
                        let html = result;
                        let $wrap = $('#'+obj.target).length ? $('#'+obj.target):$('body');
                        $wrap.append(html)
                        $('#'+obj.target).attr('data-move', obj.direction);
                    })
                    .fail(function(result){
                        console.log('err >>', result.statusText)
                    });
                }
            },
            open: function(e) {
                const $this = uiFullpop;
                let delay = $this.delay ? $this.delay : 100;
                let $target = $(`#${e.target.dataset.target}`);
                let $prev = $(e.target).parents('[data-move]');
                if($this.length != $('[data-ui=full-open]').length) $this.init('reload');


                // 활성화 되어 있는 풀팝업 관리
                $this.arr = $this.arr.filter((_id)=>_id !== e.target.dataset.target);
                $this.arr.push(e.target.dataset.target);
                let zIndex = 100;
                $target.css('z-index', zIndex+this.arr.length)

                setTimeout(function() {
                    $target.addClass('show');
                    $target.removeClass('quick');
                    $target.find('.pg-gnb .ht-1').focus();
                    $prev.css('z-index', zIndex);
                    Body.lock();
                }, delay);

                // css 파일에 정의 되어 있는 transition-duration 시간 * 2 뒤에 동작해야 자연스러움
                setTimeout(function() {$target.siblings().removeClass('show')}, delay * 5);
            },
            close: function(e, callback) {
                const $this = uiFullpop;
                const _t = e.target ? e.target : e;
                const _id = $(_t).parents('.pg-wrap.full').attr('id');
                const $target = $(_t).parents('.pg-wrap.full');
                if($this.arr && $this.arr[$this.arr.length-2]) {
                    $('#'+$this.arr[$this.arr.length-2]).addClass('show quick');
                    $this.arr.pop();
                }else {
                    $this.arr = [];
                }
                $target.removeClass('show quick');
                $target.css('z-index', parseInt($target.css('z-index')-1));
                $(`[data-target="${_id}"]`).first().focus();
                if(!$target.siblings().hasClass('show')) Body.unlock();
                if(callback) callback();
            },
            clear: function(e, callback) {
                const $this = uiFullpop;
                $this.arr.forEach((_id)=>{
                    $(`#${_id}`).removeClass('show quick');
                });
                $(`[data-target="${$this.arr[0]}"]`).first().focus();
                $this.arr = [];
                Body.unlock();
                if(callback) callback();
            },
            events: function() {
                const $this = uiFullpop;
                $(document).off('.popupEvent')
                .on('click.popupEvent', '[data-ui=full-open], [data-ui=full-close]', e => {
                    e.preventDefault();
                    if(e.target.dataset.ui == 'full-open') {
                        $this.open(e)
                    }else {
                        $this.close(e)
                    }
                });
            }
        };

        let uiSwiper = {
            base: function (tar, changeEvt) {
                $(tar).each(function () {
                    const $this = $(this);
                    const $swiper = $this.find('.swiper');
                    const $pagination = $this.find('.swiper-pagination');
                    let $events = {};
                    if ($this.data('events')) {
                        let funcName = $this.data('events');
                        try {
                            $events = eval(`${funcName}();`);
                        } catch (e) {
                            // console.log("", funcName, " 함수를 찾을 수 없습니다.");
                            $events = {};
                        }
                    }
                    // console.log("custom events -->", $events);

                    let $paginationType = 'bullets';
                    if ($this.hasClass('-fraction')) $paginationType = 'fraction';

                    // s: sscn 250912: 페이지네이션 progressbar 타입추가
                    if ($this.hasClass('-progressbar')) $paginationType = 'progressbar';
                    // e: sscn 250912: 페이지네이션 progressbar 타입추가

                    let $navigation = false;
                    if ($this.hasClass('-nav')) {
                        let $btnHtml = '';
                        $btnHtml += '<button type="button" aria-label="이전 슬라이드" class="swiper-button-prev swiper-button"><span class="hidden">이전 슬라이드</span></button>';
                        $btnHtml += '<button type="button" aria-label="다음 슬라이드" class="swiper-button-next swiper-button"><span class="hidden">다음 슬라이드</span></button>'; //wa-241112: 원복(금융사기피해예방)
                        if(!$swiper.find('.swiper-button').length) $swiper.append($btnHtml);
                        $navigation = {
                            prevEl: $this.find('.swiper-button-prev')[0],
                            nextEl: $this.find('.swiper-button-next')[0]
                        };
                    } else if($this.hasClass('-youtube')) { // 240809 FRA_01_011 youtube 추가
                        let $btnHtml = '';
                        $btnHtml += '<button type="button" aria-label="이전 영상" class="swiper-button-prev swiper-button"><span class="text">이전영상</span></button>';
                        $btnHtml += '<button type="button" aria-label="다음 영상" class="swiper-button-next swiper-button"><span class="text">다음영상</span></button>'; //wa-241112: 원복(금융사기피해예방)
                        if(!$swiper.find('.swiper-button').length) $swiper.parent().append($btnHtml);
                        $navigation = {
                            prevEl: $this.find('.swiper-button-prev')[0],
                            nextEl: $this.find('.swiper-button-next')[0]
                        };
                    // s: sscn 250912: 페이지네이션 progressbar 타입추가
                    } else if($this.hasClass('-progressbar')) {
                        // s: 아이서비스 온보딩에서 적용
                        if($this.closest('.child-onboarding').length) {
                            $navigation = {
                                prevEl: $this.closest('.pg-container').siblings('.pg-footer').find('.btn.primary2')[0],
                                nextEl: $this.closest('.pg-container').siblings('.pg-footer').find('.btn.primary')[0]
                            };
                        }
                        // e: 아이서비스 온보딩에서 적용
                    }
                    // s: sscn 250912: 페이지네이션 progressbar 타입추가

                    let $slidesPerView = 'auto', isFreeMode = false;
                    if ($this.data('view') !== undefined) {
                        $slidesPerView = $this.data('view');
                        isFreeMode = $this.data('view') == 'auto';
                        $this.removeAttr('data-view');
                    }

                    let $spaceBetween = 0;
                    if ($this.data('space') !== undefined) {
                        $spaceBetween = $this.data('space');
                        //console.log('space : ' + $this.data('space'));
                        //$this.removeAttr('data-space');
                    }

                    let $loop = $this.hasClass('-loop') ? true : false;
                    let $autoHeight = $this.hasClass('-autoHeight') ? true : false;
                    let $centeredSlides = $this.hasClass('-center') ? true : false;

                    let $auto = false;

                    if ($this.data('auto') !== undefined) {
                        $auto = {
                            delay: $this.data('auto'),
                            disableOnInteraction: false
                        };
                        $this.removeAttr('data-auto');
                        if (!$this.find('.swiper-auto-ctl').length) {
                            if (!$this.find('.swiper-pagination-wrap').length) $pagination.wrap('<div class="swiper-pagination-wrap"></div>');
                            $pagination.after('<button type="button" class="swiper-auto-ctl" aria-label="슬라이드 자동롤링 중지"></button>');
                        }
                    }
                    let $parallax = false;
                    if (
                        $this.find('[data-swiper-parallax]').length ||
                        $this.find('[data-swiper-parallax-x]').length ||
                        $this.find('[data-swiper-parallax-y]').length ||
                        $this.find('[data-swiper-parallax-scale]').length ||
                        $this.find('[data-swiper-parallax-opacity]').length
                    ) {
                        $parallax = true;
                    }

                    // 2022-08-19: 슬라이드 오프셋 추가
                    let $slidesOffset = $this.data('offset') ? $this.data('offset') : 0;
                    $this.removeAttr('data-offset');

                    let baseSwiper;
                    let newGuideTime;
                    if($this.find('.swiper-slide').length == 1 && $this.hasClass('img-banner')) {
                        $this.addClass('no-swiper');
                    } else if($swiper.hasClass('swiper-initialized')) {
                        baseSwiper = $this.data('swiper');
                        if (baseSwiper !== undefined) baseSwiper.update();
                    } else if($swiper.find('.swiper-slide').length > 1){
                        let _title = $this.data('title');
                        // 0609 [접근성]
                        let setSlideAriaLabel = (e) => {
                            if($(e.pagination.$el).length && $paginationType == 'fraction') {
                                let current = $(e.pagination.$el).find('.swiper-pagination-current').text();
                                let total = $(e.pagination.$el).find('.swiper-pagination-total').text();
                                $(e.pagination.$el).attr({
                                    'aria-label': `${total}개의 슬라이드 중 ${current}번째 입니다`,
                                    'role' : 'text',
                                    'tabindex' : '0'
                                })
                            }
                            // s: sscn 250912: 페이지네이션 progressbar 타입추가
                            if($(e.pagination.$el).length && $paginationType == 'progressbar') {
                                $(e.pagination.$el).attr({
                                    'aria-label': `${e.slides.length}개의 슬라이드 중 ${e.realIndex + 1}번째 입니다`,
                                    'tabindex' : '0'
                                })
                            }
                            // e: sscn 250912: 페이지네이션 progressbar 타입추가

                            // e.$wrapperEl.attr('tabindex', 0)
                            $(e.slides).removeAttr('aria-label').attr({'aria-hidden':true}).each(function(i) {
                                // if(i == e.realIndex) $(this).attr('title','선택됨');
                                // else $(this).removeAttr('title');
                                if(isFreeMode) {
                                    // if($(this).offset().left >= 0 && $(this).offset().left < $(window).width()) {
                                    //     $(this).attr({'aria-hidden':false});
                                    // }
                                    // mod-date:1130:전체메뉴에서 화면 밖 슬라이드도 순차 선택 가능하도록 수정
                                    $(this).attr({'aria-hidden':false});
                                }else {
                                    if(i == e.activeIndex) $(this).attr({'aria-hidden':false});
                                }
                            })
                        }
                        baseSwiper = new Swiper($swiper[0], {
                            pagination: {
                                el: '.swiper-pagination',
                                type: $paginationType,
                                clickable: true,
                                renderBullet: function (index, className) {
                                    return '<button type="button" class="' + className + '"><span class="hidden">' + ((_title !== undefined) ? _title + ' ' : '') + (index + 1) + '번째 슬라이드</span></button>';
                                }
                            },
                            navigation: $navigation,
                            slidesPerView: $slidesPerView,
                            spaceBetween: $spaceBetween,
                            // 2022-08-19: 슬라이드 오프셋 추가
                            slidesOffsetBefore: $slidesOffset,
                            slidesOffsetAfter: $slidesOffset,
                            loop: $loop,
                            autoHeight: $autoHeight,
                            centeredSlides: $centeredSlides,
                            autoplay: $auto,
                            parallax: $parallax,
                            noSwipingClass: 'no-swiping',
                            on: {
                                slideChangeTransitionEnd: function (e) {
                                    // [S] main 계좌 스와이퍼 개발 callback 추가
                                    this.$el.find('.swiper-slide').each(function () {
                                        let _this = $(this);
                                        if (_this.parents().hasClass('main-account-section') && _this.is('.swiper-slide-active')) {
                                            if (window.SPA_COMMON) {
                                                window.SPA_COMMON.callbackWithSPA('onMainSwiperChange', _this);
                                            }
                                        }
                                        if (_this.closest('.m-kb-youtube').length) {
                                            if (window.SPA_COMMON) {
                                                window.SPA_COMMON.callbackWithSPA('onMainSub2SwiperChange', _this);
                                            }
                                        }
                                    });
                                    // [E] main 계좌 스와이퍼 개발 callback 추가

                                    // 접근성 로직
                                    // $(e.slides).attr({'tabindex':'-1', 'aria-hidden':'true'}).filter('.swiper-slide-active').removeAttr('tabindex aria-hidden');
                                    setSlideAriaLabel(e);
                                    activePaging($this, e.realIndex);   // wa-241120 | pagination - title: 선택됨

                                    if (!!changeEvt) changeEvt(e);
                                },
                                slideChangeTransitionStart: function(e){ //sscn 250912: 페이지네이션 progressbar 타입추가
                                    if(this.$el.find('.type-progressbar').length) {
                                        swiperCtaBtnCtrl(e); //sscn 250912: 아이계좌관리서비스 온보딩에서 적용
                                        progressActiveCtrl($this, e); //sscn 250912: 커스텀 progressbar 활성화 함수 추가
                                    }
                                },
                                afterInit : function(e){
                                    // 접근성 로직
                                    // $(e.slides).removeAttr('aria-label').not('.swiper-slide-active').attr({'tabindex':'-1', 'aria-hidden':'true'});

                                    setSlideAriaLabel(e);
                                    activePaging($this, e.realIndex);   // wa-241120 | pagination - title: 선택됨
                                },
                               // ...$events
                            }
                        });
                        $this.data('swiper', baseSwiper);
                        // $(baseSwiper.$wrapperEl).attr('tabindex', 0) // mod-date:1017:[접근성] 불필요한 인덱싱 제거

                        //2202-08-24 추가
                        if ($(baseSwiper.wrapperEl).filter("[data-bubble='false']").length) {
                            $this.on('touchstart', function (e) {
                                UICommon.tabMenu.tabSwipeArray[0].allowTouchMove = false;
                                baseSwiper.allowTouchMove = true;
                            });
                        }

                        // s: sscn 250912: 커스텀 progressbar step 생성
                        const targetPagination = $(baseSwiper.pagination.el)
                        if(targetPagination.is('.type-progressbar')) {
                            const totalSlide = baseSwiper.slides.length;
                            let activeIndex = baseSwiper.realIndex + 1;
                            setTimeout(()=>{
                                $('.progressbar-wrap').append('<span class="pagination-step"></span>');
                                $('.pagination-step').css('width', 'calc(100% / ('+`${totalSlide}`/`${activeIndex}`+'))');// 최초 step 활성화
                            }, 100)
                        }
                        // e: sscn 250912: 커스텀 progressbar step 생성
                    }
                    // sscn 260108: 슬라이드 1개인경우 페이지네이션 숨김처리
                    if($swiper.find('.swiper-slide').length > 1) $this.find('.swiper-pagination-wrap, .swiper-pagination, .swiper-button').show();
                    else $this.find('.swiper-pagination-wrap, .swiper-pagination, .swiper-button').hide();
                    // sscn 260108: 슬라이드 1개인경우 페이지네이션 숨김처리
                });

                // wa-241120 | pagination - title: 선택됨
                function activePaging ($swiper, activeIdx) {
                    if ($swiper.find('button.swiper-pagination-bullet').length < 1) return;

                    let $paging = $swiper.find('button.swiper-pagination-bullet');
                    for (let i = 0; i < $paging.length; ++i) {
                        if (i === activeIdx)    $paging.eq(i).attr('title', '선택됨');
                        else                    $paging.eq(i).removeAttr('title');
                    }
                }

                // s: sscn 250912: 페이지네이션 progressbar 타입추가
                // progressbar 활성화 함수
                const progressActiveCtrl = ($swiper, e) => {
                    const paginationStep = $swiper.find('.pagination-stpe');
                    const totalSlide = e.slides.length;
                    let activeIndex = e.realIndex + 1;

                    paginationStep.css('width', 'calc(100% / ('+`${totalSlide}`/`${activeIndex}`+'))');
                    (activeIndex === totalSlide) ? paginationStep.closest('.progressbar-wrap').addClass('end') : paginationStep.closest('.progressbar-wrap').removeClass('end');
                }

                // 아이계좌관리서비스 온보딩에서 적용
                const swiperCtaBtnCtrl = (e) => {
                    if($(e.el).closest('.child-onboarding').length) {
                        const nextBtn = $('.btn.primary');
                        if(e.realIndex === e.slides.length-1) {
                            nextBtn.text("시작하기").prop('disabled', false).removeAttr('tabindex aria-label').attr({
                                'title': '프로필 선택화면으로 이동',
                                'aria-disabled': false,
                            }).focus()
                        } else {
                            nextBtn.text("다음").removeAttr('title').attr('aria-label', '다음슬라이드')
                        }
                    }
                }
                // e: sscn 250912: 페이지네이션 progressbar 타입추가
            },
            ready: function (tar) {
                const $target = $(tar);
                $target.each(function () {
                    const $this = $(this);
                    if ($this.find('.swiper-slide').length) {
                        let $children = $this.children();
                        while ($children.hasClass('swiper') || $children.hasClass('swiper-wrapper')) {
                            $children = $children.children();
                        }
                        $children.addClass('swiper-slide');
                    }

                    if (!$this.find('.swiper-wrapper').length) {
                        if (!$this.find('.swiper').length) {
                            $this.wrapInner('<div class="swiper-wrapper"></div>');
                            $this.wrapInner('<div class="swiper"></div>');
                        } else {
                            $this.find('.swiper').wrapInner('<div class="swiper-wrapper"></div>');
                        }
                    } else if (!$this.find('.swiper').length) {
                        $this.find('.swiper-wrapper').parent().wrapInner('<div class="swiper"></div>');
                    }
                    if (!$this.find('.swiper-pagination').length) {
                        $this.append('<div class="swiper-pagination"></div>');
                    }

                    // s: sscn 250912: 페이지네이션 progressbar 타입추가
                    if ($this.find('.swiper-pagination.type-progressbar').length) {
                        // 기본 progressbar 제거
                        $this.find('.swiper-pagination-progressbar-fill').remove();
                        // 커스텀 progressbar 영역 추가
                        $this.find('.swiper-pagination.type-progressbar').append('<div class="progressbar-wrap" aria-hidden="true"></div>');
                    }
                    // e: sscn 250912: 페이지네이션 progressbar 타입추가
                });
            },
            UI: function () {
                $(document).off('click', '.ui-swiper .swiper-auto-ctl').on('click', '.ui-swiper .swiper-auto-ctl', function (e) {
                    e.preventDefault();
                    const $this = $(this);
                    const $closest = $this.closest('.ui-swiper');
                    const $swiper = $closest.data('swiper');
                    if ($(this).hasClass('play')) {
                        $swiper.autoplay.start();
                        $(this).removeClass('play').changeAriaLabel('시작', '중지');
                    } else {
                        $swiper.autoplay.stop();
                        $(this).addClass('play').changeAriaLabel('중지', '시작');
                    }
                });
            },
            update: function (target) {
                $(target).each(function () {
                    const $this = $(this);
                    const $swiper = $this.data('swiper');
                    if ($swiper !== undefined) $swiper.update();
                });
            },
            destroy: function (target) {
                $(target).each(function () {
                    const $this = $(this);
                    const $swiper = $this.data('swiper');
                    if ($swiper !== undefined) $swiper.destroy();
                });
            },
            init: function (target, changeEvt) {
                target = target !== undefined ? target : '.ui-swiper';
                if($(target).length) {
                    uiSwiper.ready(target);
                    uiSwiper.base(target, changeEvt);
                    uiSwiper.UI();
                }
            }
        };

        let uiEffect = { //Button Ripple Motion
            button: function () {
                //let btnList = 'a.btn:not(.link, [class*=ico-]), button.btn:not(.link, [class*=ico-])';
                let btnList = '.btn[class*=primary], .btn.secondary, .btn.point, .btn[class*=outline]';
                $(document).on('click', btnList, function (e) {
                    let $btnEl = $(this),
                        $delay = 650;

                    if (!$btnEl.is('.disabled')) {
                        if (!$btnEl.find('.btn-click-in').length) $btnEl.append('<em class="btn-click-in"></em>');
                        let $btnIn = $btnEl.find('.btn-click-in'),
                            $btnMax = Math.max($btnEl.outerWidth(), $btnEl.outerHeight()),
                            $btnX = e.pageX - $btnEl.offset().left - $btnMax / 2,
                            $btnY = e.pageY - $btnEl.offset().top - $btnMax / 2;
                        $btnIn.css({
                            'left': $btnX,
                            'top': $btnY,
                            'width': $btnMax,
                            'height': $btnMax
                        }).addClass('animate').delay($delay).queue(function (next) {
                            $btnIn.remove();
                            next();
                        });
                    }
                });
            },
            init: function (target) {
                uiEffect.button();
            }
        };

        let uiDate = {
            set: function(opt) {
                let options = Object.assign({
                    el : null,
                    format: 'YYYY.MM.DD',
                    beginYear: 1900, // sscn 260113: 개발 수정요청
                    endYear: 2100,
                    baseEl: '.pg-wrap',
                    cancel: function() {
                        Body.unlock();
                    },
                    confirm: function(value) {
                        Body.unlock();
                    }
                }, opt);
                let baseDate = new Date($(options.el).text().replace(/\D/g, "\/"));
                if(baseDate != 'Invalid Date') options.value = $(options.el).text();
                if(options.format == undefined) options.format = 'YYYY.MM.DD';
                Body.lock();
                return new Rolldate(options);
            }
        }

        /* [data-ui=uiStep] 영역 안의 체크박스 순차적으로 이동 */
        let uiStep = {
            options: {
                wrap: '.pg-wrap',
                cont: '.prod-chk',
                input: '.prod-chk-wrap input:visible',
                btn: '.pg-footer .btn',
                status: '.step-status',
            },
            init: function(opt) {
                this.isPopup = false;
                this.$container = null;

                if(!$('[data-ui=uiStep]').length) return false;
                const _this = uiStep;
                _this.options = Object.assign(_this.options, opt);

                if (!$('.check-msg').length) { //0920 '확인해주세요' 추가
                    $('[data-ui=uiStep] .prod-chk-wrap').find('.prod-chk').eq(0).find('.form-sel').eq(0).prepend('<span class="check-msg">확인해주세요</span>');
                }
                $('[data-ui=uiStep]').each(function() {
                    _this.set($(this)); // 접근성 및 화면 세팅
                    _this.status($(this)); // 하단버튼 체크박스 진행 상태 체크
                    _this.goto($(this)); // 다음 체크박스 위치로
                    _this.event($(this));
                })
            },
            set: function($uiStep) {
                const _this = uiStep;
                const options = _this.options;
                const $stepWrap = $uiStep.parents(options.wrap);
                const $inputs = $uiStep.find(options.input);
                let input = $inputs.map(function(i) {
                    $(this).attr({'data-step': i})
                    // s:mod-date:1027:[접근성] 체크박스 => 버튼박스, 1212: [접근성] 재수정
                    /*
                    $(this).attr({'aria-hidden':'true'})
                    $(this).parents(options.cont).attr({'tabindex': 0, 'role': 'button', 'title': $(this).attr('aria-label'), 'for': $(this).siblings('label').attr('for')})
                    */
                    /* 1221 [접근성] s */
                    // $(this).attr({'aria-hidden':'true'})

                    // $(this).parents(options.cont).attr({'role': 'button', 'aria-label': $(this).parents(options.cont).is('.on') ? '선택됨. ' + $(this).parents(options.cont).text() : ''});
                    /* 1221 [접근성] e */
                    // e:mod-date:1027:[접근성] 체크박스 => 버튼박스

                    // wa-241121 | ui-step 접근성 개선
                    $(this).attr({'role':'text'}).siblings('.label').attr({'role':'text'}).removeAttr('aria-hidden');
                    $(this).removeAttr('aria-label');
                    let $roleButton = $(this).closest(options.cont);
                    $roleButton.attr({'role': 'button', 'aria-label': $roleButton.text().trim()})
                });
                if(!$stepWrap.find(options.status).length) {
                    $stepWrap.find(options.btn).append(` <span class="${options.status.replace('.','')}">(${input.length}/${$inputs.length})</span>`)
                }

                // wa-241128 | uiStep 스크롤 이동 수정
                this.isPopup = $uiStep.closest('.full').length > 0;
                this.$container = $uiStep.closest('.pg-container');
            },
            status: function($uiStep) {
                const _this = uiStep, options = _this.options;
                const $stepWrap = $uiStep.parents(options.wrap);
                const $inputs = $uiStep.find(options.input);
                $wrap = $(options.wrap);

                // wa-241129 | uiStep - input checked 수정
                let $checkedInupt = [];
                $inputs.each(function () {
                    let isChecked = $(this).prop('checked') || $(this).attr('checked');
                    if (isChecked) $checkedInupt.push($(this));
                })

                $stepWrap.find(options.status).html(`(${$checkedInupt.length}/${$inputs.length})`);
                return $checkedInupt;
            },
            prev: function($uiStep) {
                const _this = uiStep, options = _this.options;
                const $inputs = $uiStep.find(options.input);
                let input = $inputs.filter((idx,el)=>!el.checked);
                return $(input[0]);
            },
            next: function($uiStep) {
                const _this = uiStep, options = _this.options;
                const $inputs = $uiStep.find(options.input);
                let input = $inputs.filter((idx,el)=>el.checked);
                let nextIdx = Number($(input).eq(input.length-1).attr('data-step')) < $inputs.length ? Number($(input).eq(input.length-1).attr('data-step')) + 1 : $inputs.length;
                return $inputs.eq(nextIdx);
            },

            goto: function($uiStep, $target) {
                const _this = uiStep;
                const options = _this.options;

                // wa-241128 | uiStep 스크롤 이동 수정
                const $stepWrap = $uiStep.parents(options.wrap);
                const $container = this.isPopup ? this.$container : $('html, body');

                let st = 0;
                let sat = parseInt($stepWrap.css('--sat')) ? parseInt($stepWrap.css('--sat')) : 0;
                let headerH = $('.pg-header').height();

                if($target && $target.parents(options.cont).index() > -1) {
                    if ($target.parents(options.cont).index() > -1) {
                        st = $target.offset().top - headerH - 30 + (this.isPopup ? $container.scrollTop(): 0);
                    } else {
                        st = $target.offset().top - headerH - 100;
                    }
                    $container.animate({
                        scrollTop: st - sat // 0831 : 노치값 빼기
                    }, function () {
                        setTimeout(() => $target.closest(options.cont).attr('tabindex', -1).focus(), 1);
                    });
                    _this.status($uiStep);
                }else {
                    if($uiStep.find(options.input).length == _this.status($uiStep).length) {
                        $stepWrap.find(options.btn).addClass('complete').html('모두 확인했어요').removeAttr('disabled');
                        $stepWrap.find(options.btn).focus();
                    }else {
                        if($target && _this.prev($uiStep).length) {
                            $target = _this.prev($uiStep);
                            if ($target.parents(options.cont).index() > -1) {
                                st = $target.offset().top - headerH - 30 + (this.isPopup ? $container.scrollTop(): 0);
                            } else {
                                st = $target.offset().top - headerH - 100;
                            }
                        }
                        $container.animate({
                            scrollTop: st - sat // 0831 : 노치값 빼기
                        }, function () {
                            setTimeout(() => {
                                if($target) $target.closest(options.cont).attr('tabindex', -1).focus();
                            }, 1);
                        })
                    }
                }
            },
            event: function($uiStep) {
                const _this = uiStep;
                const options = _this.options;
                $uiStep.off('click change', options.cont).on('click change', options.cont, function(e) { //1221 [접근성]
                    // wa-241129 | uiStep - input checked 수정
                    if ($(this).hasClass('on')) return false;

                    // 체크박스
                    // e.preventDefault(); // mod-date:1027:[접근성] 체크박스 => 버튼박스
                    let $input = $(this).find('input');
                    $('.check-msg').remove(); //0920 '확인하세요' 추가

                    // wa-241128 | uiStep 스크롤 이동 수정
                    $(this).addClass('on').attr('aria-label', '선택됨. ' + $(this).text().trim()) // mod-date:1128: [접근성] '선택됨' 추가, 1212: [접근성] 재수정
                    $input.closest('[role=button]').attr('aria-disabled', true);

                    // if($input.hasClass('already')) return false;
                    $input.attr('checked', true).prop('checked', true);
                    $input.addClass('already').attr('disabled',true); // mod-date:1018: [접근성]
                    _this.goto($uiStep, _this.next($uiStep))
                })
                $uiStep.parents(options.wrap).off('click', options.btn).on('click', options.btn, function(e) {
                    // 하단버튼
                    if($(this).hasClass('complete')) return false;
                    let $target = _this.next($uiStep).length ? _this.next($uiStep) : _this.prev($uiStep);
                    if($target.length) {
                        let top = $target[0].getBoundingClientRect().top;
                        if(top < 0 || top > $(window).height()) {
                            _this.goto($uiStep, $target);
                        }else {
                            $target.parents(options.cont).trigger('click')
                        }
                    }else {
                        _this.goto($uiStep);
                    }
                })
            }
        }

        //로딩
        let loading = {
            interval: null,
            init: function () {
                loading.loadingChangeTxt();
            },
            clear: function() {
                clearInterval(loading.interval);
            },
            loadingChangeTxt: function() { //텍스트 순차 노출
                //0726: 로딩페이징 누적되는 케이스 대응
                if($('.loading').find('.change-ani')) {
                    let idx = 1, $wrap = null;
                    $('.loading').each(function() {
                        if($(this).is(':visible')) {
                            $wrap = $(this);
                            loading.clear();
                            loading.interval = setInterval(changeTxt, 4000);
                        }
                    })
                    function changeTxt() {
                        let $txt = $wrap.find('.change-ani').find('.txt');
                        $txt.hide().animate({'opacity': 0}, 200);
                        $txt.eq(idx).show().animate({'opacity': 1}, 500);
                        idx++;
                        if (idx >= $txt.length) idx=1;
                    }
                }
            }
        }

        // apng
        let apng = {
            init: function () {
                apng.repack();
            },
            repack: function() {
                let eleBe = $(".result.success");
                if (eleBe.length) {
                    eleBe
                        .prepend('<img src="/_pub/assets/img/common/ani-success.png" alt="" class="load-img">');
                    let $img = $('.load-img');
                    $img.attr('src', $img.attr('src') + "?" + Date.now());
                }
            }
        }

        /** uiAnimation */
        let uiAnimation = {
            /**
             * @param {array} targetArray (필수) 애니메이션 타겟 클래스
             * @param {number} threshold 클래스 추가 지점(0~1)
             * @param {string} className default(animated)
             */
            init: function(targetArray, threshold, className) {
                threshold = threshold?threshold:0.2;
                className = className?className:'animated';
                this.set();
                $(window).on('scroll.startAni', () => {
                    if($(window).scrollTop() < $(window).height()/2) {
                        targetArray.forEach((_className)=>{
                            if(typeof _className == 'string') {
                                document.querySelectorAll(_className).forEach((e, i) => {
                                    this.check(threshold, className).observe(e)
                                })
                            }
                        })
                        $(window).off('scroll.startAni');
                    }

                }).scroll();
            },
            check: function(threshold, className) {
                return new IntersectionObserver((entries, observe) => {
                    entries.forEach(entry=>{
                        if(!entry.isIntersecting) return;
                        $(entry.target).addClass(className)
                    })
                },{
                    rootMargin: `0px 0px -${threshold*100}% 0px`,
                });
            },
            set: function() {
                // point 순서
                document.querySelectorAll('.tag-pt').forEach((el, i)=>{
                    el.innerHTML = "Point "+(i+1);
                })
            }
        }

        // 순서변경 : MSB_INQ_17_004, MSB_INQ_17_005
        let uiSortable = {
            cache: [], // mod-date:0925: 배열로 변경
            options: {
                el: '[data-ui="uiSortable"]',
                axis: 'y',
                handle: 'button.drag-btn',
                cancel: '',
                start: function(e, ui) {
                    $('.is-dragged').removeClass('is-dragged')
                    $(ui.item).addClass('is-dragging')
                    let clone = $(ui.item).html();
                    placeholderHeight = ui.item.height();
                    ui.placeholder[0].innerHTML = clone;
                    ui.placeholder[0].style.visibility = 'visible';
                },
                update: function(e, ui) {
                    $(ui.item).removeClass('is-dragging').addClass('is-dragged').removeAttr('style');
                }
            },
            // mod-date:0925: 드랍이 목록에서 벋어나면 콜백함수
            outCallBack: function(callback) {
                let _this = this; // wa-241029 | 순서변경 화살표버튼 접근성 대응
                this.options.
                    stop = function(e, ui){
                        const top = $(this).offset().top;
                        const height = $(this).height();
                        const itemHeight = ui.item.height() / 3; // 상하 여유 영역
                        if (ui.offset.top < top - itemHeight || ui.offset.top > top + height - itemHeight) {
                            setTimeout(function () {
                                //callback
                                if (typeof callback === 'function') callback();
                            }, 0);
                        }
                        _this.setButtonTitle($(ui.item[0]).closest('.ui-sortable'));	 // wa-241029 | 순서변경 화살표버튼 접근성 대응
                    }
                this.init()
            },
            // wa-241112 | 순서변경 ui clear 기능
            clear: function ($sortable) {
                if ($sortable.hasClass('ui-sortable')) {
                    this.refresh()
                    $sortable.sortable('destroy');
                }

                return this;
            },
            init: function(opt = {}) {
                this.options = Object.assign(this.options, opt);
                if(!$(this.options.el).length) return;
                let sortTypeClass = $('[data-sort=drag]').hasClass('on') ? 'sort-type-drag':'sort-type-arrow';
                uiSortable.cache = Array($(this.options.el).length);
                $(this.options.el).each(function(index, item) {
                    uiSortable.cache[index] = $(item).html();
                })
                $(this.options.el).addClass(sortTypeClass).sortable(this.options).disableSelection();
                this.set().event();
            },
            set: function() {
                let isArrow = $('.sel-swap-wrap').find('.on').data('sort') == 'arrow';
                $(this.options.el).find('li .up-down button').prop('disabled', false)
                if(isArrow) {
                    $(this.options.el).find('> li:first-child').find('[data-sort="up"]').prop('disabled', true)
                    $(this.options.el).find('> li:last-child').find('[data-sort="down"]').prop('disabled', true)
                }
 				// wa-241029 | 순서변경 화살표버튼 접근성 대응
                let _this = this
                $(this.options.el).each(function () {
                    _this.setButtonTitle($(this))
                })

                return this;
            },
            refresh: function() {
                // $(this.options.el).html(this.cache).sortable('refresh');
                $(this.options.el).each(function(index, item) {
                    $(item).html(uiSortable.cache[index])
                })
                return this;
            },
            transform: function($item, value) {
                $item.css({
                    transform : `translateY(${value}px)`,
                    transition: `transform .4s`
                })
                return this;
            },
            event: function() {
                let _this = this;	 // wa-241029 | 순서변경 화살표버튼 접근성 대응
                const sortUpDown = function($item, isUp) {
                    const $this = $(event.target);
                    const $targetItem = isUp ? $item.prev(): $item.next();
                    const index = $item.index();
                    const animationSpeed = 300;

                    $item.addClass('is-dragging is-dragged').siblings().removeClass('is-dragged')
                    $targetItem.addClass('is-dragging')
                    if(isUp && index !== 0) {
                        uiSortable.transform($item, $targetItem.outerHeight()*-1);
                        uiSortable.transform($targetItem, $item.outerHeight());

                    }else if(!isUp && index !== $(uiSortable.options.el).children().length - 1){
                        uiSortable.transform($item, $targetItem.outerHeight());
                        uiSortable.transform($targetItem, $item.outerHeight()*-1);
                    }
                    setTimeout(()=>{
                        $item.removeAttr('style').removeClass('is-dragging')
                        $targetItem.removeAttr('style').removeClass('is-dragging')
                        if(isUp) $item.insertBefore($targetItem)
                        else $item.insertAfter($targetItem)

                        // 접근성
                        uiSortable.set();
                        if($this.is('[disabled]')) $this.siblings('button').focus();
                        else $this.focus();

                        _this.setButtonTitle($item.closest('.ui-sortable'));	 // wa-241029 | 순서변경 화살표버튼 접근성 대응
                    }, animationSpeed)
                }
                const sortType = function($this, type) {
                    let otherType = 'sort-type-arrow sort-type-drag'.replace(`sort-type-${type}`,'');
                    $(uiSortable.options.el).removeClass(otherType).addClass(`sort-type-${type}`);
                    $this.addClass('on').siblings().removeClass('on');
                    _this.setButtonTitle($this.closest('.ui-sortable'));	 // wa-241029 | 순서변경 화살표버튼 접근성 대응
                }
                $(document).off('click', '[data-sort]').on('click', '[data-sort]', function() {
                    // wa-241029 | 순서변경 버튼 선택됨
                    let dragTitle = 'drag & drop 방식으로 순서변경';
                    let arrowTitle = 'up/down 방식으로 순서변경';
                    let sort = $(this).data('sort')
                    if (sort === 'drag') {
                        dragTitle += '(선택됨)'
                    } else if (sort === 'arrow' || sort === 'down' || sort === 'up') {
                        arrowTitle += '(선택됨)'
                    }
                    $('.sel-swap-wrap button[data-sort=drag]').attr('title', dragTitle);
                    $('.sel-swap-wrap button[data-sort=arrow]').attr('title', arrowTitle)

                    switch($(this).data('sort')) {
                        case 'up' : sortUpDown($(this).closest('li'), true);break;
                        case 'down' : sortUpDown($(this).closest('li'), false);break;
                        case 'drag' : sortType($(this), 'drag');break;
                        case 'arrow' : sortType($(this), 'arrow');uiSortable.set();break;
                        case 'reset' : uiSortable.refresh().set();break;
                    }
                })
            },
 			// wa-241029 | 순서변경 화살표버튼 접근성 대응
            setButtonTitle ($item) {
                let sortLength = $item.find('> li').length
                $item.find('> li').each(function (idx, el) {
                    let upTitle = idx > 0 ? idx + '번째로 이동' : '위로 이동'
                    let downTitle = idx < sortLength - 1 ? (idx + 2) + '번째로 이동' : '아래로 이동'
                    $(this).find('.up-btn').attr('title', upTitle)
                    $(this).find('.down-btn').attr('title', downTitle)
                })
            }
        }

        //body scroll lock
        let Body = {
            scrollTop: '',
            lock: function () {
                if (!$('html').hasClass('lock') && $('.pg-wrap').length) {
                    Body.scrollTop = window.pageYOffset;
                    const $wrap = $('.pg-wrap');
                    const $wrapTop = $wrap.length ? $wrap.offset().top : 0;
                    const $setTop = Body.scrollTop * -1 + (($wrap.hasClass('full')) ? 0 : $wrapTop);
                    $wrap.not('.full').css('top', $setTop);
                    if ($wrap.length) $('html').addClass('lock');

                    if($wrap.find('.pg-footer').length) $wrap.find('.pg-footer').addClass('nofix');
                }
            },
            unlock: function () {
                if ($('html').hasClass('lock') && $('.pg-wrap').length) {
                    $('html').removeClass('lock');

                    $('.pg-wrap').find('.pg-footer').removeClass('nofix');

                    $('.pg-wrap').not('.full').removeAttr('style');
                    window.scrollTo(0, Body.scrollTop);
                    window.setTimeout(function () {
                        Body.scrollTop = '';
                    }, 0);
                }
            }
        };

        //상품안내 스크롤 bg 제어
        let prodIntroAni = {
            options: {
                el: '.prod-intro'
            },
            init: function() {
                if(!$(this.options.el).length) return;
                this.event();
                _front.scroll();
            },
            event: function() {
                $(window).off('scroll').on('scroll', function () {
                    // let $cascadeWrapTop = $('.prod-intro .cascade-wrap').offset().top;
                    let $visualH = $('.prod-intro .focus-visual').innerHeight();
                    let $wTop = $(window).scrollTop();

                    $wTop > $visualH ? $('.pg-gnb').removeClass('on') : $('.pg-gnb').addClass('on');
                });
            }
        };

        //거래내역조회 스크롤 제어
        let transListAni = {
            options: {
                el: '.visual-wrap .visual-area',
                height: 0,
            },
            init: function() {
                if(!$(this.options.el).length) return;

                const calcSize = setInterval(() => {
                    if ($(this.options.el).outerHeight() != 0) {
                        clearInterval(calcSize);
                        this.event();
                    }
                }, 100);
            },
            event: function() {
                let _el = $(this.options.el);
                let defaultHeight = _el.outerHeight() - 60; // 60px == 6rem == 스티키 일때 높이
                let docH = _el.closest('.pg-wrap').outerHeight();
                let winH = $(window).height();
                let listH = $('.account-list').outerHeight(); // 스크롤 추가 로딩감지
                $(window).off('scroll').on('scroll', function (e) {
                    let $scrollT = $(window).scrollTop();
                    if(listH != $('.account-list').outerHeight()) {
                        listH = $('.account-list').outerHeight();
                        docH = _el.closest('.pg-wrap').outerHeight();
                    }

                    if($scrollT > 0 && docH > winH) {
                        _el.addClass('on')
                        if(docH - winH < defaultHeight) _el.parents('.visual-wrap').css({'margin-bottom': defaultHeight+32});
                        _el.addClass('sticky');
                        $('.visual-wrap .inq-state').addClass('sticky');
                        $('.visual-wrap .acc-profile-wrap').addClass('sticky');
                    }else{
                        // mod-date:1026:바텀쉬트 올라왔을때 대응
                        if(!$('html').is('.lock')) {
                            _el.removeClass('on')
                            _el.parents('.visual-wrap').css({'margin-bottom': 0 });
                            _el.removeClass('sticky');
                            $('.visual-wrap .inq-state').removeClass('sticky');
                            $('.visual-wrap .acc-profile-wrap').removeClass('sticky');
                        }
                    }
                });
            }
        };

        $.fn.changeTxt = function (beforeTxt, afterTxt) {
            return this.each(function () {
                const element = $(this);
                const $html = element.html();
                if ($html != undefined && $html != '') {
                    element.html($html.split(beforeTxt).join(afterTxt));
                }
            });
        };

        $.fn.changeAriaLabel = function (beforeTxt, afterTxt) {
            return this.each(function () {
                const element = $(this);
                const $ariaLabel = element.attr('aria-label');
                if ($ariaLabel != undefined) {
                    const $ariaLabel2 = $ariaLabel.split(beforeTxt).join(afterTxt);
                    element.attr('aria-label', $ariaLabel2);
                }
            });
        };

        $.fn.hasScroll = function() {
            return (this.prop('scrollHeight') == 0 && this.prop('clientHeight') == 0) || (this.prop('scrollHeight') > this.prop('clientHeight'));
        }

        //숫자만
        let onlyNumber = function(num){
            return num.toString().replace(/[^0-9]/g,'');
        };

        //콤마넣기
        let addComma = function(num){
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
        };

        //콤마빼기
        let removeComma = function(num){
            return num.toString().replace(/,/gi,'');
        };

        //태그스크롤
        let tagScroll = function(divNum) { //divNum : 한 줄에 노출되는 최소 갯수
            let $hashBtn = $('.hash-list button');
            let $halfLength = Math.floor($hashBtn.length / 2);

            if ($hashBtn.length > 0) {
                $hashBtn.length < divNum * 2 ? $hashBtn.eq(divNum - 1).after('<br>') : $hashBtn.eq($halfLength - 1).after('<br>');
            }
        }

        //[접근성] 박스형 라디오 체크박스 (230405 추가)
        let addAriaLabel = function($el) {
            // wa-241122 | input checkbox, aria-label 제공
            let $label = $el.siblings('label');
            if ($label.length) {
                $el.attr('aria-label', $label.text().trim()).siblings('label').attr('aria-hidden', 'true');
            }

            if ($el.attr('aria-controls') && $el.is(':visible')) { //0727 pic0010300 테스트중
                let $panel = $('#' + $el.attr('aria-controls'));
                $('#' + $el.attr('aria-controls')).show();
                $el.attr('aria-expanded', true);
                if ($el.prop('checked')) {
                    $panel.show();
                    $el.attr('aria-expanded', true);

                } else {
                    $panel.hide();
                    $el.attr('aria-expanded', false);
                }
            }

            if($el.hasClass('disabled')) {
                $el.attr('aria-disabled', true)
            }
            if($el.is('[role=radio], [role=checkbox]')) {
                if($el.hasClass('selected') || $el.hasClass('checked')) {
                    $el.attr('aria-checked', true)
                }else {
                    $el.attr('aria-checked', false)
                }
            }

            //[접근성] 체크박스에 속해있는 내용에 선택됨 표시
            let $child = $el.siblings('.chk-card-wrap').find('[role=text]');
            //$child.attr('tabindex', 0);
            $child.not('.disable, .already').each(function(){
                if($el.hasClass('checked')) $(this).attr('aria-label', $.trim($(this).text()) + ' 선택됨')
                else $(this).removeAttr('aria-label');
            });

            if($el.is('[type=checkbox]') && ($el.parents('.agree-item').length || $el.parents('.prod-chk').length)) {
                if($el.parents('.btn-link').length || $el.next('label:contains("필수동의")').length || $el.next('label:contains("선택동의")').length) {
                    // wa-241030: 약관 레이블 변경
                    // let badge = $label.find('.badge').length ? ' ' + $label.find('.badge').text() : ''; // mod-date:1128:badge 내용 추가
                    // let labelTitle = $label.attr('title') ? $label.attr('title') +' '+ badge : `${$label.text()} ${badge}`;
                    let $agreeItem = $el.closest('.agree-item, .prod-chk'); // wa-241122 | input, aria-label 제공
                    if ($agreeItem.length > 0) {
                        if ($agreeItem.hasClass('btn-link')) {
                            $el.attr('aria-label', `${$label.text()}, 체크박스 선택시 페이지 이동 `);
                        }
                        $label.removeAttr('title');
                    }
                    // wa-241030: 약관 레이블 변경
                }
            }
        };

        //전체메뉴
        let allMenu = {
            init: function() {
                // 변수설정
                this.$wrap = $('.all-menu');
                // this.$document = $('.all-menu .contents-wrap');
                this.$document = $(document);
                this.$sticky = this.$document.find('.sticky');
                this.$navigator = this.$document.find('.nav-area');
                // s: wa_sscn_2차 251119: 전체메뉴 네비게이션 수정
                // this.$swiper =  this.$document.find('.nav-area .ui-swiper');
                this.$navWrap = this.$document.find('.nav-area .nav-wrap');
                // e: wa_sscn_2차 251119: 전체메뉴 네비게이션 수정
                this.$lnb = this.$document.find('.lnb-wrap .lnb:visible');
                this.expended = 'open';
                this.activeClass = 'active';
                this.fixedClass = 'fixed';

                this.navigator.init();
                setTimeout(()=>{
                    this.event();
                }, 200)
            },
            event: function() {
                let _this = this;
                let isScrolling = false, isClicked= false, durationTime = 300, fixedHeight = 0, documentWidth = 0, resizeFn = null;

                // 네비게이터 메뉴 이동할 위치
                let setOffset = function() {
                    documentWidth = $(window).width();
                    offsetTop = allMenu.$sticky.map((i, el)=>{
                        // $(el).next('div').css('--fixed-margin-top', parseInt($(el).outerHeight()))
                        $(el).next('div').css('--fixed-margin-top', parseInt(el.offsetHeight)) // sscn 260120: 개발소스에서 outerHeight()값이 다르게 계산되어 수정
                        return el.offsetTop - (parseInt($(el).css('top')) ? parseInt($(el).css('top')) : 0);
                    });
                }
                setOffset();

                // 갤럭시 폴드 단말에서 리사이징 필요
                $(window).off('resize.allmenuEvent').on('resize.allmenuEvent', function() {
                    clearTimeout(resizeFn)
                    resizeFn = setTimeout(()=>{
                        if(documentWidth != $(window).width()) setOffset();
                    }, 300)
                });

                // 스크롤이벤트
                this.$document.off('scroll.allmenuEvent').on('scroll.allmenuEvent', function() {
                    if(isScrolling) return false;
                    let scrollTop = Math.round($(this).scrollTop()), stickyTop = 0;
                    // sticky 영역에 fixed 클래스 삽입/삭제
                    allMenu.$sticky.each(function(i) {
                        stickyTop = (i == 0) ? allMenu.$sticky.eq(i).offset().top : allMenu.$sticky.eq(i-1).offset().top + allMenu.$sticky.eq(i-1).outerHeight();
                        if(scrollTop > 0 && scrollTop >= offsetTop[i]) {
                            if(!$(this).hasClass(allMenu.fixedClass)) {
                                $(this).addClass(allMenu.fixedClass)
                                setTimeout(()=>{
                                    fixedHeight += $(this).outerHeight();
                                }, durationTime)
                            }
                        }else if($(this).hasClass(allMenu.fixedClass)) {
                            fixedHeight -= $(this).outerHeight();
                            $(this).removeClass(allMenu.fixedClass);
                        }
                    });

                    // lnb 영역에 맞춰 네비게이트 리스트에 active 클래스 삽입/삭제
                    allMenu.$lnb.each(function(i) {
                        let lnbOffsetTop = Math.round(this.offsetTop);
                        if(!isClicked && scrollTop >= lnbOffsetTop - fixedHeight && scrollTop <= lnbOffsetTop - fixedHeight + $(this).height()) {
                            let activeIndex = (fixedHeight<=0) ? 0 : i;

                            // s: sscn 251204: 아이서비스 전체메뉴 수정
                            if($(this).closest('.all-menu.type-child')) {
                                lnbOffsetTop = Math.round(this.offsetTop)
                                fixedHeight = parseInt(allMenu.$navigator.css('top')) + allMenu.$navigator.outerHeight();
                                activeIndex = i
                            }
                            // e: sscn 251204: 아이서비스 전체메뉴 수정

                            allMenu.navigator.navActive(activeIndex)// wa_sscn_2차 251119: 전체메뉴 네비게이션 수정
                        }
                    })

                    // s: sscn 251204: 아이서비스 전체메뉴 수정
                    if($('.all-menu.type-child').length) {
                        const $chiTotalMenu = $('.all-menu.type-child');
                        const $chiNavArea = $chiTotalMenu.find('.nav-area');
                        const $chiUserArea = $chiTotalMenu.find('.user-area');
                        if(scrollTop > 0) {
                            $chiUserArea.addClass('on-scroll')
                            if (scrollTop + $chiUserArea[0].clientHeight + $chiTotalMenu.find('.pg-gnb')[0].clientHeight >= Math.round($chiNavArea.offset().top) - 1) {
                                $chiNavArea.addClass('on-scroll')
                            } else {
                                $chiNavArea.removeClass('on-scroll')
                            }
                        } else {
                            $chiUserArea.removeClass('on-scroll')
                        }
                    }
                    // e: sscn 251204: 아이서비스 전체메뉴 수정
                });

                // s: wa_sscn_2차 251119: 전체메뉴 네비게이션 수정
                // 네비게이터 메뉴 이동
                this.$document.off('click', '.nav-area .item button').on('click', '.nav-area .item button', function() {
                    isScrolling = true; // 스크롤 중인지 체크
                    isClicked = true; // 클릭한 경우에는 네비게이터 메뉴(스와이프) active 클래스 고정
                    allMenu.$sticky.addClass(allMenu.fixedClass);
                    allMenu.navigator.navActive($(this).parents('.item').index())
                    fixedHeight = parseInt(allMenu.$navigator.css('top')) + allMenu.$navigator.outerHeight();
                    $(this).attr('title','선택됨').parents('.item').siblings().find('button').removeAttr('title'); // mod-date:0926:접근성 대응 선택된 타이틀 추가
                    $(this).closest('.nav-scroll-area').attr('tabindex', -1).focus(); // mod-date:1130:[접근성] 포커스 순차선택으로 인한 스와이프 초기화

                    // s: sscn 251204: 아이서비스 전체메뉴 수정
                    if($(this).closest('.all-menu.type-child').length) {

                        // if(fixedHeight >= 200) fixedHeight = 184
                        if(fixedHeight >= 200) fixedHeight = parseInt(allMenu.$navigator.css('top')) + 78
                        $(this).closest('.all-menu.type-child').find('.nav-area').addClass('on-scroll')
                        $(this).closest('.all-menu.type-child').find('.user-area').addClass('on-scroll')
                    }
                    // e: sscn 251204: 아이서비스 전체메뉴 수정

                    // 네비게이터 해당 메뉴로 이동
                    // ㄴ 스크롤 셀렉터가 $(document)가 아닌 경우 $('html, body') => allMenu.$document 로 수정 필요
                    $('html, body').animate({
                        scrollTop: allMenu.$lnb.eq($(this).parents('.item').index())[0].offsetTop - fixedHeight
                    }, durationTime+100,()=>{
                        $(this).closest('.nav-scroll-area').removeAttr('tabindex'); // mod-date:1130:[접근성] 포커스 순차선택으로 인한 스와이프 초기화
                        // wa-240926 | 홈 > 메뉴, 접근성 focus
                        $('#'+$(this).attr('aria-controls')).find('.menu-tit .sub-cat').attr('tabindex', -1).focus().one('blur', e => $(e.target).removeAttr('tabindex'));
                        isScrolling = false;
                        setTimeout(()=>isClicked = false, 100)
                    });
                })

                this.$document.off('focusin', '.nav-area .item button').on('focusin', '.nav-area .item button', function() {
                    allMenu.navigator.navFocusScroll($(this))
                })
                // e: wa_sscn_2차 251119: 전체메뉴 네비게이션 수정
            },
            navigator: {
                // s: wa_sscn_2차 251119: 전체메뉴 네비게이션 수정
                init: function(initialIndex) {
                    if(!allMenu.$navigator.length) return false;
                    let li = ``, targetId = 'lnb';
                    initialIndex = initialIndex ? initialIndex : 0;
                    allMenu.$lnb.each(function(i) {
                        $(this).attr('id', targetId+i)
                        if(allMenu.$navWrap.find('li').length) {
                            allMenu.$navWrap.find('li').eq(i).attr({'aria-controls':targetId+i})
                        }else {
                            li += `<li class="item ${i==initialIndex? 'active':''}"><button type="button" ${i==initialIndex? 'title="선택됨"': ''} aria-controls="${targetId+i}">${$(this).find('.menu-tit').text()}</button></li>`;
                        }
                    })
                    allMenu.$navigator.find('ul').append(li);
                    uiSwiper.init();
                },
                navFocusScroll: function(_target) {
                    const $container = _target.closest('.nav-wrap')[0];
                    if(!$container) return;

                    const _left = _target[0].offsetLeft - 24

                    if(uiMobile.iOS()) {
                        allMenu.navigator.smoothScrollX($container, _left); // ios 스크롤 중복 버벅임 대응
                    } else {
                        $container.scrollTo({
                            left: _left,
                            behavior: "smooth"
                        })
                    }
                },
                navActive: function(scrollActiveIndex) {
                    allMenu.$navWrap.find('.item').eq(scrollActiveIndex).addClass(allMenu.activeClass).siblings().removeClass(allMenu.activeClass);
                    allMenu.$navWrap.find('.item.active').children('button').attr('title', '선택됨').parent('.item').siblings().children('button').removeAttr('title');

                    const $targetNav = $('.item.active');
                    setTimeout(() => allMenu.navigator.navFocusScroll($targetNav))
                },
                smoothScrollX: function(container, targetLeft, duration = 240) { // ios 스크롤 중복 버벅임 대응
                    if(container._refRun) cancelAnimationFrame(container._refRun); // 중복 호출 방지

                    const startLeft = container.scrollLeft;
                    const distance = targetLeft - startLeft;
                    const startTime = performance.now();

                    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic 함수

                    const animate = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = easeOutCubic(progress);

                        container.scrollLeft = startLeft + distance * eased;

                        if (progress < 1) container._refRun = requestAnimationFrame(animate);
                    };
                    container._refRun = requestAnimationFrame(animate);
                }
                // e: wa_sscn_2차 251119: 전체메뉴 네비게이션 수정
            }
        }

        // 0831 : 탭스크롤 위치 이동(MSB_INQ_18_001, MSB_MIN_05_001)
        let uiScrollTab = {
            init: function() {
                this.$tabList = $('.tab-list');
                this.$scrollPanel = $('.scroll-panel');
                this.pageFlag = $pgWrap().is('.bg-fixed-gr01') // 상품 : 공통
                pageHeaderH = $('.pg-gnb').outerHeight();
                tabListH = this.$tabList.outerHeight();
                this.stickyTop = !this.pageFlag ? pageHeaderH+tabListH : $(".pg-wrap").width() > 320 ? 110 : 100; // mod-date:1026:갤럭시폴드반응형 사이즈 적용
                this.$items = this.$scrollPanel.find(this.pageFlag ? '.prod-card-wrap' : '.acc-item-wrap');
                if(this.$items.length == 0) {
                    this.$items = this.$scrollPanel.find('.acc-item-wrap');
                }
                // s: mod-date:0830
                let sceneTop = this.getSceneTop();
                let extraHeight = $(window).height() - ($(document).height() - sceneTop[sceneTop.length-1]);
                $('.extra-block').css('height', extraHeight+'px')
                // e: mod-date:0830

                this.debugIosVer = [16].includes(uiMobile.iPhoneVersion()); // mod-date:0913:ios16 분기

                if(this.pageFlag) {
                    // 상품목록에선 새로고침 후 스크롤 위치 초기화(top)
                    setTimeout(()=>uiScrollTab.goto(0,false,true), 100)
                }

                // mod-date:1005:접근성 추가
                this.$tabList.find('button').each(function(){
                    if ($(this).hasClass('active')) $(this).attr('title', '선택됨');
                })

                this.event();
            },
            // mod-date:0913:ios16에서 $().animate() 버벅임때문에 대체
            scrollTo: function(target, callback){
                const fixedOffset = target.toFixed();
                const onScroll = function() {
                    const currentScrollOffset = window.pageYOffset || document.documentElement.scrollTop
                    if(currentScrollOffset.toFixed() == fixedOffset) {
                        $(document).off('scroll.tabScroll', onScroll);
                        callback();
                    }
                }
                $(document).on('scroll.tabScroll', onScroll);
                onScroll();
                window.scrollTo({
                    top: target,
                    behavior: 'smooth'
                });
            },
            event: function() {
                const _this = uiScrollTab;
                let isScrolling = false, isClicked= false;

                this.$tabList.find('button').off("click").on("click", function(e){
                    e.preventDefault();
                    isScrolling = true;
                    let isTop = $(this).index() == 0;
                    let activeIndex = isTop ? 0 : (_this.pageFlag ? $(this).index() : $(this).index()-1);
                    let sceneTop = _this.getSceneTop(); // mod-date:0830
                    isClicked = true;
                    _this.goto(activeIndex, isClicked, isTop);
                    // mod-date:1127:스크롤애니메이션 후 콜백 함수 정리
                    const scrollCallBack = function() {
                        isScrolling = false;
                        setTimeout(()=>isClicked = false, 100)
                        UICommon.tabMenu.tabScroll($('.tab-list').find('button').eq(activeIndex));
                        if(_this.pageFlag) {
                            _this.$items.eq(activeIndex).find('h2').attr('tabindex', -1).focus() // mod-date:1004: 컨텐츠 포커스
                        } else if(!isTop) {
                            _this.$items.eq(activeIndex).find('.sticky').attr('tabindex', -1).focus() // mod-date:1004: 컨텐츠 포커스
                        }
                    }
                    // acc-item-wrap 위치 찾아가기
                    // mod-date:0913:ios16에서 jQuery.animate() {scrollTop} 버벅임때문에 분기
                    if(_this.debugIosVer) {
                        _this.scrollTo(isTop ? 0 : sceneTop[activeIndex],  scrollCallBack)
                    } else {
                        $('html, body').stop().animate({
                            scrollTop: isTop ? 0 : sceneTop[activeIndex]
                        }, 400, scrollCallBack);
                    }
                });
                // 스크롤이벤트
                $(document).off('scroll.min05001Event').on('scroll.min05001Event', function() {
                    if(isScrolling) return false;
                    const scrollTop = Math.round($(this).scrollTop());
                    const sceneTop = _this.getSceneTop(); // mod-date:0830

                    _this.$items.each(function(i) {
                        if(!isClicked && $(this).is(':visible')) {   // 0713:수정
                            const endIndex = sceneTop[i+1] ? i+1:i;
                            if(scrollTop >= sceneTop[i] && (scrollTop < sceneTop[endIndex] || i == sceneTop.length-1)) {
                                if(!$(this).hasClass('active')) {
                                    _this.goto(i, isClicked, false);
                                }
                            }else if($(this).hasClass('active')){
                                _this.goto(i, isClicked, scrollTop < sceneTop[i]);
                            }
                        }
                    })
                });
            },
            goto: function(activeIndex, isClicked, isTop) {
                // wa-241122 | 오픈뱅킹 - 다른금융조회 상태정보
                const _this = uiScrollTab;
                let extraNumber = (isTop) ? 0 : uiScrollTab.pageFlag ? 0 : 1;
                if(isTop) {
                    _this.$items.removeClass('active');
                    _this.$tabList.removeClass('on');
                }else {
                    if(!_this.$tabList.hasClass('on')) _this.$tabList.addClass('on')
                    _this.$items.eq(activeIndex).addClass('active').attr('title', '선택됨').siblings().removeClass('active').removeAttr('title');
                }
                if(!isClicked) {
                    _this.$tabList.find('button').eq(activeIndex+extraNumber).addClass('active').attr('title', '선택됨').siblings().removeClass('active').removeAttr('title');
                    UICommon.tabMenu.tabScroll(_this.$tabList.find('button.active'));
                    if(_this.pageFlag) UICommon.tabMenu.tabBar(100);
                }
            },
            getSceneTop: function() {
                const _this = uiScrollTab;
                let tempSceneTop = 0;
                return _this.$items.map((i, el)=>{
                    //let sat = parseInt($(el).css('--sat')) ? parseInt($(el).css('--sat')) : 0; // mod-date:1125:iOS bug fixed
                    // iOS safe area 높이값은 이미 페이지 헤더에 포함됨
                    let fixedTopHeight = _this.stickyTop; // mod-date:1125:iOS bug fixed '+sat' //fixedTopHeight = fixed영역(pg-gnb + tab-list 높이값)
                    // 영역이 숨어 있는 케이스에서 사용할 높이값 저장
                    if(Math.round($(el).offset().top)-fixedTopHeight > 0) {
                        tempSceneTop = Math.round($(el).offset().top+$(el).height())-fixedTopHeight; // 0713:수정
                    }
                    return Math.round($(el).offset().top)-fixedTopHeight < 0 ? tempSceneTop :Math.round($(el).offset().top)-fixedTopHeight; // 0713:수정
                });
            }
        }
        let uiScrollTabTotal = {  // 240503
            init: function() {
                this.event();
            },
            event : function() {
                // 슬라이드 탭 높이
                const headHeight = $('.pg-header').outerHeight(); // 헤더 높이
                const tabHeight = $('.tab-list.start-fit').outerHeight(); // 사이다뱅크, 다른금융 탭 높이
                const slideListHeight = $('.tab-wrap.round .tab-list').outerHeight(); // 라운드 탭 높이

                const updateSlideListOnClass = (scrollTop, firstSectionOffset) => {
					const activeContent = $('.tab-wrap .tab-panel.active');
                    const assetWrap = activeContent.find('.asset-wrap').outerHeight(true);

                    // '.tab-wrap.round .tab-list'에 'on' 클래스를 추가 또는 제거
                    if (scrollTop >= assetWrap) {
                        $('.tab-wrap.round .tab-list').addClass('on');
                    } else {
                        $('.tab-wrap.round .tab-list').removeClass('on');
                    }
                };

                const updateMenuAreaOnClass = (scrollTop, secTitPositions) => {
                    // 첫 번째 섹션 이전으로 스크롤하면 'scroll-panel acc-item-wrap'의 모든 'on' 클래스를 제거
                    if (scrollTop < secTitPositions[0] - 100) {
                        $('.scroll-panel .acc-item-wrap').removeClass('on');
                    }
                };
                uiScrollTabTotal.panelInit(); // sscn 260113: 마지막 아이템 높이 초기화

                // 탭 클릭 또는 터치 이벤트
                $('.scroll-wrap.total button').off('click').on('click', function(event) {
                    event.preventDefault(); // 기본 동작을 방지

                    // sscn 260113: 마지막 아이템 높이 초기화
                    setTimeout(()=> {
                        uiScrollTabTotal.panelInit()
                        $(window).trigger('scroll')
                    }) 

                    // 활성화된 탭의 콘텐츠 영역 설정
                    const tabNumber = $(this).index() + 1;
                    const content = $('#tabpanelLine-' + tabNumber);

                    // 모든 콘텐츠에서 'active' 제거 및 현재 콘텐츠에 'active' 추가(접근성)
                    $('.tab-panel').removeClass('active').attr('aria-hidden', 'true');
                    content.addClass('active').attr('aria-hidden', 'false');

                    // 'tab-wrap round scroll-wrap'의 첫 번째 버튼을 활성화 상태로 설정(접근성)
                    // wa-241205 | 라운드 탭 button - aria-selected 삭제
                    // content.find('.tab-wrap.round .scroll-wrap button').removeClass('active').attr('aria-selected', 'false');
                    // content.find('.tab-wrap.round .scroll-wrap button').eq(0).addClass('active').attr('aria-selected', 'true');

                    // 탭 전환 후 최상단으로 스크롤 (탭과 '.tab-wrap.round .tab-list'의 높이를 고려)
                    const targetScrollTop = content.find('.asset-wrap').offset().top - tabHeight - slideListHeight - headHeight;

                    $('html, body').animate({ scrollTop: targetScrollTop }, 0);

                    // 탭 전환 후 콘텐츠에 포커스 이동
                    content.find('.acc-item-wrap').attr('tabindex', '-1').focus();

                    // '.tab-wrap.round .tab-list'에 'on' 클래스 업데이트
                    const firstSectionOffset = content.find('.scroll-panel .acc-item-wrap').length ? content.find('.scroll-panel .acc-item-wrap').eq(0).offset().top : undefined; // sscn 260113: nodata인 경우 고려
                    updateSlideListOnClass(targetScrollTop, firstSectionOffset);
                });

                // 'tab-wrap round scroll-wrap' 버튼 클릭 이벤트
                // wa-240926 | 안드로이드 스크롤(리더기 사용시 작동 안함)
                $('.tab-wrap.round .scroll-wrap button').off('touchstart click').on('touchstart click', function(event) {
                    event.preventDefault(); // 기본 동작을 방지
                    // 활성화된 콘텐츠 확인
                    const parentContent = $(this).closest('.tab-wrap .tab-panel');
					const topVal = parseInt(parentContent.find('.item-prod.sticky.items').css('top'))
                    // 클릭된 버튼의 인덱스를 기반으로 스크롤 위치 설정
                    const index = $(this).index();
                    let targetScrollTop = 0;
                    let targetSection = null;

                    $(this).attr('title', '선택됨').siblings('button').removeAttr('title');

                    // 첫 번째 버튼 클릭 시 최상단으로 스크롤
                    if (index === 0) {
                        targetScrollTop = parentContent.find('.asset-wrap').offset().top - tabHeight - slideListHeight - headHeight;
                        event.target.focus();
                    } else {
                        // 해당 섹션의 위치로 스크롤
                        targetSection = parentContent.find('.scroll-panel .acc-item-wrap').eq(index - 1);
                        targetScrollTop = targetSection.offset().top - topVal + 2;
                        // parentContent.find('.tab-wrap.round .tab-list').addClass('on');
                    }

                    // 애니메이션으로 스크롤
                    // wa-240926 | 스크롤 이동후 포커스
                    parentContent.find('.scroll-panel .acc-item-wrap .item-prod > strong').removeAttr('tabindex');
                    $('html, body').animate({ scrollTop: targetScrollTop }, 'smooth', () => {
                        setTimeout(() => {
                            if (index > 0) targetSection.find('.item-prod > strong').attr('tabindex', -1).focus();
                        }, 1);
                    });

                    const firstSectionOffset = parentContent.find('.scroll-panel .acc-item-wrap').eq(0).offset().top;
                    updateSlideListOnClass(targetScrollTop, firstSectionOffset);
                });

                // 스크롤 이벤트 리스너
                $(window).on('scroll', function() {
                    // 현재 스크롤 위치와 활성화된 콘텐츠의 섹션 위치를 확인
                    const scrollTop = $(window).scrollTop();
                    const activeContent = $('.tab-wrap .tab-panel.active');
                    const assetWrap = activeContent.find('.asset-wrap').outerHeight(true);
					const topVal = parseInt(activeContent.find('.item-prod.sticky.items').css('top'))
                    const secTitPositions = activeContent.find('.scroll-panel .acc-item-wrap').map(function() {
                        return $(this).offset().top; // 각 섹션의 위치를 얻기
                    }).get();

                    // 라운드 버튼, 섹션 이동에서 'on' 클래스 제거
                    activeContent.find('.tab-wrap.round .scroll-wrap button').removeClass('active').removeAttr('title');//.attr('aria-pressed', 'false');
                    activeContent.find('.acc-item-wrap').removeClass('on');

                    // s: sscn 260113: nodata인 경우 고려
                    // 라운드 버튼 'on' 클래스 업데이트
                    if(activeContent.find('.scroll-panel .acc-item-wrap').length) {
                        const firstSectionOffset = activeContent.find('.scroll-panel .acc-item-wrap').eq(0).offset().top;
                        updateSlideListOnClass(scrollTop, firstSectionOffset);
                        updateMenuAreaOnClass(scrollTop, secTitPositions);
                    }
                    // e: sscn 260113: nodata인 경우 고려

                    // 스크롤 위치에 따라 활성화된 버튼 설정
                    if (scrollTop < assetWrap) {
                        activeContent.find('.tab-wrap.round .scroll-wrap button').eq(0).addClass('active').attr('title', '선택됨');//.attr('aria-pressed', 'true');
                        activeContent.find('.scroll-panel .acc-item-wrap').removeClass('on');

                        // s: sscn 250919: 전계좌조회 라운드버튼 스크롤이동
                        // 전체 버튼에 적용
                        if($('.tab-wrap').closest('.pg-wrap.total.sscn').length && !activeContent.find('.result.nodata')) {
                            let activeBtn = activeContent.find('.tab-wrap.round .scroll-wrap').find('button.active');
                            UICommon.tabMenu.tabScroll(activeBtn);
                        }
                        // e: sscn 250919: 전계좌조회 라운드버튼 스크롤이동
                    } else {
                        for (let i = 0; i < secTitPositions.length; i++) {
							if (i != secTitPositions.length-1 &&(secTitPositions[i]+topVal - secTitPositions[i+1] <= parseInt(secTitPositions[i]-$(window).scrollTop()) && topVal >= secTitPositions[i]-$(window).scrollTop())) {
								activeContent.find('.tab-wrap.round .scroll-wrap button').eq(i + 1).addClass('active').attr('title', '선택됨');//.attr('aria-pressed', 'true');
                                activeContent.find('.scroll-panel .acc-item-wrap').slice(0, i + 1).addClass('on');

                                // s: sscn 250919: 전계좌조회 라운드버튼 스크롤이동
                                // 마지막 버튼이 아닌경우 적용
                                if($('.tab-wrap').closest('.pg-wrap.total.sscn').length) {
                                    let activeBtn = activeContent.find('.tab-wrap.round .scroll-wrap button').eq(i + 1);
                                    UICommon.tabMenu.tabScroll(activeBtn);
                                }
                                // e: sscn 250919: 전계좌조회 라운드버튼 스크롤이동
                                break;
                            }else if(i == secTitPositions.length-1 && (topVal >= secTitPositions[i]-$(window).scrollTop())){
								activeContent.find('.tab-wrap.round .scroll-wrap button').eq(i + 1).addClass('active').attr('title', '선택됨');//.attr('aria-pressed', 'true');
                                activeContent.find('.scroll-panel .acc-item-wrap').slice(0, i + 1).addClass('on');

                                // s: sscn 250919: 전계좌조회 라운드버튼 스크롤이동
                                // 마지막 버튼에 적용
                                if($('.tab-wrap').closest('.pg-wrap.total.sscn').length) {
                                    let activeBtn = activeContent.find('.tab-wrap.round .scroll-wrap button').eq(i + 1);
                                    UICommon.tabMenu.tabScroll(activeBtn);
                                }
                                // e: sscn 250919: 전계좌조회 라운드버튼 스크롤이동
								break;
							}
                        }
                    }
                });

            },
            // s: sscn 260114: 전계좌 패널 사이즈 수정 반영
            panelInit : function() {
                const activeContent = $('.tab-wrap .tab-panel.active'); // 활성화 패널
                const lastItems = activeContent.find('.acc-item-wrap:last'); // 활성화 패널 마지막 아이템
                const buffer = 6
                const headHeight = $('.pg-header').outerHeight(); // 헤더 높이
                const tabHeight = $('.tab-list.start-fit').outerHeight(); // 사이다뱅크, 다른금융 탭 높이
                const scrollPanel = activeContent.find('.scroll-panel'); // 활성화 패널 리스트 wrap
                const slideListHeight = activeContent.find('.tab-wrap.round .tab-list').is(':hidden') ? 0 : activeContent.find('.tab-wrap.round .tab-list').outerHeight(); // 라운드 탭 높이
                const fixedTitleH = activeContent.find('.item-prod.items').length ? activeContent.find('.item-prod.items').outerHeight() : 0; // 아이템 타이틀 높이
                const fixedAreaH = headHeight + tabHeight + slideListHeight + fixedTitleH; // 스크롤 fixed 영역 높이

                const bannerWrap = activeContent.find('.prod-bnr-set');
                // 개발에서 각각 배너를 display: none;으로 처리
                // 배너영역 높이 값 체크 함수 추가
                const getBannerHeight = (el) => {
                    if (!el || !el.length) return 0;
                    const outerH = el.outerHeight(true);
                    const marginTop = parseInt(el.css('margin-top'), 10) || 0;
                    return outerH === marginTop ? 0 : outerH // 모든 배너가 display: none;인 경우 0 반환
                };
                const bannerH = getBannerHeight(bannerWrap); // 배너영역 높이
                const contFootBtnH = activeContent.find('.btns.cont-foot.center').length ? activeContent.find('.btns.cont-foot.center').outerHeight(true) : 0; // 해지계좌조회 버튼영역 높이
                const contFootBtnH2 = activeContent.find('.tab-wrap.round .btns.cont-foot').length ? activeContent.find('.tab-wrap.round .btns.cont-foot').outerHeight(true) : 0; // 순서변경, 다른금융추가 버튼영역 높이
                const lastItemsHeight = (lastItems.length ? lastItems[0].clientHeight : 0) + bannerH + contFootBtnH + contFootBtnH2; // 마지막 아이템 높이 + 배너, 버튼영역 높이

                const screenHeight = window.innerHeight; // 화면 높이
                const lastItemsPaddingB = (screenHeight - (fixedAreaH + lastItemsHeight) + buffer) / 10; // 추가되는 padding-bttom 값
                const noDataCase = activeContent.find('.result.nodata').length ? ((activeContent.find('.asset-wrap').outerHeight() + activeContent.find('.result.nodata').outerHeight(true) + 24) / 10) : 0;
                const extraMargin = 4.2;
                const noDataPaddingBottom = Number((lastItemsPaddingB - noDataCase - extraMargin).toFixed(1));

                if(screenHeight > fixedAreaH + lastItemsHeight && !activeContent.find('.result.nodata').length) {
                    scrollPanel.css('padding-bottom', `${lastItemsPaddingB}rem`);
                } else {
                    scrollPanel.removeAttr('style');
                }

                if (activeContent.find('.result.nodata').length && noDataPaddingBottom > 0) scrollPanel.css('padding-bottom', `${noDataPaddingBottom}rem`);
            }
            // s: sscn 260114: 전계좌 패널 사이즈 수정 반영
        }
        let util = {
            debounce: function (func, timeout = 100) {
                let timer;
                return function (...args) {
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        func.apply(this, args);
                    }, timeout)
                }
            },
            throttle: function (func, timeout = 100) {
                let waiting = false
                return function () {
                    if (!waiting) {
                        func.apply(this, arguments)
                        waiting = true
                        setTimeout(() => {
                            waiting = false
                        }, timeout);
                    }
                }
            }
        }

        // wa-241210 | prodChk - label
        let prodChkLabel = function () {
            $('.prod-chk input').each(function () {
                $(this).attr({'role':'text'}).removeAttr('aria-label');
                if ($(this).siblings('.label')) $(this).siblings('.label').attr({'role':'text'}).removeAttr('aria-hidden');
                let $roleButton = $(this).closest('.prod-chk');
				setTimeout(function () {
					$roleButton.attr({'role': 'button', 'aria-label': $roleButton.text().trim()}).removeAttr('aria-labelledby');
				}, 100)
            })
        }

        return {
            //외부참조
            init,
            tagScroll,
            Layer,
            scTop,
            tabMenu,
            inputRange,
            _front,
            loading,

            addAriaLabel,
            accordionButton,
            pressButton,
            tooltipButton,
            toggleButton,
            swipeButton,
            uiSwiper,
            uiStep,
            uiEffect,
            uiAnimation,
            uiSortable,
            prodIntroAni,
            transListAni,
            apng,
            //퍼블만 사용 중
            uiFullpop,
            uiDate,
            Body,

            //전체메뉴
            allMenu,
            uiScrollTab,

            //전체계좌조회
            switchButton,
            uiScrollTabTotal,

            prodChkLabel,

            // 공통 유틸 추가
            util
        }
    }

    window.UICommon = new UICommon();

    if (window.UICommon && location.href.indexOf('/_pub') > -1) {
        $(window).on('load', function() {
            try {
                window.UICommon.init();
            }catch(err) {
                console.log(err)
            }
        })
    }
}





// sscn 추가 스크립트
const moveDownBtn = (() => {
    return {
        init: function() {
            setTimeout(() => {
                moveDownBtn.event();
            }, 300)
        },
        moveDown: () => {
            const $curentPgWrap = $('.pg-wrap').not('[aria-hidden=true]').last();
            if (!$curentPgWrap.find('.pg-footer .btn.scrdown').length) return;

            const winH = $(window).outerHeight();
            const $targetArea = $curentPgWrap;
            const headerH = $targetArea.find('.pg-header').outerHeight();
            const footerH = $targetArea.find('.pg-footer').outerHeight();
            let scrH = winH - headerH - footerH;
            let scrT = $(window).scrollTop(); // 페이지인 경우 스크롤 영역

            // 스크롤이동 기능
            if ( scrT <= 0 ) {
                $('html').stop().animate({scrollTop: scrH}, 300)
                scrT += scrH;
            } else {
                scrT += scrH;
                $('html').stop().animate({scrollTop: scrT}, 300)
            }
        },
        event: () => {
            const $curentPgWrap = $('.pg-wrap').not('[aria-hidden=true]').last();
            if (!$curentPgWrap.find('.pg-footer .btn.scrdown').length) return;

            const $targetArea = $curentPgWrap;
            const headerH = $targetArea.find('.pg-header').outerHeight();
            let containerH = parseInt($targetArea.find('.pg-container').outerHeight(), 10);
            const footerH = $targetArea.find('.pg-footer').outerHeight();
            const contentBottomPadding = $targetArea.find('.pg-content').css('padding-bottom');

            // 스크롤 이동시
            $(window).on('scroll', function() {
                // 정확한 높이값 재설정
                if (containerH > parseInt($targetArea.find('.pg-container').outerHeight(), 10)) containerH = parseInt($targetArea.find('.pg-container').outerHeight(), 10);

                if (headerH + containerH + footerH - parseFloat(contentBottomPadding) <= $(window).scrollTop() + $(window).outerHeight()) {
                    $targetArea.find('.pg-footer .btn.scrdown').hide().siblings().show(); //아래 내용 보기 버튼 숨김
                } else {
                    $targetArea.find('.pg-footer .btn.scrdown').show().siblings().hide(); //아래 내용 보기 버튼 노출
                }
            })

            // 바텀시트 호출시 변경되는 높이값 대응
            const targetHtml = document.documentElement;
            let isLock = targetHtml.classList.contains('lock');
            const htmlLockCheck = new MutationObserver(() => {
                const checkLock = targetHtml.classList.contains('lock');

                if (isLock !== checkLock && $targetArea.length) {
                    isLock = checkLock;
                    if (!checkLock) containerH = parseInt($targetArea.find('.pg-container').outerHeight(), 10); // lock 클래스가 사라지면 높이값 재설정
                }
            })

            htmlLockCheck.observe(targetHtml, {
                attributes: true,
                attributeFilter: ['class']
            });

            $('.pg-footer .btn.scrdown').on('click', moveDownBtn.moveDown); //버튼 클릭시 스크롤 이동
        }
    }
})()

// 아이계좌서비스 프로필영역 추가시 sticky 영역 top값 수정
const childStickyArea = (()=> {
    return {
        init: ()=>{
            const $profileArea = $('.child-service');
            const $childService = $('.pg-wrap').data('profile') === 'child';
            const _sticky = $('.sticky');
            const profileAreaH = $profileArea.outerHeight();
            if($childService) {
                _sticky.each((i, el)=>{
                    let targetTop = parseInt($(el).css('top'))
                    $(el).css('top', `calc(var(--sat) + ${(targetTop/10) + (profileAreaH/10)}rem)`)
                })
            }
        }
    }
})()

// 스크롤 애니메이션 적용 함수
const scrollAniActive = (() => {
    return {
        active : (_target, _className, threshold) => {
            _className = _className ? _className : ''
            threshold = threshold ? threshold : 0.2
            const target = document.querySelectorAll(_target);
            const options = {
                threshold: threshold
            }
            const callback = (entries) => {
                entries.forEach(element => {
                    element.isIntersecting ? element.target.classList.add(_className) : undefined
                });
            }

            const io = new IntersectionObserver(callback, options)

            target.forEach(el => io.observe(el))
        },
        toggle : (_target, _className, threshold) => {
            _className = _className ? _className : ''
            threshold = threshold ? threshold : 0
            const target = document.querySelectorAll(_target);
            const options = {
                threshold: threshold
            }
            const callback = (entries) => {
                entries.forEach(element => {
                    element.isIntersecting ? element.target.classList.remove(_className) : element.target.classList.add(_className)
                });
            }

            const io = new IntersectionObserver(callback, options)

            target.forEach(el => io.observe(el))
        }
    }
})()

// 텍스트 롤링 (mw)
const rollingTxtUI = (() => {
    return {
        init: function() {
            rollingTxtUI.event()
        },
        // 내 대출 한도조회 하기 버튼 : 하단 고정
        event : () => {
            const $rollingWrap = document.querySelector('.rolling-wrap');
            if($rollingWrap){
                const rollingAreas = $rollingWrap.querySelectorAll('.rolling-area');
                let current = [...rollingAreas].findIndex(el=>el.classList.contains('show'));
                if(current < 0) current = 0;

                rollingAreas.forEach((el, idx) => {
                    el.classList.toggle('show', idx === current)
                    // el.setAttribute('aria-hidden', idx === current ? 'false' : 'true');
                })

                setInterval(() => {
                    rollingAreas[current].classList.remove('show');
                    // rollingAreas[current].setAttribute('aria-hidden', 'true');
                    current = (current + 1) % rollingAreas.length;
                    rollingAreas[current].classList.add('show');
                    // rollingAreas[current].setAttribute('aria-hidden', false);
                }, 3000);
            }
        }
    }
})()

// 추가 스크롤 bg 제어
const gnbBgAni = {
    options: {
        el: '[data-ui="color-gnb"]'
    },
    init: function() {
        if(!$(this.options.el).length) return;
        this.event();
        // _front.scroll();
    },
    event: function() {
        $(window).off('scroll').on('scroll', function () {
            let $contentH = $('[data-ui="color-gnb"] .pg-content').children('div').first().innerHeight();
            let $wTop = $(window).scrollTop();

            $wTop > $contentH ? $('.pg-gnb').removeClass('on') : $('.pg-gnb').addClass('on');
        });
    }
};

function ready() {
    moveDownBtn.init();
    childStickyArea.init();
    rollingTxtUI.init();
    gnbBgAni.init();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}