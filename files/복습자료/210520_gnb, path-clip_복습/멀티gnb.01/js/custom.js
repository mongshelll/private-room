var $header = $("#header");
var $gnb = $("#gnb");
var $gnb_li = $gnb.children("li");
var $gnb_ul = $gnb_li.children("ul")
var $skip_a = $("#skipNavi a");
var speed = 500;


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

$header.on("mouseenter focusin", function(){
	openSub();
});

$header.on("mouseleave focusout", function(){
	closeSub();
});

$gnb_li.on("mouseenter", function(){
	$(this).children("a").addClass("on");
});

$gnb_li.on("mouseleave", function(){
	$(this).children("a").removeClass("on");
});

function openSub(){
	var ht = $header.outerHeight();
	var bg = $gnb_ul.find("a").css("background-color");

	$header.prepend(
		$("<div class='bgGnb'>")
		.css({
			width: "100%",
			height: getMax(),
			position: "absolute",
			top: ht,
			left: 0,
			backgroundColor: bg,
			display: "none"
		})
	);
	$gnb_ul.stop().slideDown(speed);
	$(".bgGnb").stop().slideDown(speed);
}

function closeSub(){
	$gnb_ul.stop().slideUp(speed / 2);
	$(".bgGnb").stop().slideUp(speed / 2, function(){
		$(this).remove();
	});
}

function getMax(){
	var ht_max = 0;

	$gnb_li.each(function(){
		var ht = $(this).children("ul").outerHeight();
		ht_max = Math.max(ht_max, ht);
	});
	return ht_max;
}