var $header = $("#header");
var $gnb = $("#gnb");
var $gnb_li = $gnb.children("li");
var $gnb_ul = $gnb_li.children("ul")
var $skip_a = $("#skipNavi a");

$skip_a.on("focusin", function(){
	$(this).css({
		top: 0
	});
});

$skip_a.on("focusout", function(){
	$(this).css({
		top: -30
	});
});

$header.on("mouseenter", function(){
	openSub();
});

$header.on("mouseleave", function(){
	closeSub();
});

$gnb_li.on("mouseenter", function(){
	$(this).children("a").addClass("on");
});

$gnb_li.on("mouseleave", function(){
	$(this).children("a").removeClass("on");
});

function openSub(){
	$gnb_ul.stop().slideDown();
	$(".bgGnb").stop().slideDown();
}
function closeSub(){
	$gnb_ul.stop().slideUp();
	$(".bgGnb").stop().slideUp();
}