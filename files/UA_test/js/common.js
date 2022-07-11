//device info test js



$(window).on("load", function () {
	osCheck(); //os 체크
    windowSizeCheck(); //화면 사이즈 html에 출력
    browserCheck(); //접속한 브라우저 내용 html에 출력
	popupCheck()  //팝업 허용여부 확인
	ipCheck(); //ip 확인
	performanceCheck(); //퍼포먼스 체크
});

$(window).on("resize", function () {
    windowSizeCheck(); //화면크기 변경시 화면 사이즈 html에 출력
});


var ua = navigator.userAgent; //UA
var platform = navigator.platform; //브라우저가 설치된 시스템환경
var today = new Date(); //날짜 시간
var cookie = navigator.cookieEnabled; //쿠키 사용가능 여부
// var mediaDevice = navigator.mediaDevices.enumerateDevices();
var mediaDevice = navigator.mediaDevices;

console.log(mediaDevice);

//해상도 구하기
var deviceResolutionWidth = window.screen.width * window.devicePixelRatio; //가로 값
var deviceResolutionHeight = window.screen.height * window.devicePixelRatio; //세로 값
var deviceResolution = deviceResolutionWidth + " X " + deviceResolutionHeight //디바이스 해상도


console.log(ua);
console.log(deviceResolution); //해상도 값
console.log(platform);
console.log(today);
console.log(cookie);
console.log("이전 방문 url " + document.referrer);
console.log(window.devicePixelRatio);



// 추가할 기능
// Webcams
// Cookies 가능
// Pop-up Windows
// JavaScript
// WebRTC
// WebSocket
// Device Pixel Ratio
// Performance


//카메라 마이크 테스트
// (async () => {
// 	await navigator.mediaDevices.getUserMedia({video: true});
// 	let devices = await navigator.mediaDevices.enumerateDevices();
// 	console.log(devices);
// })();
// (async function() {
// 	await navigator.mediaDevices.getUserMedia({video: true});
// 	let devices = await navigator.mediaDevices.enumerateDevices();
// 	console.log(devices);
// 	$(".cam_check").text("사용가능한 cam : " + devices[1].label)


// 	if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
// 		console.log("enumerateDevices()를 지원하지 않습니다.");
// 		return;
// 	}

// 	// 카메라와 마이크 리스트

// 	navigator.mediaDevices.enumerateDevices()
// 	.then(function(devices) {
// 		devices.forEach(function(device) {
// 			console.log(device.kind + ": " + device.label + " id = " + device.deviceId);
// 		});
// 	})
// 	.catch(function(err) {
// 		console.log(err.name + ": " + err.message);
// 	});
// })();
//카메라 마이크 테스트 end


//ip 확인
function ipCheck() {
	fetch('https://jsonip.com', { mode: 'cors' })
		.then((resp) => resp.json())
		.then((ip) => {
			console.log(ip);
			$(".ip_WAN").text("접속자 WAN IP : " + ip.ip);
		});
}

//popup 허용여부 확인
function popupCheck() {
	var popup = window.open("popup_test.html", "popup_test", "top=200, left=100, width=200, height=134");

	if(popup == null) {
		$(".popup_check").text("팝업 차단");
	} else {
		$(".popup_check").text("팝업 허용");
		// popup.close();
	}
}

//접속한 브라우저 내용 html에 출력
function browserCheck() {
	$(".browser_check").text(getBrowserInfo() + "으로 접속");
	$(".resolution_check").text("해상도 : " + deviceResolution);
	// $(".lang_check").text(lang + " 언어를 사용합니다.");
	$(".today_check").text("접속 일시 : " + today);
	$(".cookie_check").text("쿠키사용 여부" + " : " + cookie);
	$(".ua").text(ua);
}

//화면 사이즈 html에 출력 함수
function windowSizeCheck() {
    $(".viewport_size").text("내부 크기 : " + window.innerWidth + "px x " + window.innerHeight + "px");
    $(".window_size").text("외부 크기 : " + window.outerWidth + "px x " + window.outerHeight + "px");
}

//OS 체크
function osCheck() {
	if(/win/i.test(ua)) {
		$(".os_check").text("사용중인 OS는 Windows");
	} else if (/android/i.test(ua)) {
		var androidOS = ua.substring(browserInfo("android"), browserInfo("android") + 3)
		$(".os_check").text("사용중인 OS는 Android " + androidOS);
	} else if (/iphone/i.test(ua) || /ios/i.test(ua) || /ipad/i.test(ua) || /ipod/i.test(ua)) {
		$(".os_check").text("사용중인 OS는 iOS");
	} else if (/mac/i.test(ua) || /macintosh/i.test(ua)) {
		$(".os_check").text("사용중인 OS는 Mac OS");
	}
}

//OS 체크
// platform이 지원 중단될 경우 대비
// function osCheck() {
// 	if(/win/i.test(platform)){
// 		$(".os_check").text("현재 사용중인 OS는 Windows");
// 	} else if(/android/i.test(ua)){
// 		var androidOS = ua.substring(browserInfo("android"), browserInfo("android") + 2)
// 		$(".os_check").text("현재 사용중인 OS는 Android " + androidOS);
// 	} else {
// 		$(".os_check").text("현재 사용중인 OS는 " + platform);
// 	}
// 	console.log(platform);
// }

//브라우저, 버전 정보
function getBrowserInfo() {
	if (!/mobile/i.test(ua)) {
		if (/trident/i.test(ua)) {
			return 'Ie';
		} else if (/firefox/i.test(ua)) {
			var firefoxNum = ua.substring(browserInfo("firefox"), browserInfo("firefox") + 5);
			return 'Firefox ver ' + firefoxNum;
		} else if (/edg/i.test(ua)) {
			var edgeNum = ua.substring(browserInfo("edg"), browserInfo("edg") + 5);
			return 'Edge ver ' + edgeNum;
		} else if (/opr/i.test(ua)) {
			var oprNum = ua.substring(browserInfo("opr"), browserInfo("opr") + 5);
			return 'Opera ver ' + oprNum;
		} else if (/whale/i.test(ua)) {
			var whaleNum = ua.substring(browserInfo("whale"), browserInfo("whale") + 5);
			return 'Whale ver ' + whaleNum;
		} else if (/chrome/i.test(ua)) {
			var chromeNum = ua.substring(browserInfo("chrome"), browserInfo("chrome") + 9);
			return 'Chrome ver ' + chromeNum;
		} else if (/safari/i.test(ua)) {
			var safariNum = ua.substring(browserInfo("safari"), browserInfo("safari") + 7);
			return 'Safari ver ' + safariNum;
		} else {
			return '';
		}
	} else {
		if (/trident/i.test(ua)) {
			return 'Mobile Ie';
		} else if (/firefox/i.test(ua)) {
			var firefoxNum = ua.substring(browserInfo("firefox"), browserInfo("firefox") + 5);
			return 'Mobile Firefox ver ' + firefoxNum;
		} else if (/edg/i.test(ua)) {
			var edgeNum = ua.substring(browserInfo("edg"), browserInfo("edg") + 14);
			return 'Mobile Edge ver ' + edgeNum;
		} else if (/opr/i.test(ua)) {
			var oprNum = ua.substring(browserInfo("opr"), browserInfo("opr") + 4);
			return 'Mobile Opera ver ' + oprNum;
		} else if (/naver/i.test(ua)) {
			var naverNum = ua.substring(browserInfo("naver") + 21, browserInfo("naver") + 28);
			return 'Mobile NAVER App ver ' + naverNum;
		} else if (/whale/i.test(ua)) {
			var whaleNum = ua.substring(browserInfo("whale"), browserInfo("whale") + 7);
			return 'Mobile Whale ver ' + whaleNum;
		} else if (/samsungbrowser/i.test(ua)) {
			var samsungbrowserNum = ua.substring(browserInfo("samsungbrowser"), browserInfo("samsungbrowser") + 4);
			return 'Mobile SamsungBrowser ver ' + samsungbrowserNum;
		} else if (/chrome/i.test(ua)) {
			var chromeNum = ua.substring(browserInfo("chrome"), browserInfo("chrome") + 9);
			return 'Mobile Chrome ver ' + chromeNum;
		} else if (/safari/i.test(ua)) {
			var safariNum = ua.substring(browserInfo("safari"), browserInfo("safari") + 5);
			return 'Mobile Safari ver ' + safariNum;
		} else {
			return '';
		}
	}
}

//브라우저 버전확인용
function browserInfo(target){
	var target_text = new RegExp(target, "i");
	var start = ua.search(target_text);
	var target_length = target.length + 1;
	var browserInforesult = start + target_length;
	// console.log(target_length);

	return browserInforesult;
}



///////////////////////////////////
// 서이준 테스트//////////////////////////
///////////////////////////////////

// 퍼포먼스 체크
function performanceCheck() {
	setTimeout(function() {
		var e = (l = performance.timing).connectEnd,
			n = l.connectStart,
			i = l.domainLookupEnd,
			a = l.domainLookupStart,
			t = l.loadEventEnd,
			o = l.navigationStart,
			r = l.requestStart,
			s = l.responseStart,
			l = l.responseEnd,
			d = "Less than 0.001 sec",
			c = "sec",
			p = "sec",
			u = 0,
			y = (t - o) / 1e3;

		ID("pf1_1").innerHTML = "", y <= 0 ? (ID("pf1_2").innerHTML = d, u += 1) :
		ID("pf1_2").innerHTML = 1 == y ? y + " " + c : y + " " + p, y = (r - o) / 1e3,

		ID("pf2_1").innerHTML = "", y <= 0 ? (ID("pf2_2").innerHTML = d, u += 1) :
		ID("pf2_2").innerHTML = 1 == y ? y + " " + c : y + " " + p, o = (i - a) / 1e3,

		ID("pf3_1").innerHTML = "", o <= 0 ? (ID("pf3_2").innerHTML = d, u += 1) :
		ID("pf3_2").innerHTML = 1 == o ? o + " " + c : o + " " + p, y = (e - n) / 1e3,

		ID("pf4_1").innerHTML = "", y <= 0 ? (ID("pf4_2").innerHTML = d, u += 1) :
		ID("pf4_2").innerHTML = 1 == y ? y + " " + c : y + " " + p, i = (s - r) / 1e3,

		ID("pf5_1").innerHTML = "", i <= 0 ? (ID("pf5_2").innerHTML = d, u += 1) :
		ID("pf5_2").innerHTML = 1 == i ? i + " " + c : i + " " + p, a = (l - s) / 1e3,

		ID("pf6_1").innerHTML = "", a <= 0 ? (ID("pf6_2").innerHTML = d, u += 1) :
		ID("pf6_2").innerHTML = 1 == a ? a + " " + c : a + " " + p, o = (t - l) / 1e3;

		ID("pf7_1").innerHTML = "", o <= 0 ? (ID("pf7_2").innerHTML = d, u += 1) :
		ID("pf7_2").innerHTML = 1 == o ? o + " " + c : o + " " + p, 7 === u;
	}, 1);
}





///////////////////////////////////
// 테스트//////////////////////////
///////////////////////////////////

// var memory = navigator.deviceMemory; //메모리 확인 최대 8기가까지
// var version = navigator.appVersion;
// var lang = navigator.language; //언어 확인
// var core = navigator.hardwareConcurrency; //CPU 코어수 확인
// var connection = navigator.connection; //네트워크 확인

// var uaDate = navigator.userAgentData;  //지원브라우저가 적음 (익스, 파폭, 사파리, 웹뷰 미지원)
// var version = navigator.userAgentData.brands; //브라우저 이름, 버전, 종류 배열로 나옴
// var mobile = navigator.userAgentData.mobile; //모바일로 접속시 true 반환
// var platform = navigator.userAgentData.platform; //os확인



// console.log(lang);
// console.log(core);
// console.log(connection);
// console.log(memory);
// console.log(uaDate);
// console.log(version);
// console.log(mobile);




// function versionInfo(target){
// 	var target_text = new RegExp(target, "i");
// 	var start = ua.search(target_text);
// 	var end = ua.search(target_text);
// 	var target_length = target.length + 1;
// 	var browserInforesult = start + target_length;
// 	// console.log(target_length);

// 	return browserInforesult;
// }

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

//버전 포함
// function getBrowserInfo() {

// 	// /text/i.test(var)  var에서 text가 있는지 확인 i는 대소문자 구별없이 결과값 불리언으로 나옴
// 	if (!/mobile/i.test(ua)) {
// 		if (/trident/i.test(ua)) {
// 			return 'Ie';
// 		} else if (/firefox/i.test(ua)) {
// 			// var firefoxText = ua.search(/firefox/i);
// 			// console.log(firefoxText);
// 			// console.log(ua.substring(75, 80));
// 			var findNum = ua.search(/firefox/i) + 8;
// 			// var firefoxNum = ua.substring(75, 80);
// 			var firefoxNum = ua.substring(findNum, findNum + 5);
// 			// console.log(findNum);
// 			// browserInfo(firefox)
// 			return 'Firefox ver ' + firefoxNum;
// 		} else if (/edg/i.test(ua)) {
// 			// var edgeText = ua.search(/edg/i);
// 			// console.log(edgeText);
// 			// console.log(ua.substring(120, 125));
// 			var edgeNum = ua.substring(120, 125);
// 			return 'Edge ver ' + edgeNum;
// 		} else if (/opr/i.test(ua)) {
// 			// var oprText = ua.search(/opr/i);
// 			// console.log(oprText);
// 			// console.log(ua.substring(121, 125));
// 			var oprNum = ua.substring(121, 125);
// 			return 'Opera ver ' + oprNum;
// 			// return 'Opera';
// 		} else if (/whale/i.test(ua)) {
// 			// var whaleText = ua.search(/whale/i);
// 			// console.log(whaleText);
// 			// console.log(ua.substring(109, 120));
// 			var whaleNum = ua.substring(109, 120);
// 			return 'Whale ver ' + whaleNum;
// 		} else if (/chrome/i.test(ua)) {
// 			// var chromeText = ua.search(/chrome/i);
// 			// console.log(chromeText);
// 			// console.log(ua.substring(88, 97));
// 			var chromeNum = ua.substring(88, 97);
// 			return 'Chrome ver ' + chromeNum;
// 		} else if (/safari/i.test(ua)) {
// 			// var safariText = ua.search(/safari/i);
// 			// console.log(safariText);
// 			// console.log(ua.substring(88, 95));
// 			// var safariNum = ua.substring(88, 95);
// 			// return 'Safari ' + safariNum;
// 			return 'Safari';
// 		} else {
// 			return '';
// 		}
// 	} else {
// 		if (/trident/i.test(ua)) {
// 			return 'Mobile Ie';
// 		} else if (/firefox/i.test(ua)) {
// 			// var firefoxText = ua.search(/firefox/i);
// 			// console.log(firefoxText);
// 			// console.log(ua.substring(75, 80));
// 			var firefoxNum = ua.substring(63, 68);
// 			return 'Mobile Firefox ver ' + firefoxNum;
// 			//@@  모바일 ua에 mobile이 안잡힘  @@
// 		} else if (/edg/i.test(ua)) {
// 			// var edgeText = ua.search(/edg/i);
// 			// console.log(edgeText);
// 			// console.log(ua.substring(120, 125));
// 			var edgeNum = ua.substring(128, 141);
// 			return 'Mobile Edge ver ' + edgeNum;
// 		} else if (/opr/i.test(ua)) {
// 			// var oprText = ua.search(/opr/i);
// 			// console.log(oprText);
// 			// console.log(ua.substring(121, 125));
// 			var oprNum = ua.substring(121, 125);
// 			return 'Mobile Opera ver ' + oprNum;
// 			//@@  모바일 ua에 오페라 안나옴  @@
// 		} else if (/naver/i.test(ua)) {
// 			return 'Mobile NAVER App';
// 		} else if (/whale/i.test(ua)) {
// 			// var whaleText = ua.search(/whale/i);
// 			// console.log(whaleText);
// 			// console.log(ua.substring(109, 120));
// 			var whaleNum = ua.substring(108, 115);
// 			return 'Mobile Whale ver ' + whaleNum;
// 			//@@  모바일 ua에 웨일이 안나옴  @@
// 		} else if (/samsungbrowser/i.test(ua)) {
// 			var samsungbrowserNum = ua.substring(113, 117);
// 			return 'Mobile SamsungBrowser ver ' + samsungbrowserNum;
// 		} else if (/chrome/i.test(ua)) {
// 			// var chromeText = ua.search(/chrome/i);
// 			// console.log(chromeText);
// 			// console.log(ua.substring(88, 97));
// 			var chromeNum = ua.substring(88, 97);
// 			return 'Mobile Chrome ver ' + chromeNum;
// 		} else if (/safari/i.test(ua)) {
// 			// var safariText = ua.search(/safari/i);
// 			// console.log(safariText);
// 			// console.log(ua.substring(88, 95));
// 			// var safariNum = ua.substring(88, 95);
// 			// return 'Safari ' + safariNum;
// 			return 'Mobile Safari';
// 		} else {
// 			return '';
// 		}
// 	}
// }

// browserInfo("firefox");
// console.log(browserInfo());
// function browserInfo(target) {
// 	var targetBrow = new RegExp(/target/);
// 	var tetest = ua.search(targetBrow);
// 	var findNum = tetest + 8;
// 	// var firefoxNum = ua.substring(75, 80);
// 	var targetNum = ua.substring(findNum, findNum + 5);
// 	console.log(targetNum);
// 	console.log(tetest);
// 	return targetNum;
// }

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

