const $test_box_wrap = $(".scroll_test_box");
const $cont_box = $(".cont_box");
let enable = false;



$(window).on("load", function () {
	if (window.innerWidth > 375) {
		enable = true;
		console.log(window.innerWidth + "px (화면넓이)");
		console.log(enable);
	}
	$(".cont_box .viewport_size").text(window.innerWidth + "px (화면넓이)" + " X " + + window.innerHeight + "px (화면높이)");

	getBrowserInfo();

	$(".cont_box .access_browser").text("현재 접속중인 브라우저는 " + getBrowserInfo() + "브라우저 입니다.");
});

$(window).on("resize", function () {
	// console.log(window.innerWidth + "px (화면넓이)");
	$(".cont_box .viewport_size").text(window.innerWidth + "px (화면넓이)" + " X " + + window.innerHeight + "px (화면높이)");
});





function getBrowserInfo() {
	var agent = navigator.userAgent.toUpperCase();
	console.log(agent);
	if (agent.indexOf('TRIDENT') >= 0) {
		return 'Ie';
	} else if (agent.indexOf('FIREFOX') >= 0) {
		return 'Firefox';
	} else if (agent.indexOf('EDG') >= 0) {
		return 'Edge';
	} else if (agent.indexOf('OPR') >= 0) {
		return 'Opera';
	} else if (agent.indexOf('CHROME') >= 0) {
		return 'Chrome';
	} else if (agent.indexOf('SAFARI') >= 0) {
		return 'Safari';
	} else {
		return '';
	}
}
//출처: https://oingdaddy.tistory.com/406 [SI Supply Depot:티스토리]