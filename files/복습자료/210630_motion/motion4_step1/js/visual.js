const navi_li = $(".navi li");
const article = $("section article")
const speed = 1000;


navi_li.on("click", e =>{
	article.stop().animate({
		left: 0
	}, speed)
});
