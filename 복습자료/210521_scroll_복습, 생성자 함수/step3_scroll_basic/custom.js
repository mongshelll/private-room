/*
.scrollTop() : 스크롤바의 수직위치

.offset().top : 선택한 요소의 문서 끝부터의 세로 위치값

*/

var $btns = $("#navi li");
var $boxs = $(".myScroll");
var posArr = [];
var len = $btns.length;
var baseLine = -300;

//처음 로딩시 해당박스의 세로 위치값을 구하는 함수 호출
setPos();

$(window).on("resize", setPos);


//스크롤시 해당버튼 활성화
$(window).on("scroll", function () {
	var scroll = $(this).scrollTop();
	activateBtn(scroll);
});

//버튼 클릭시 해당박스 위치로 자동으로 이동해주는 함수 호출
$btns.children("a").on("click", function (e) {
	e.preventDefault();
	moveScroll(this);
});


function setPos() {
	posArr = [];
	for (var i = 0; i < len; i++) {
		posArr.push($boxs.eq(i).offset().top);
	}
	console.log(posArr);
}

function activateBtn(scroll) {
	for (var i = 0; i < len; i++) {
		if (scroll >= posArr[i] + baseLine) {
			$btns.children("a").removeClass("on");
			$btns.eq(i).children("a").addClass("on");
			$boxs.removeClass("on");
			$boxs.eq(i).addClass("on");
		}
	}
}

function moveScroll(el) {
	var target = $(el).attr("href");
	var targetPos = $(target).offset().top;
	$("html, body").animate({
		scrollTop: targetPos
	}, 1000);
}