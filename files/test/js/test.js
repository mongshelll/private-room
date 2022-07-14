var enable = false;
var ua = navigator.userAgent;


$(window).on("load", function () {
	windowSizeLimite(); //width 375보다 클 경우에만 실행가능
	windowSizeCheck(); //화면 사이즈 html에 출력
	getversionInfo(); //접속 브라우저 확인
	browserCheck(); //접속한 브라우저 내용 html에 출력
});

$(window).on("resize", function () {
	windowSizeCheck(); //화면크기 변경시 화면 사이즈 html에 출력
});


// var inxTest = "teteteSt";
// var textt = inxTest.search(/s/i);

// console.log(textt);
// console.log(inxTest.search(/s/i));
// console.log(parseInt(inxTest.substring(textt, textt + 1)), 10);


//접속한 브라우저 내용 html에 출력
function browserCheck() {
	$(".cont_box .access_browser").text(getversionInfo());
}

//접속 브라우저 확인
// function getBrowserInfo() {
// 	var agent = navigator.userAgent.toLowerCase();
// 	console.log(agent);
// 	if (agent.indexOf('trident') >= 0) {
// 		return 'Ie';
// 	} else if (agent.indexOf('firefox') >= 0) {
// 		return 'Firefox';
// 	} else if (agent.indexOf('edg') >= 0) {
// 		return 'Edge';
// 	} else if (agent.indexOf('opr') >= 0) {
// 		return 'Opera';
// 	} else if (agent.indexOf('whale') >= 0) {
// 		return 'Whale';
// 	} else if (agent.indexOf('chrome') >= 0) {
// 		return 'Chrome';
// 	} else if (agent.indexOf('safari') >= 0) {
// 		return 'Safari';
// 	} else {
// 		return '';
// 	}
// }
//출처: https://oingdaddy.tistory.com/406
console.log(ua);
//버전 포함
//브라우저, 버전 정보
function getversionInfo() {
	if (!/mobile/i.test(ua)) {
		if (/trident/i.test(ua)) {
			return 'Ie';
		} else if (/firefox/i.test(ua)) {
			var firefoxNum = ua.substring(versionInfo("firefox"), versionInfo("firefox") + 5);
			return 'Firefox ver ' + firefoxNum;
		} else if (/edg/i.test(ua)) {
			var edgeNum = ua.substring(versionInfo("edg"), versionInfo("edg") + 14);
			return 'Edge ver ' + edgeNum;
		} else if (/opr/i.test(ua)) {
			var oprNum = ua.substring(versionInfo("opr"), versionInfo("opr") + 5);
			return 'Opera ver ' + oprNum;
		} else if (/whale/i.test(ua)) {
			var whaleNum = ua.substring(versionInfo("whale"), versionInfo("whale") + 12);
			return 'Whale ver ' + whaleNum;
		} else if (/chrome/i.test(ua)) {
			var chromeNum = ua.substring(versionInfo("chrome"), versionInfo("chrome") + 9);
			return 'Chrome ver ' + chromeNum;
		} else if (/safari/i.test(ua)) {
			var safariNum = ua.substring(versionInfo("safari"), versionInfo("safari") + 8);
			return 'Safari ver ' + safariNum;
		} else {
			return '';
		}
	} else {
		if (/trident/i.test(ua)) {
			return 'Mobile Ie';
		} else if (/firefox/i.test(ua)) {
			var firefoxNum = ua.substring(versionInfo("firefox"), versionInfo("firefox") + 5);
			return 'Mobile Firefox ver ' + firefoxNum;
		} else if (/edg/i.test(ua)) {
			var edgeNum = ua.substring(versionInfo("edg"), versionInfo("edg") + 14);
			return 'Mobile Edge ver ' + edgeNum;
		} else if (/opr/i.test(ua)) {
			var oprNum = ua.substring(versionInfo("opr"), versionInfo("opr") + 4);
			return 'Mobile Opera ver ' + oprNum;
		} else if (/naver/i.test(ua)) {
			var naverNum = ua.substring(versionInfo("naver") + 21, versionInfo("naver") + 28);
			return 'Mobile NAVER App ver ' + naverNum;
		} else if (/whale/i.test(ua)) {
			var whaleNum = ua.substring(versionInfo("whale"), versionInfo("whale") + 7);
			return 'Mobile Whale ver ' + whaleNum;
		} else if (/samsungbrowser/i.test(ua)) {
			var samsungbrowserNum = ua.substring(versionInfo("samsungbrowser"), versionInfo("samsungbrowser") + 4);
			return 'Mobile SamsungBrowser ver ' + samsungbrowserNum;
		} else if (/chrome/i.test(ua)) {
			var chromeNum = ua.substring(versionInfo("chrome"), versionInfo("chrome") + 9);
			return 'Mobile Chrome ver ' + chromeNum;
		} else if (/safari/i.test(ua)) {
			var safariNum = ua.substring(versionInfo("safari"), versionInfo("safari") + 5);
			return 'Mobile Safari ver ' + safariNum;
		} else {
			return '';
		}
	}
}

//버전확인용
function versionInfo(target){
	var target_text = new RegExp(target, "i");
	var start = ua.search(target_text);
	var target_length = target.length + 1;
	var versionInfoResult = start + target_length;
	// console.log(target_length);

	return versionInfoResult;
}

//화면 사이즈 html에 출력 함수
function windowSizeCheck() {
	// $(".cont_box .viewport_size").text(window.innerWidth + "px (화면넓이)" + " X " + + window.innerHeight + "px (화면높이)");
	$(".cont_box .viewport_size").text(window.innerWidth + " x " + window.innerHeight);
}

//width 375보다 클 경우에만 실행가능
function windowSizeLimite() {
	if (window.innerWidth > 375) {
		enable = true;
		console.log(window.innerWidth + "px (화면넓이)");
		console.log(enable);
	}
}
