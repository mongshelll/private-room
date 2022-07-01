var $frame = $("#tab1");
var $btns = $frame.find("ul>li");
var $boxs = $frame.find(".group>div");

$btns.on("click", function (e) {
	e.preventDefault();

	var i = $(this).index();

	$btns.removeClass("on");
	$boxs.removeClass("on");

	$btns.eq(i).addClass("on");
	$boxs.eq(i).addClass("on");
});