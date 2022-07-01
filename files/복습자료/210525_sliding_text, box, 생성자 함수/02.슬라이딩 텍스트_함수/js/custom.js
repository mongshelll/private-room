slidingTxt(".txt1", 700, 0);
slidingTxt(".txt2", 700, 700);

function slidingTxt(el, speed, delay){
	var ease = "easeInExpo";
	var bgColor = $(el).children("span").css("color");

	$(el)
	.append(
		$("<em class='mask'>").css({
			display: "block",
			width: "100%",
			height: "100%",
			backgroundColor: bgColor,
			position: "absolute",
			top: 0,
			left: "-100%"
		})
	);

	$(el).find(".mask").stop().delay(delay).animate({
		left: 0
	}, speed, ease, function(){
		$(this).prev("span").css({
			opacity: 1
		});
		$(this).stop().animate({
			left: "100%"
		}, speed, ease, function(){
			$(this).remove();
		});
	});
}