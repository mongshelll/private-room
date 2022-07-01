const section = $("section");
const navi_li = $(".navi li");

navi_li.on("click", e => {
	e.preventDefault();

	let active = $(e.currentTarget).index() + 1;

	section.removeClass();
	section.addClass("on" + active);

	navi_li.removeClass("on");
	navi_li.eq(active - 1).addClass("on");
});