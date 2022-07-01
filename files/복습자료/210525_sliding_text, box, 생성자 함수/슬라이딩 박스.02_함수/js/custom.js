var bgColor = $(".tit1").css("color");

sliding(".tit1", 700);
sliding(".tit2", 900);
sliding(".tit3", 1200);
sliding(".tit4", 1500);

function sliding(selector, speed){
	$(selector).append(
		$("<div class='mask'>").css({
			width: "100%",
			height: "100%",
			backgroundColor: bgColor,
			position: "absolute",
			top: 0,
			left: "-100%"
		})
	);

	$(selector).find(".mask").stop().delay(500).animate({
		left: 0
	}, speed, "easeInExpo", function(){
		$(this).prev().css({
			opacity: 1
		});
		$(this).stop().animate({
			left: "100%"
		}, speed, "easeInExpo", function(){
			$(this).remove();
		});
	});
}