var ua = navigator.userAgent;

console.log(ua);

if(/mobile/i.test(ua)){
	$("body").addClass("mo")
	setTimeout(function(){
		// location.href = "http://ljs1898.dothome.co.kr/test/mobile/"
		// location.href = "http://127.0.0.1:5500/210514_kakaomap/%EB%A6%AC%EB%8B%A4%EC%9D%B4%EB%A0%89%ED%8C%85/mobile/index.html"
		location.href = "../mobile/index.html";
	}, 3000)
}
