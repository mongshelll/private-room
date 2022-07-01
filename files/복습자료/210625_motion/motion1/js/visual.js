$("figure .list .pic").on("click", function(){
	var bg = $(this).attr("data-color");
	var imgSrc = $(this).find("img").attr("src");

	$(".bg").css({
		backgroundImage: "url("+imgSrc+")"
	});
	$(".mask").css({
		backgroundColor: bg
	});

	$(".list").addClass("on");
	$(".menu").addClass("on");
	$(".mask").addClass("on");

	setTimeout(function(){
		$(".bg").show();
	}, 300);
});

$("figure .menu").on("click", function(e){
	e.preventDefault();

	var isOn = $(this).hasClass("on");

	if(isOn) {
		$(".list").removeClass("on");
		$(".menu").removeClass("on");
		$(".mask").removeClass("on");
	}

	setTimeout(function(){
		$(".bg").hide();
	}, 300);
});