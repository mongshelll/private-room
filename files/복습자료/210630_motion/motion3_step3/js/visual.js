const panel = $("#panel ul");
const prev = $(".btnPrev");
const next = $(".btnNext");

const txt = $("#txt ul");
const speed = 1000;

next.on("click", e => {
	e.preventDefault();

	panel.find("li").eq(1).find("video").get(0).pause();
	panel.find("li").removeClass("on");

	panel.stop().animate({
		marginLeft: "-200%"
	}, speed, () => {
		panel.find("li").first().appendTo(panel);
		panel.css({
			marginLeft: "-100%"
		});
		panel.find("li").eq(1).addClass("on");
		panel.find("li").eq(1).find("video").get(0).play();
	});

	txt.stop().animate({
		top: "-200%"
	}, speed, () => {
		txt.find("li").first().appendTo(txt);
		txt.css({
			top: "-100%"
		});
		txt.find("li").eq(1).addClass("on");
	});


});


prev.on("click", e => {
	e.preventDefault();

	panel.find("li").eq(1).find("video").get(0).pause();
	panel.find("li").removeClass("on");

	panel.stop().animate({
		marginLeft: "0%"
	}, speed, () => {
		panel.find("li").last().prependTo(panel);
		panel.css({
			marginLeft: "-100%"
		});
		panel.find("li").eq(1).addClass("on");
		panel.find("li").eq(1).find("video").get(0).play();
	});

	txt.stop().animate({
		top: "0%"
	}, speed, () => {
		txt.find("li").last().prependTo(txt);
		txt.css({
			top: "-100%"
		});
		txt.find("li").eq(1).addClass("on");
	});
});