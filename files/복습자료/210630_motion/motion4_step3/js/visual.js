console.log("start");
const navi_li = $(".navi li");
const article = $("section article");
const speed = 1000;

navi_li.on("click", (e) => {

	let i = $(e.currentTarget).index();
	activation(i)
});

function activation(index){
	article.css({zIndex: 1});
	article.eq(index).css({zIndex: 2}).stop().animate({
		left: "0%"
	}, speed, function () {
		$(this).addClass("on");
	});
}