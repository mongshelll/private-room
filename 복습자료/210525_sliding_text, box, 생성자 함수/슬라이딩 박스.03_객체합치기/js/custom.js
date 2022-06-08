sliding({
	selector: ".tit1",
	speed: 600,
	delay: 0
});
sliding({
	selector: ".tit2",
	speed: 600,
	delay: 300
});
sliding({
	selector: ".tit3",
	speed: 600,
	delay: 600
});
sliding({
	selector: ".tit4",
	speed: 600,
	delay: 900
});

function sliding(options){

	var defaults = {
		selector: ".txt",
		speed: 500,
		delay: 500
	}

	var options = $.extend({}, defaults, options);
	var bgColor = $(options.selector).children("span").css("color");

	$(options.selector).append(
		$("<div class='mask'>").css({
			width: "100%",
			height: "100%",
			backgroundColor: bgColor,
			position: "absolute",
			top: 0,
			left: "-100%"
		})
	);

	$(options.selector).find(".mask").stop().delay(options.delay).animate({
		left: 0
	}, options.speed, "easeInExpo", function(){
		$(this).prev().css({
			opacity: 1
		});
		$(this).stop().animate({
			left: "100%"
		}, options.speed, "easeInExpo", function(){
			$(this).remove();
		});
	});
}