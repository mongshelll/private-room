/*
.scrollTop() : 스크롤바의 수직위치

.offset().top : 선택한 요소의 문서 끝부터의 세로 위치값

*/

var pos0 = $("#header").offset().top; //0
var pos1 = $("#news").offset().top;
var pos2 = $("#brand").offset().top;
var pos3 = $("#crew").offset().top;

$(window).on("scroll", function () {
	var scroll = $(this).scrollTop();

	$("#navi li a").removeClass("on");
	if (scroll >= pos0 && scroll < pos1) {
		$("#navi li").eq(0).children("a").addClass("on");
	}
	if (scroll >= pos1 && scroll < pos2) {
		$("#navi li").eq(1).children("a").addClass("on");
	}
	if (scroll >= pos2 && scroll < pos3) {
		$("#navi li").eq(2).children("a").addClass("on");
	}
	if (scroll >= pos3) {
		$("#navi li").eq(3).children("a").addClass("on");
	}
});


$("#navi li a").on("click", function (e) {
	e.preventDefault();

	var target = $(this).attr("href");
	var targetPos = $(target).offset().top;
	$("html, body").animate({
		scrollTop: targetPos
	}, 1000);
});