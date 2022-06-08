/*
.scrollTop() : 스크롤바의 수직위치

.offset().top : 선택한 요소의 문서 끝부터의 세로 위치값

*/

var pos0 = $("#header").offset().top; //0
var pos1 = $("#news").offset().top;
var pos2 = $("#brand").offset().top;
var pos3 = $("#crew").offset().top;
var $btns = $("#navi li");
var $boxs = $(".myScroll");
var posArr = [];
var len = $btns.length;

setPos();

$(window).on("scroll", function () {
	var scroll = $(this).scrollTop();
	activateBtn(scroll);
});

$btns.children("a").on("click", function (e) {
	e.preventDefault();
	moveScroll(this);
});



function setPos() {
	for (var i = 0; i < len; i++) {
		posArr.push($boxs.eq(i).offset().top);
	}
}
console.log(posArr);

function activateBtn(scroll) {
	for (var i = 0; i < len; i++) {
		if (scroll >= posArr[i]) {
			$btns.children("a").removeClass("on");
			$btns.eq(i).children("a").addClass("on");
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