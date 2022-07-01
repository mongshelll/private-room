var isAnimated = true;
var delay = convertSpeed(".inner");

$("ul li").on("click", function(){

	if(isAnimated){

		isAnimated = false;
		var i = $(this).index();

		$("li").removeClass("on");
		$("li").eq(i).addClass("on");

		$("article.upper").removeClass("upper").addClass("lower");
		$("article").eq(i).addClass("upper");

		setTimeout(function(){
			$("article.lower").removeClass("lower");
			isAnimated = true;
		}, delay);
	}
});

function convertSpeed(selector){
	var dur = $(selector).css('transition-duration');

	dur = dur.split("s")[0];
	// dur = dur * 1000;
	dur = parseFloat(dur) * 1000;
	// console.log(dur);
	return dur;
}

setInterval(showTime, 1000);

function showTime(){
	var today = new Date();
	// console.log(today);
	$(".inner p").text(today);
}

$(".inner")
.append(
	$("<p>").css({
		position:"absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		font: "bold 20px/1 'arial'"
	})
);