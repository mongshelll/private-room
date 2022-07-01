

	var ua = navigator.userAgent;
	var lang = navigator.language; //언어 확인
	var core = navigator.hardwareConcurrency; //CPU 코어수 확인
	var memory = navigator.deviceMemory; //메모리 확인 최대 8기가까지

	var uaDate = navigator.userAgentData;  //지원브라우저가 적음 (익스, 파폭, 사파리, 웹뷰 미지원)
	var version = navigator.userAgentData.brands; //브라우저 이름, 버전, 종류 배열로 나옴
	var mobile = navigator.userAgentData.mobile; //모바일로 접속시 true 반환
	var platform = navigator.userAgentData.platform; //os확인

	var today = new Date();


	console.log(ua);
	console.log(lang);
	console.log(core);
	console.log(memory);
	console.log(uaDate);
	console.log(version);
	console.log(mobile);
	console.log(platform);
	console.log(document.referrer);
	console.log(today);


	var deviceResolutionWidth = window.screen.width * window.devicePixelRatio;
	var deviceResolutionHeight = window.screen.height * window.devicePixelRatio;

	var deviceResolution = deviceResolutionWidth + "X" + deviceResolutionHeight; //디바이스 해상도

	console.log(deviceResolution);






$(window).on("load", function () {
    windowSizeCheck(); //화면 사이즈 html에 출력
    getBrowserInfo(); //접속 브라우저 확인
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
	$(".browser_check").text("현재 접속중인 브라우저는 " + getBrowserInfo() + " 브라우저 입니다.");
	$(".lang_check").text("현재 접속중인 브라우저는 " + lang + " 언어를 사용합니다.");
	$(".resolution_check").text("현재 접속중인 브라우저의 해상도는 " + deviceResolution + " 입니다.");
	$(".today_check").text("현재 브라우저에 접속한 날짜와 시간 " + today + " 입니다.");
	$(".os_check").text("현재 사용중인 OS는 " + platform + " 입니다.");
}

//화면 사이즈 html에 출력 함수
function windowSizeCheck() {
    $(".viewport_size").text("현재 브라우저의 화면크기는 " + window.innerWidth + " x " + window.innerHeight + " 입니다.");
}

//접속 브라우저 확인
// function getBrowserInfo() {
// 	var ua = navigator.userAgent.toLowerCase();
// 	console.log(ua);
// 	if (ua.indexOf('trident') >= 0) {
// 		return 'Ie';
// 	} else if (ua.indexOf('firefox') >= 0) {
// 		return 'Firefox';
// 	} else if (ua.indexOf('edg') >= 0) {
// 		return 'Edge';
// 	} else if (ua.indexOf('opr') >= 0) {
// 		return 'Opera';
// 	} else if (ua.indexOf('whale') >= 0) {
// 		return 'Whale';
// 	} else if (ua.indexOf('chrome') >= 0) {
// 		return 'Chrome';
// 	} else if (ua.indexOf('safari') >= 0) {
// 		return 'Safari';
// 	} else {
// 		return '';
// 	}
// }
//출처: https://oingdaddy.tistory.com/406

//버전 포함
function getBrowserInfo() {

	// /text/i.test(var)  var에서 text가 있는지 확인 i는 대소문자 구별없이 결과값 불리언으로 나옴
	if (!/mobile/i.test(ua)) {
		if (/trident/i.test(ua)) {
			return 'Ie';
		} else if (/firefox/i.test(ua)) {
			// var firefoxText = ua.search(/firefox/i);
			// console.log(firefoxText);
			// console.log(ua.substring(75, 80));
			var firefoxNum = ua.substring(75, 80);
			return 'Firefox ver ' + firefoxNum;
		} else if (/edg/i.test(ua)) {
			// var edgeText = ua.search(/edg/i);
			// console.log(edgeText);
			// console.log(ua.substring(120, 125));
			var edgeNum = ua.substring(120, 125);
			return 'Edge ver ' + edgeNum;
		} else if (/opr/i.test(ua)) {
			// var oprText = ua.search(/opr/i);
			// console.log(oprText);
			// console.log(ua.substring(121, 125));
			var oprNum = ua.substring(121, 125);
			return 'Opera ver ' + oprNum;
			// return 'Opera';
		} else if (/whale/i.test(ua)) {
			// var whaleText = ua.search(/whale/i);
			// console.log(whaleText);
			// console.log(ua.substring(109, 120));
			var whaleNum = ua.substring(109, 120);
			return 'Whale ver ' + whaleNum;
		} else if (/chrome/i.test(ua)) {
			// var chromeText = ua.search(/chrome/i);
			// console.log(chromeText);
			// console.log(ua.substring(88, 97));
			var chromeNum = ua.substring(88, 97);
			return 'Chrome ver ' + chromeNum;
		} else if (/safari/i.test(ua)) {
			// var safariText = ua.search(/safari/i);
			// console.log(safariText);
			// console.log(ua.substring(88, 95));
			// var safariNum = ua.substring(88, 95);
			// return 'Safari ' + safariNum;
			return 'Safari';
		} else {
			return '';
		}
	} else {
		if (/trident/i.test(ua)) {
			return 'Mobile Ie';
		} else if (/firefox/i.test(ua)) {
			// var firefoxText = ua.search(/firefox/i);
			// console.log(firefoxText);
			// console.log(ua.substring(75, 80));
			var firefoxNum = ua.substring(75, 80);
			return 'Mobile Firefox ver ' + firefoxNum;
			//@@  모바일 ua에 mobile이 안잡힘  @@
		} else if (/edg/i.test(ua)) {
			// var edgeText = ua.search(/edg/i);
			// console.log(edgeText);
			// console.log(ua.substring(120, 125));
			var edgeNum = ua.substring(140, 145);
			return 'Mobile Edge ver ' + edgeNum;
		} else if (/opr/i.test(ua)) {
			// var oprText = ua.search(/opr/i);
			// console.log(oprText);
			// console.log(ua.substring(121, 125));
			var oprNum = ua.substring(121, 125);
			return 'Mobile Opera ver ' + oprNum;
			//@@  모바일 ua에 오페라 안나옴  @@
		} else if (/whale/i.test(ua)) {
			// var whaleText = ua.search(/whale/i);
			// console.log(whaleText);
			// console.log(ua.substring(109, 120));
			var whaleNum = ua.substring(109, 120);
			return 'Mobile Whale ver ' + whaleNum;
			//@@  모바일 ua에 웨일이 안나옴  @@
		} else if (/chrome/i.test(ua)) {
			// var chromeText = ua.search(/chrome/i);
			// console.log(chromeText);
			// console.log(ua.substring(88, 97));
			var chromeNum = ua.substring(101, 110);
			return 'Mobile Chrome ver ' + chromeNum;
		} else if (/safari/i.test(ua)) {
			// var safariText = ua.search(/safari/i);
			// console.log(safariText);
			// console.log(ua.substring(88, 95));
			// var safariNum = ua.substring(88, 95);
			// return 'Safari ' + safariNum;
			return 'Mobile Safari';
		} else {
			return '';
		}
	}
}

// function getBrowserInfo() {
// 	// var chromePos = ua.search(/chrome/i);
// 	// var chromePos2 = /chrome\/\d+(\.\d)*/i;
// 	// var target = ua.match(chromePos2)

// 	// console.log(chromePos); //81
// 	// console.log(target[0]);

// 	// /text/i.test(var)  var에서 text가 있는지 확인 i는 대소문자 구별없이 결과값 불리언으로 나옴
// 	if (/trident/i.test(ua)) {
// 		// var iePos = ua.search(/trident/i);
// 		return 'Ie';
// 	} else if (/firefox/i.test(ua)) {
// 		var firefoxNum = /firefox\/\d+/i;
// 		var firefoxVersion = ua.match(firefoxNum)
// 		return firefoxVersion;
// 		// return 'Firefox';
// 	} else if (/edg/i.test(ua)) {
// 		var edgeNum = /edg\/\d+/i;
// 		var edgeVersion = ua.match(edgeNum)
// 		return edgeVersion;
// 		// return 'Edge';
// 	} else if (/opr/i.test(ua)) {
// 		var operaNum = /opr\/\d+/i;
// 		var operaVersion = ua.match(operaNum)
// 		return operaVersion;
// 		// return 'Opera';
// 	} else if (/whale/i.test(ua)) {
// 		var whaleNum = /whale\/\d+/i;
// 		var whaleVersion = ua.match(whaleNum)
// 		return whaleVersion;
// 		// return 'Whale';
// 	} else if (/chrome/i.test(ua)) {
// 		// var chromeText = ua.search(/chrome/i);
// 		var chromeNum = /chrome\/\d+/i;
// 		var chromeVersion = ua.match(chromeNum)
// 		return chromeVersion;
// 		// return 'Chrome';
// 	} else if (/safari/i.test(ua)) {
// 		var safariNum = /safari\/\d+/i;
// 		var safariVersion = ua.match(safariNum)
// 		return safariVersion;
// 		// return 'Safari';
// 	} else {
// 		return '';
// 	}
// }