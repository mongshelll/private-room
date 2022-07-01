const panel = $("#panel ul");
const prev = $(".btnPrev");
const next = $(".btnNext");
const speed = 1000;

next.on("click", e => {
	e.preventDefault();

	panel.find("li").eq(1).find("video").get(0).pause();
	panel.find("li").removeClass("on");

	panel.stop().animate({marginLeft: "-200%"}, speed, () => {
		panel.find("li").first().appendTo(panel);
		panel.css({marginLeft: "-100%"});
		panel.find("li").eq(1).addClass("on");
		panel.find("li").eq(1).find("video").get(0).play();
	});

});

prev.on("click", e => {
	e.preventDefault();

	panel.find("li").eq(1).find("video").get(0).pause();
	panel.find("li").removeClass("on");

	panel.stop().animate({marginLeft: 0}, speed, () => {
		panel.find("li").last().prependTo(panel);
		panel.css({marginLeft: "-100%"});
		panel.find("li").eq(1).find("video").get(0).play();
	});
});