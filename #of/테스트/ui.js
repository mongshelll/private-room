/** ---------------------------------------------------------------

 HWSB.select
 HWSB.accordion
 HWSB.fixBody
 HWSB.alertPop //open,close
 HWSB.confirmPop //open,close
 HWSB.modalLayer //open,close
 HWSB.layerFull //open,close
 HWSB.onlyDimmed
 HWSB.loading //open,close
 HWSB.toast(target,msg)

 ---------------------------------------------------------------**/

if (window.console === undefined) { console = { log: function() {} }; }

(function(window, $) {
    'use strict';
})(window, jQuery);

const speed = 350; // default ani. speed
let popIndex = 100, // z-index between layer popups
    focusMove = '<a href="#" class="pop-loop">포커스이동</a><div class="dimmed" aria-hidden="true"></div>',
    onlyDim = document.querySelector(".only-dimmed"),
    body = document.body,
    scrollTopNow=0,
HWSB = {
    init: function() {
        HWSB.select.open();
        HWSB.accordion.init();
        document.querySelectorAll(".as-has-scroll").tabindex = 0;

        // page top
        window.onscroll = function() {
            //scrollFunction()
        };
        // const speed = 200; // scroll speed
        function scrollFunction() {
            if ($(this).scrollTop() > 500) {
                HWSB.addActive(".page-top");
            } else {
                HWSB.removeActive(".page-top");
            }
        }
        // let eleTop = document.getElementsByClassName('page-top');
        // if ((typeof(eleTop) != 'undefined') && (eleTop != null)) {
        //     let topArea = '<div class="page-top">' +
        //         '<button style="float:right;">top</button>' +
        //         '</div>';
        //     $("body").append(topArea);
        // }
        // $(".page-top button").click(function() { $('body, html').animate({ scrollTop: 0 }, speed) });


        // input value check
        $(".ipt-valid").each(function(i) {
            const $srchVal = $(this).find(".ipt-string"),
                $searchDel = $(this).find(".ipt-del");
            $srchVal.keyup(function() {
                $searchDel.toggle(Boolean($(this).val()));
            });
            $searchDel.toggle(Boolean($srchVal.val()));
            $searchDel.click(function() {
                $srchVal.val('').focus();
                $(this).hide();
            });
            $srchVal.focus(function() {
                $searchDel.toggle(Boolean($(this).val()));
            }).focusout(function() {
                setTimeout(() => {
                    !$searchDel.is(":focus") ? $searchDel.hide() : null;
                }, 10);
            });
        });

        $(".ele-set").each(function() {
            let ele = $(this).closest(".ele-set");
            $(this).find(".ipt").on("focus", function() {
                ele.addClass("on");
            }).on("blur", function() {
                ele.removeClass("on");
            })
        });

        $(".ele-set.union").each(function() {
            let ele = $(this).closest(".ele-set");
            $(this).find(".select").on("focus", function() {
                ele.addClass("on");
            }).on("blur", function() {
                ele.removeClass("on");
            })
        });

        // current step
        $(".steper").each(function() {
            if ($(".steper").length) {
                let getCha = $(".steper").text(),
                    getArr = [...getCha];
                getArr.splice(1, 1);
                $(this).attr("aria-label", `총 ${getArr[1]} 단계중에서 ${getArr[0]}단계 진행중`);
                $(this).prev(".head-tit").addClass("step-type");
            }
        })

        /* header alarm .. tetst 0504 */
        if ($(".alarm").hasClass("active")) {
            return $(".alarm").attr("title", "새로운 알림");
        }

    },

    // active class
    addActive: function(tarEle) { $(tarEle).addClass("active") },
    removeActive: function(tarEle) { $(tarEle).removeClass("active") },

    // show/hide
    visibleEle: function(tar) { $("." + tar).show("fast") },
    hiddenEle: function(tar) { $("." + tar).hide("fast") },

    //테스트용
    href : {
        go :function(target){
            location.href=target+".html";
        },
        back:function(){
            history.back();
        }
    },
    //레이어팝업 bg 고정
    fixBody : {
        active: function(){
            let htmlTar = $("html");
            if(!htmlTar.hasClass("full-popup-active")) {
                scrollTopNow = $(window).scrollTop();
                htmlTar.addClass("full-popup-active");
                $("body").css({"margin-top": scrollTopNow * -1});
            }
        },
        disable: function(){
            let chkSize = $(".lyr-popup-wrap:visible").length;
            if( chkSize <= 1){
                $("body").attr("style","");
                $("html").removeClass("full-popup-active").scrollTop(scrollTopNow);
            }
        }
    },

    // accordion [opt. aria-multiselectable:multiple view / data-show:first visible ele.]
    accordion: {
        init: function() {
            let acc = $("[data-role='accordion']"),
                accordion = this;

            $(acc).each(function() {
                let activeNum = $(this).data("show") - 1;
                $(this).find(".toggle-btn")
                    .attr("role", "button")
                    .attr("aria-expanded", "false");
                if ($(this).attr("data-show") === 'null' || $(this).attr("data-show") === '') {
                    return;
                } else {
                    $(this).not(".as-no")
                        .find("> .toggle-items")
                        .eq(activeNum)
                        .addClass("active")
                        .find(".toggle-ele")
                        .css("display", "block")
                        .closest(".toggle-items").find(".toggle-btn")
                        .attr("aria-expanded", "true")
                }
            });

            acc.off("click").on("click", ".toggle-btn", function(e) {
                e.preventDefault();
                accordion.action($(this));
            });
        },
        action: function(ele) {
            let $eleAct;
            if ($(ele).parent().is(".toggle-items")) {
                $eleAct = $(ele).parent(".toggle-items");
            } else {
                $eleAct = $(ele).parent().parent();
            }
            var $eleActParent = $eleAct.closest("[data-role='accordion']");
            if ($eleAct.hasClass("active")) {
                $eleAct.find(".toggle-ele").slideUp(150, function() {
                    $eleAct
                        .removeClass("active")
                        .find(".toggle-btn")
                        .attr("aria-expanded", "false")
                });
            } else {
                if ($eleActParent.attr("aria-multiselectable") === 'true') {
                    $eleActParent.find(".toggle-items").removeClass("active")
                        .find(".toggle-btn")
                        .attr("aria-expanded", "false");
                    $eleActParent.find(".toggle-ele").slideUp(150);
                }
                $eleAct.addClass("active")
                    .find(".toggle-btn")
                    .attr("aria-expanded", "true");

                $eleAct.find(".toggle-ele").slideDown(150);
            }
        }
    },

    alertPop: {
        // alert
        append: function() {
            if ($("[data-id='alert']").length === 0) {
                let appendSelect = '<div class="lyr-popup-wrap" data-id="alert"><!-- alert popup -->' +
                    '<div class="pop-area">' +
                    '<div class="lyr-popup-contents alert">' +
                    '<div class="lyr-pop-sec">' +
                    '<div class="scr focus-st"></div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="lyr-popup-btm">' +
                    '<div class="btn-area">' +
                    '<button type="button" class="btn type-confirm" id="btnConfirmNext">확인</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                $('body').append(appendSelect);
            }
        },

        open: function(ele, unique, msg, _callback1) {
            HWSB.fixBody.active();
            HWSB.alertPop.append();
            popIndex++;
            let uniqueId = $('[data-id=' + unique + ']');

            // msgTxt = function() {
            //     let msg;
            //     return msg = "알럿텍스트...";
            // };
            // (msg) ? $('[data-id="alert"] .lyr-pop-sec .scr').text(msgTxt): null;
            (msg) ? $('[data-id="alert"] .lyr-pop-sec .scr').text(msg): null;
            $(ele).attr("data-focus", unique);
            uniqueId
                .css({ "z-index": popIndex, "display": "flex" })
                .find(".focus-st").attr("tabindex", "0").focus();
            $("[data-role='wrap']").attr("aria-hidden", true);

            uniqueId.append(focusMove);
            $(".pop-loop").on("focus", function() {
                uniqueId.find(".pop-area").attr("tabindex", "0").fadeIn().focus();
            });


            $('#btnConfirmNext').on('click',function(){
                HWSB.alertPop.close('alert');
                if (typeof _callback1 === "function") {
                    _callback1();
                }
            });

        },

        // layer popup close
        close: function(unique) {
            let lyrLength = $(".lyr-popup-wrap:visible"),
                dataEle = $('[data-id=' + unique + ']'),
                focusEle = $('[data-focus=' + unique + ']');
            if (unique) {
                HWSB.fixBody.disable();
                dataEle
                    .fadeOut(speed)
                    .find('a.pop-loop, div.dimmed').fadeOut(speed);
                focusEle.focus().removeAttr("data-focus")
            }
            setTimeOutConst = setTimeout(function() {
                dataEle.remove();
            }, speed);
            $("[data-role='wrap']").removeAttr("aria-hidden");
            popIndex--;
        }
    },

    confirmPop: {
        open: function(ele, unique, msg) {
            HWSB.fixBody.active();
            popIndex++;
            let uniqueId = $('[data-id=' + unique + ']');
            (msg) ? $('[data-id="alert"] .lyr-pop-sec .scr').text(msg): null;

            $(ele).attr("data-focus", unique);
            uniqueId
                .css({ "z-index": popIndex, "display": "flex" })
                .find(".focus-st").attr("tabindex", "0").focus();
            $("[data-role='wrap']").attr("aria-hidden", true);

            uniqueId.append(focusMove);
            $(".pop-loop").on("focus", function() {
                uniqueId.find(".pop-area").attr("tabindex", "0").fadeIn().focus();
            });
        },

        // layer popup close
        close: function(unique) {
            let lyrLength = $(".lyr-popup-wrap:visible"),
                dataEle = $('[data-id=' + unique + ']'),
                focusEle = $('[data-focus=' + unique + ']');
            if (unique) {
                HWSB.fixBody.disable();
                dataEle
                    .fadeOut(speed)
                    .find('a.pop-loop, div.dimmed').fadeOut(speed);
                focusEle.focus().removeAttr("data-focus")
            }
            $('body').css({ 'overflow': '', 'height': '' });
            $("[data-role='wrap']").removeAttr("aria-hidden");
            popIndex--;
        }
    },

    select: {
        append: function() {
            if ($("[data-id='select']").length < 1) {
                let appendSelect = '<div class="lyr-popup-wrap type-sheet" data-id="select">' +
                    '<div class="pop-area">' +
                    '<div class="lyr-popup-title">' +
                    '<strong class="pop-tit"></strong>' +
                    '</div>' +
                    '<div class="lyr-popup-contents">' +
                    '<div class="lyr-pop-sec">' +
                    '<div class="select-clone"></div>' +
                    '</div>' +
                    '</div>' +
                    '<button class="btn-lyr-close" onclick="HWSB.modalLayer.close(\'select\');">닫기</button>' +
                    '</div>' +
                    '</div>';
                $('body').append(appendSelect);
            }
        },
        open: function() {
            $(".select-set").each(function() {
                let tar = $(this).find(".select"),
                    tarOpt = $(this).find(".select-list > li"),
                    tarOptActive = $(this).find("li.active"),
                    tarDisabled = tar.closest(".ele-wrap");
                $(".select-list").attr("role", "listbox");
                tar.attr({
                    "role": "listbox",
                    "tabindex": "0"
                });
                tarOpt.attr({
                    "role": "option",
                    "aria-selected": "false"
                });
                if (tarOpt.hasClass("active")) {
                    tar.html(tarOptActive.html());
                    tarOptActive.attr("aria-selected", "true");
                }

                tar.off().on("click keypress", function() {
                    if (tarDisabled.data('state') !== "disabled") {
                        HWSB.select.append();
                        let indiSel = $(this),
                            titClone = indiSel.attr("title"),
                            listClone = indiSel.closest(".select-set").find(".select-list").clone();
                        $(listClone).appendTo("[data-id='select'] .select-clone");
                        $("[data-id='select']").find(".pop-tit").text(titClone);
                        setTimeout(() => {
                            HWSB.modalLayer.open(indiSel, 'select', 'sheet');
                        }, 0);

                    }
                });

                $(this).find(".select-list .select-ele").each(function() {
                    if ($(this).hasClass("active")){
                        //console.log($(this).hasClass("active"));
                        $(this).closest(".select-set").find(".select-indi").addClass("select-choice");
                    }
                });
            });

        }
    },

    // modal layer
    modalLayer: {
        open: function(ele, unique, type, flag) {
            popIndex++; // z-index increase
            let uniqueId = $('[data-id=' + unique + ']'),
                checkState;

            // branch in flag state
            flag == "false" ? checkState = ele.is(":checked") : checkState = "false";
            if (!checkState) { return false }

            HWSB.fixBody.active();
            $(ele).attr("data-focus", unique);
            uniqueId
                .css({ "z-index": popIndex, "display": "flex" });
            (uniqueId.find(".pop-tit").length) ?
                uniqueId.find(".pop-tit").attr("tabindex", "0").focus(): uniqueId.find(".focus-st").attr("tabindex", "0").focus();

            $("[data-role='wrap']").attr("aria-hidden", true);
            uniqueId.append(focusMove);
            $(".pop-loop").on("focus", function() {
                uniqueId.find(".pop-area").attr("tabindex", "0").fadeIn().focus();
            });
            (type == "sheet") ? uniqueId.addClass("bottom"): null;

            let valueCopy = $('[data-focus=' + unique + ']')
            let closePro = function() {
                valueCopy.removeAttr("data-focus").focus();
                HWSB.modalLayer.close();
            }

            // [test:0503] select clone click
            $('[data-id="select"]').off().on("click", ".lyr-pop-sec .select-ele", function(e) {
                e.preventDefault();
                let thisValue = $(this).html();
                (thisValue) ? valueCopy.empty().append(thisValue).addClass("select-choice") : null;
                let popIndi = $(this),
                    thisDataSet = popIndi.data(),
                    cloneIdx = popIndi.index(),
                    focusSelect = $("[data-focus='select']"),
                    ListItem = focusSelect.closest(".select-set").find(".select-list .select-ele");

                ListItem
                    .removeClass("active").attr("aria-selected", "false")
                    .eq(cloneIdx).addClass("active").attr("aria-selected", "true");
                focusSelect
                    .empty().append(thisValue)
                    .attr(thisDataSet)
                    .attr("aria-label", $(this).text());

                setTimeout(() => {
                    $(".select-clone .select-list").remove();
                }, speed);
                HWSB.modalLayer.close('select');
            });
        },

        // layer popup close
        close: function(unique) {
            let lyrLength = $(".lyr-popup-wrap:visible");
            let dataEle = $('[data-id=' + unique + ']');
            if (unique) {
                if (dataEle.hasClass("type-sheet")) {
                    //console.log("2");
                    dataEle
                        .removeClass("bottom")
                        .find('a.pop-loop, div.dimmed').remove();
                    setTimeout(() => {
                        dataEle.css("display", "none");
                        ($(".select-clone .select-list")) ? $(".select-clone .select-list").remove(): null;
                    }, speed);
                } else {
                    //console.log("3");
                    dataEle
                        .css("display", "none")
                        .find('a.pop-loop, div.dimmed').remove();
                }
                $("[data-focus=" + unique + "]").focus()
                    .removeAttr("data-focus")
            } else {
                //console.log("4");

                $(".lyr-popup-wrap")
                    .removeClass("bottom")
                    .find('a.pop-loop, div.dimmed').remove();
                setTimeout(() => {
                    $(".lyr-popup-wrap").css("display", "none");
                }, 500);

                setTimeout(() => {
                    $(".lyr-popup-wrap")
                        .css("display", "none")
                }, speed);
                HWSB.fixBody.disable();
                $("[data-role='wrap']").removeAttr("aria-hidden");

            }
            if (lyrLength.length == 1) {
                HWSB.fixBody.disable();
                $("[data-role='wrap']").removeAttr("aria-hidden");
            }
            popIndex--; // z-index decrease;
        }
    },
    //layerFull-popup
    layerFull: {
        open: function(ele,unique) {
            HWSB.fixBody.active();
            $(ele).attr("data-focus", unique);
            let uniqueId = $('[data-id=' + unique + ']');
            uniqueId.addClass("active").css({"z-index":++popIndex});
        },
        close: function(unique) {
            let uniqueId = $('[data-id=' + unique + ']'),
                focusEle = $('[data-focus=' + unique + ']');
            uniqueId.removeClass("active").attr("style","");
            HWSB.fixBody.disable();
            focusEle.focus().removeAttr("data-focus")
            popIndex--;
        }
    },

    onlyDimmed: {
        open: function() { //
            (!$(".only-dimmed").length) ?
                $("body")
                    .append('<div class="only-dimmed"></div>'):
                //console.log("already open");
                HWSB.fixBody.active();
        },
        close: function() {
            $(".only-dimmed").remove();
            HWSB.fixBody.disable();
        }
    },


    // loading...
    loading: {
        open: function(msg) {
            if (!$(".only-dimmed").length) {
                HWSB.onlyDimmed.open();
                let innerNode = '<div class="loader-wrap">';
                innerNode += '	<div class="loader" id="loadingAni"></div>';
                innerNode += '	<p class="load-msg">';
                innerNode += msg;
                innerNode += '	</p>';
                innerNode += '	</div>';
                innerNode += '	</div>';
                $("body .only-dimmed").append(innerNode);
                $("#loadingAni").appendTo(".loader-wrap");
                if (!msg || msg == "undefined") { $(".load-msg").text("") };
                $("body").css({ 'overflow': 'hidden', 'height': '100%' });
            } else {
                //console.log("already open");
            }
        },
        close: function() {
            HWSB.onlyDimmed.close();
        }
    },
    toast: function(tar,msg) {
        let html = '<div class="toast-pop"><span>' + msg + '</span></div>';
        $("body").append(html).focus();
        setTimeout(function(){
            $(".toast-pop").fadeOut(function(){
                $(".toast-pop").remove();
                $(tar).focus();
            })
        },1000);
    },
    activeScroll:function(tarTop){
        let activeHeight = $(tarTop).height() - 200;
        let event01 = activeHeight;
        let event02 = event01 + $(".visual-item.-type01").outerHeight();
        let event03 = event02 + $(".visual-item.-type02").outerHeight(); // 👋2022.10.13 *1.5 삭제
        let event04 = event03 + $(".visual-item.-type03").outerHeight();
        $(window).scroll(function(){
            let scrollTar = $(this).scrollTop();
            if(event01 <= scrollTar) {
                $(".visual-item.-type01").addClass("-active");
            }
            if(event02 <= scrollTar) {
                $(".visual-item.-type02").addClass("-active");
            }
            if(event03 <= scrollTar) {
                $(".visual-item.-type03").addClass("-active");
            }
            if(event04 <= scrollTar) {
                $(".visual-item.-type04").addClass("-active");
            }
        });
    },
}


if (document.readyState !== 'loading') {
    ready();
} else {
    document.addEventListener('DOMContentLoaded', ready);
}

function ready() {
    HWSB.init();

    // anchor move
    $('a[href="#"]').not(".able-anchor").click(function(e) { e.preventDefault(); });
    $(".a11y-hide-voice").attr("aria-hidden", "true");
    let nowYear = new Date();// 👋2022.10.14 날짜
    let setYear = nowYear.getFullYear() - 52;// 👋2022.10.14 날짜
    if (!$('.datepicker').length == 0) {
        $.datepicker.setDefaults({
            buttonImage: "data:image/svg+xml,%0A%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cmask id='path-1-inside-1_263_980' fill='white'%3E%3Cpath d='M2 5C2 4.44772 2.44772 4 3 4H17C17.5523 4 18 4.44772 18 5V17C18 17.5523 17.5523 18 17 18H3C2.44772 18 2 17.5523 2 17V5Z'/%3E%3C/mask%3E%3Cpath d='M2 5C2 4.44772 2.44772 4 3 4H17C17.5523 4 18 4.44772 18 5V17C18 17.5523 17.5523 18 17 18H3C2.44772 18 2 17.5523 2 17V5Z' stroke='%23020C22' stroke-width='3' mask='url(%23path-1-inside-1_263_980)'/%3E%3Cpath d='M6 3V4.5' stroke='%23020C22' stroke-width='1.5' stroke-linecap='square'/%3E%3Cpath d='M14 3V4.5' stroke='%23020C22' stroke-width='1.5' stroke-linecap='square'/%3E%3Crect x='6' y='8' width='1.5' height='1.5' fill='%23020C22'/%3E%3Crect x='9.25' y='8' width='1.5' height='1.5' fill='%23020C22'/%3E%3Crect x='9.25' y='11' width='1.5' height='1.5' fill='%23020C22'/%3E%3Crect x='12.5' y='8' width='1.5' height='1.5' fill='%23020C22'/%3E%3Crect x='6' y='11' width='1.5' height='1.5' fill='%23020C22'/%3E%3C/svg%3E%0A",
            buttonImageOnly: false,
            showOn: 'button',
            showButtonPanel: false,
            closeText: '확인',
            prevText: '이전 달',
            nextText: '다음 달',
            yearRange:setYear+":", // 👋2022.10.14 날짜
            showOtherMonths: 'true', //빈 공간에 현재월의 앞뒤월의 날짜를 표시
            showMonthAfterYear: 'true', //년도 먼저 나오고, 뒤에 월 표시
            changeYear: true, //콤보박스에서 년 선택 가능
            changeMonth: true, //콤보박스에서 월 선택 가능
            monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], //달력의 월 부분 텍스트
            monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], //달력의 월 부분 Tooltip 텍스트
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'], //달력의 요일 부분 텍스트
            dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'], //달력의 요일 부분 Tooltip 텍스트
            dateFormat: "yy.mm.dd",
            currentText: "오늘",
            weekHeader: "주",
            hideIfNoPrevNext: 'false',
            ignoreReadonly: 'false',
            autoclose: 'false',
            yearSuffix: '년'
        });

        $('.datepicker').datepicker({
            onSelect: function(){
                if ($(".datepicker").hasClass("day-only")){
                    let currentDate = $(".datepicker").val(),
                        getDate = currentDate.split("."),
                        setDay = '매월 ' + getDate[2] + '일'
                    $(".day-only").val(setDay);
                }
            },
            onClose: function() {
                HWSB.modalLayer.close('datepicker');
            },
        });

        $(document).on("click", ".close-datepicker", function(e) {
            e.preventDefault();
            $.datepicker._hideDatepicker();
        })
        $('.ui-datepicker-trigger').on('click', function() {
            let calPop = $('#ui-datepicker-div'),
                calHead = $('.ui-datepicker-title'),
                yearSelect = $('.ui-datepicker-year'),
                monthSelect = $('.ui-datepicker-month'),
                todayYear = $('.ui-datepicker-current-day').data('year'),
                todayMonth = $('.ui-datepicker-current-day').data('month') + 1,
                todayDay = $('.ui-datepicker-current-day a').data('date'),
                leftBtn = $('.ui-datepicker-prev'),
                rightBtn = $('.ui-datepicker-next');

            HWSB.modalLayer.open($(this), 'datepicker', 'sheet', '');
            $(calPop).appendTo('[data-id="datepicker"] .lyr-pop-sec').css({ 'position': 'relative', 'top': 'initial', 'left': 'initial' });
            $(calHead).attr('role', 'navigation');
            $(leftBtn).attr({ 'role': 'button', 'tabindex': '0' });
            $(rightBtn).attr({ 'role': 'button', 'tabindex': '0' });
            $(yearSelect).attr('aria-label', '연도선택');
            $(monthSelect).attr('aria-label', '월선택');
            $('.ui-datepicker-current-day a').attr('aria-label', todayYear + '년' + todayMonth + '월' + todayDay + '일');
        });
    };

    $('.datepicker').each(function(){
        let that = $(this).closest(".ele-wrap"),
            thatFind = ".ui-datepicker-trigger";
        if (that.data('state') == "disabled") {
            that.find(thatFind).attr("disabled", "true");
        } else {
            that.find(thatFind).removeAttr("disabled");
        }
    });
    // 👋2022.10.27 andorid input 키보드
    if(/Android/i.test(navigator.userAgent)){
        $("input").on("focusin",function(){
            var tarH = $(this).offset().top - 90; //높이여백 수치값 변경
            $("html,body").stop().animate({scrollTop:tarH},500);
        });
    }
    // //👋2022.10.27 andorid input 키보드 적용
}

function auto_height(elem) {
    elem.style.height = "1px";
    elem.style.height = (elem.scrollHeight) + "px";
    //console.log(elem.scrollHeight);
    var chkVal = $(elem).val();
    if(!chkVal==""){
        $(elem).closest(".ele-set").removeClass("search");
    }
}

$(".toggle-btn .btn").on("click", function() {
    $(this).parent().next('.card-box').slideDown(200);
})

$(".calc-wrap .chk input[type='radio']").on("change", function(){
    if ($(this).is(":checked")){
        $('.card-box').slideUp(200);
    }
})

//텝 버튼 접근성
const tabGroups = document.querySelectorAll('[data-role="tab"]');
if(tabGroups){
    let currentTarget, targetTabWrap,targetTabListWrap,targetPanelWrap;
    //이벤트 타겟 변수 설정
    const init = (e) => {
        currentTarget = e.target.tagName;
        currentTarget === 'BUTTON' || 'A' ? (currentTarget = e.target) : (currentTarget = e.target.closest('button') || e.target.closest('a'));
        targetTabWrap = currentTarget.closest('[data-role="tab"]');
        targetTabListWrap = targetTabWrap.querySelector('[role="tablist"]');
        targetPanelWrap = targetTabWrap.querySelector('.wrap-tab-contents');
    }
    //클릭 이벤트
    const tabClickEvt = (e) => {
        init(e);
        if(currentTarget.ariaSelected === 'false') {
            tabRemoveEvt(targetTabListWrap,targetPanelWrap);
            tabAddEvt(currentTarget,targetTabWrap);
        }
    };
    //키보드 접근이벤트
    const tabKeyUpEvt = (e) => {
        init(e);
        const targetBtnWrap = currentTarget.parentElement;
        // -> 화살표키 눌렀을때
        if(e.key == 'ArrowRight') {
            if(targetBtnWrap.nextElementSibling) {
                targetBtnWrap.nextElementSibling.children[0].focus();
                tabRemoveEvt(targetTabListWrap,targetPanelWrap);
                tabAddEvt(targetBtnWrap.nextElementSibling.children[0],targetTabWrap);
            }else homeKeyEvt(targetTabListWrap,targetTabWrap,targetPanelWrap);

        }
        // <- 화살표
        else if(e.key == 'ArrowLeft') {
            if(targetBtnWrap.previousElementSibling) {
                targetBtnWrap.previousElementSibling.children[0].focus();
                tabRemoveEvt(targetTabListWrap,targetPanelWrap);
                tabAddEvt(targetBtnWrap.previousElementSibling.children[0],targetTabWrap);
            }else endKeyEvt(targetTabListWrap,targetTabWrap,targetPanelWrap);
        }
        // end 키
        else if(e.key == "End") {
            endKeyEvt(targetTabListWrap,targetTabWrap,targetPanelWrap);
        }
        // home 키
        else if(e.key == "Home"){
            homeKeyEvt(targetTabListWrap,targetTabWrap,targetPanelWrap);
        }
    }
    //키보드 home
    const homeKeyEvt = (targetTabListWrap,targetTabWrap,targetPanelWrap) => {
        targetTabListWrap.children[0].children[0].focus();
        tabRemoveEvt(targetTabListWrap, targetPanelWrap);
        tabAddEvt(targetTabListWrap.children[0].children[0], targetTabWrap);
    }

    //키보드 end
    const endKeyEvt= (targetTabListWrap,targetTabWrap,targetPanelWrap) => {
        const targetTabLists = targetTabListWrap.querySelectorAll('li');
        targetTabLists[targetTabLists.length - 1].children[0].focus();
        tabRemoveEvt(targetTabListWrap, targetPanelWrap);
        tabAddEvt(targetTabLists[targetTabLists.length - 1].children[0], targetTabWrap);
    }

    //텝 active 이벤트
    const tabAddEvt = (currentTarget,targetPanelWrap) => {
        //선택된 탭 속성 true 활성
        currentTarget.setAttribute('aria-selected','true');
        currentTarget.removeAttribute('tabindex');
        currentTarget.parentElement.classList.add('active');
        //연결된 tablpanel 숨김해제
        targetPanelWrap.querySelector(`[aria-labelledby="${currentTarget.id}"]`).removeAttribute('hidden');
        targetPanelWrap.querySelector(`[aria-labelledby="${currentTarget.id}"]`).setAttribute('tabindex','0');
    }

    //탭 active 삭제
    const tabRemoveEvt = (tabListWrap,tabPanelWrap) => {
        targetTabListWrap.querySelectorAll('li').forEach((tabBtnWrap) => {
            //기존에 선택 된 탭 속성 false 로 변경
            if(tabBtnWrap.classList.contains('active')){
                tabBtnWrap.classList.remove("active");
                tabBtnWrap.querySelector('[role="tab"]').setAttribute('aria-selected','false');
                tabBtnWrap.querySelector('[role="tab"]').setAttribute('tabindex','-1');
            }
        });
        //기존에 선택 된 tabpanel 숨김
        for (let tabPanel of targetPanelWrap.children){
            tabPanel.setAttribute('hidden','false');
            tabPanel.setAttribute('tabindex','-1');
        }
    };
    //클릭/키보드 탭 이벤트 제거/할당
    tabGroups.forEach((tabWrapper) => {
        const tabBtns = tabWrapper.querySelectorAll('[role="tab"]');
        tabBtns.forEach((tabBtn) => {
            tabBtn.removeEventListener('click',tabClickEvt);
            tabBtn.addEventListener('click',tabClickEvt);
            tabBtn.removeEventListener('keyup',tabKeyUpEvt);
            tabBtn.addEventListener('keyup',tabKeyUpEvt);
        });
    });
};

//상단 노치 및 url 높이값
function setScreenSize(){
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh",`${vh}px`);
}
setScreenSize();
window.addEventListener('resize',()=> setScreenSize());
$(function() {
    // 2022.12.02 : ui.js 호출 스크립트
    setScreenSize();
});
