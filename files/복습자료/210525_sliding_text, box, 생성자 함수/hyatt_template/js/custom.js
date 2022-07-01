$(".navi").mCustomScrollbar({
	theme: "minimal",
	scrollButtons :{
		enable: true
	},
	autoHideScrollbar: true,
	setLeft: "0px"
});

$(".navi li a").on("click", function(e){
	e.preventDefault();

	var imgSrc = $(this).attr("href");
	var tit = $(this).children("img").attr("alt");
	var dec = $(this).children("img").attr("title");
	var num = $(this).parent("li").index() +1;
	var len = $(".navi li").length;

	$(".txtBox h2").text(tit);
	$(".txtBox p").text(dec);
	$(".txtBox em").text(len);
	$(".txtBox strong").text(num);

	$(".bg").before("<div class='bg'>");
	$(".bg:first").css({
		backgroundImage: "url("+ imgSrc +")"
	});
	$(".bg:last").stop().fadeOut("slow", function(){
		$(this).remove();
	});
});

$(".navi").on("mouseenter", function(){
	$(".txtBox").stop().animate({
		width: "50%",
		opacity: 1
	})
});

$(".navi").on("mouseleave", function(){
	$(".txtBox").stop().animate({
		width: "40%",
		opacity: 0.8
	})
});