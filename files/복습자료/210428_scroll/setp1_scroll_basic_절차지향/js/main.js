var pos0 = $("#box1").offset().top;
var pos1 = $("#box2").offset().top;
var pos2 = $("#box3").offset().top;
var pos3 = $("#box4").offset().top;


$(window).on("scroll", function(){
	var scroll = $(this).scrollTop(); //내가 스크롤 한 거리
	$("#navi li a").removeClass("on");

	if(scroll >= pos0 && scroll < pos1){
		$("#navi li").eq(0).children("a").addClass("on");
	}
	if(scroll >= pos1 && scroll < pos2){
		$("#navi li").eq(1).children("a").addClass("on");
	}
	if(scroll >= pos2 && scroll < pos3){
		$("#navi li").eq(2).children("a").addClass("on");
	}
	if(scroll >= pos3){
		$("#navi li").eq(3).children("a").addClass("on");
	}
});


$("#navi li a").on("click", function(e){
	e.preventDefault();
	var target = $(this).attr("href");
	var targetPos = $(target).offset().top;
	$("html, body").animate({
		scrollTop: targetPos
	}, 500);
});
