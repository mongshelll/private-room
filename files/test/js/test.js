var enable = false;



$(window).on("load", function () {
	windowSizeLimite(); //width 375보다 클 경우에만 실행가능
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
	$(".cont_box .access_browser").text("현재 접속중인 브라우저는 " + getBrowserInfo() + " 브라우저 입니다.");
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

//버전 포함
function getBrowserInfo() {
	var agent = navigator.userAgent;
	console.log(agent);
	// /text/i.test(var)  var에서 text가 있는지 확인 i는 대소문자 구별없이 결과값 불리언으로 나옴

	if (!/mobile/i.test(agent)) {
		if (/trident/i.test(agent)) {
			return 'Ie';
		} else if (/firefox/i.test(agent)) {
			// var firefoxText = agent.search(/firefox/i);
			// console.log(firefoxText);
			// console.log(agent.substring(75, 80));
			var firefoxNum = agent.substring(75, 80);
			return 'Firefox ver ' + firefoxNum;
		} else if (/edg/i.test(agent)) {
			// var edgeText = agent.search(/edg/i);
			// console.log(edgeText);
			// console.log(agent.substring(120, 125));
			var edgeNum = agent.substring(120, 125);
			return 'Edge ver ' + edgeNum;
		} else if (/opr/i.test(agent)) {
			// var oprText = agent.search(/opr/i);
			// console.log(oprText);
			// console.log(agent.substring(121, 125));
			var oprNum = agent.substring(121, 125);
			return 'Opera ver ' + oprNum;
			// return 'Opera';
		} else if (/whale/i.test(agent)) {
			// var whaleText = agent.search(/whale/i);
			// console.log(whaleText);
			// console.log(agent.substring(109, 120));
			var whaleNum = agent.substring(109, 120);
			return 'Whale ver ' + whaleNum;
		} else if (/chrome/i.test(agent)) {
			// var chromeText = agent.search(/chrome/i);
			// console.log(chromeText);
			// console.log(agent.substring(88, 97));
			var chromeNum = agent.substring(88, 97);
			return 'Chrome ver ' + chromeNum;
		} else if (/safari/i.test(agent)) {
			// var safariText = agent.search(/safari/i);
			// console.log(safariText);
			// console.log(agent.substring(88, 95));
			// var safariNum = agent.substring(88, 95);
			// return 'Safari ' + safariNum;
			return 'Safari';
		} else {
			return '';
		}
	} else {
		if (/trident/i.test(agent)) {
			return 'Mobile Ie';
		} else if (/firefox/i.test(agent)) {
			// var firefoxText = agent.search(/firefox/i);
			// console.log(firefoxText);
			// console.log(agent.substring(75, 80));
			var firefoxNum = agent.substring(75, 80);
			return 'Mobile Firefox ver ' + firefoxNum;
			//@@  모바일 ua에 mobile이 안잡힘  @@
		} else if (/edg/i.test(agent)) {
			// var edgeText = agent.search(/edg/i);
			// console.log(edgeText);
			// console.log(agent.substring(120, 125));
			var edgeNum = agent.substring(140, 145);
			return 'Mobile Edge ver ' + edgeNum;
		} else if (/opr/i.test(agent)) {
			// var oprText = agent.search(/opr/i);
			// console.log(oprText);
			// console.log(agent.substring(121, 125));
			var oprNum = agent.substring(121, 125);
			return 'Mobile Opera ver ' + oprNum;
			//@@  모바일 ua에 오페라 안나옴  @@
		} else if (/whale/i.test(agent)) {
			// var whaleText = agent.search(/whale/i);
			// console.log(whaleText);
			// console.log(agent.substring(109, 120));
			var whaleNum = agent.substring(109, 120);
			return 'Mobile Whale ver ' + whaleNum;
			//@@  모바일 ua에 웨일이 안나옴  @@
		} else if (/chrome/i.test(agent)) {
			// var chromeText = agent.search(/chrome/i);
			// console.log(chromeText);
			// console.log(agent.substring(88, 97));
			var chromeNum = agent.substring(101, 110);
			return 'Mobile Chrome ver ' + chromeNum;
		} else if (/safari/i.test(agent)) {
			// var safariText = agent.search(/safari/i);
			// console.log(safariText);
			// console.log(agent.substring(88, 95));
			// var safariNum = agent.substring(88, 95);
			// return 'Safari ' + safariNum;
			return 'Mobile Safari';
		} else {
			return '';
		}
	}
}

// function getBrowserInfo() {
// 	var agent = navigator.userAgent;
// 	console.log(agent);

// 	// var chromePos = agent.search(/chrome/i);
// 	// var chromePos2 = /chrome\/\d+(\.\d)*/i;
// 	// var target = agent.match(chromePos2)

// 	// console.log(chromePos); //81
// 	// console.log(target[0]);

// 	// /text/i.test(var)  var에서 text가 있는지 확인 i는 대소문자 구별없이 결과값 불리언으로 나옴
// 	if (/trident/i.test(agent)) {
// 		// var iePos = agent.search(/trident/i);
// 		return 'Ie';
// 	} else if (/firefox/i.test(agent)) {
// 		var firefoxNum = /firefox\/\d+/i;
// 		var firefoxVersion = agent.match(firefoxNum)
// 		return firefoxVersion;
// 		// return 'Firefox';
// 	} else if (/edg/i.test(agent)) {
// 		var edgeNum = /edg\/\d+/i;
// 		var edgeVersion = agent.match(edgeNum)
// 		return edgeVersion;
// 		// return 'Edge';
// 	} else if (/opr/i.test(agent)) {
// 		var operaNum = /opr\/\d+/i;
// 		var operaVersion = agent.match(operaNum)
// 		return operaVersion;
// 		// return 'Opera';
// 	} else if (/whale/i.test(agent)) {
// 		var whaleNum = /whale\/\d+/i;
// 		var whaleVersion = agent.match(whaleNum)
// 		return whaleVersion;
// 		// return 'Whale';
// 	} else if (/chrome/i.test(agent)) {
// 		// var chromeText = agent.search(/chrome/i);
// 		var chromeNum = /chrome\/\d+/i;
// 		var chromeVersion = agent.match(chromeNum)
// 		return chromeVersion;
// 		// return 'Chrome';
// 	} else if (/safari/i.test(agent)) {
// 		var safariNum = /safari\/\d+/i;
// 		var safariVersion = agent.match(safariNum)
// 		return safariVersion;
// 		// return 'Safari';
// 	} else {
// 		return '';
// 	}
// }

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
