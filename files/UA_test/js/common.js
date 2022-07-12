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
		$(".os_check").text("사용중인 OS : Windows");
	} else if (/android/i.test(ua)) {
		var androidOS = ua.substring(browserInfo("android"), browserInfo("android") + 3)
		$(".os_check").text("사용중인 OS : Android " + androidOS);
	} else if (/iphone/i.test(ua) || /ios/i.test(ua) || /ipad/i.test(ua) || /ipod/i.test(ua)) {
		$(".os_check").text("사용중인 OS : iOS");
	} else if (/mac/i.test(ua) || /macintosh/i.test(ua)) {
		$(".os_check").text("사용중인 OS : Mac OS");
	}
}

//OS 체크
// platform이 지원 중단될 경우 대비
// function osCheck() {
// 	if(/win/i.test(platform)){
// 		$(".os_check").text("현재 사용중인 OS : Windows");
// 	} else if(/android/i.test(ua)){
// 		var androidOS = ua.substring(browserInfo("android"), browserInfo("android") + 2)
// 		$(".os_check").text("현재 사용중인 OS : Android " + androidOS);
// 	} else {
// 		$(".os_check").text("현재 사용중인 OS : " + platform);
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


//websocket 체크
function websocketCheck(){
	var e = (l = performance.timing).connectEnd;
	var l = l.responseEnd;
	var a = '<span class="wrltg">Detecting <span>&#9632;</span><span>&#9632;</span><span>&#9632;</span></span>';
	var ue = "Supported";
	var re = "Allowed";
	var Se = "Detection blocked by browser setting(s)/extension(s) or firewall(s).";
	var t = "Disabled, or blocked by browser setting(s)/extension(s).";
	var h = "Unknown. Detection blocked by browser setting(s)/extension(s).";
	var V = "deviceinfo.me";

	try {
		window.WebSocket || window.MozWebSocket, ID("ws1").innerHTML = a, ID("wsc1").innerHTML = a;
		var Xt = "";

		function Yt() {
			zt()
		}

		function zt() {
			if (window.WebSocket || window.MozWebSocket) {
				ID("ws1").innerHTML = "", ID("ws2").innerHTML = ue;
				try {
					(WSC = new WebSocket("wss://" + V + ":8000/")).onopen = function() {
						console.log(WSC)
						Xt = !0, ID("wsc1").innerHTML = "", ID("wsc2").innerHTML = re, WSC && WSC.close()
					}, WSC.onerror = function() {
						!0 !== Xt && (Xt = !0, ID("wsc1").innerHTML = "", ID("wsc2").innerHTML = Se)
					}
				} catch (e) {
					Xt = !0, ID("wsc1").innerHTML = "", ID("wsc2").innerHTML = "Blocked by browser setting(s)/extension(s)."
				}
				setTimeout(function() {
					!0 !== Xt && (Xt = !0, ID("wsc1").innerHTML = "", ID("wsc2").innerHTML = ue)
				}, 2e3)
			} else ID("ws1").innerHTML = "", ID("ws2").innerHTML = t, ID("wsc1").innerHTML = "", ID("wsc2").innerHTML = t
		}
		window.addEventListener("load", Yt())
	} catch (e) {
		ID("ws2").innerHTML = h, ID("wsc2").innerHTML = h
	}
}

//webRTC 체크
function webRTC(){
	var mn = "",
		Tn = !1,
		Ln = "";
	var t = "Disabled, or blocked by browser setting(s)/extension(s).";
	var Ie = "Unknown. Blocked by browser setting(s)/extension(s), or not supported.";
	var u = "Enabled";

	try {
		var fn = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection,
			yn, fn;
		fn || (fn = yn.RTCPeerConnection || yn.mozRTCPeerConnection || yn.webkitRTCPeerConnection), fn ? mn = u : (mn = t, Tn = !0), Ln = !1
	} catch (e) {
		mn = Ie, Ln = !0
	}

	ID("rtc1").innerHTML = mn
}


function webcams(){

	var xe = !1;
	var Tn = !1;
	var	Ln = !1;
	var m = navigator;
	var T = window;
	var n = "Unknown. Detection not supported or is blocked by browser setting(s)/extension(s).";
	var I = "Edge";
	var y = "";
	var a = '<div class="wrltg">Detecting <span>&#9632;</span><span>&#9632;</span><span>&#9632;</span></div>';
	var te = "Detected";
	var bn = "Unknown. Detection not responding." + ae,
		vn = "Unknown. WAN IP assigned, or detection may be blocked by browser setting(s)/extension(s) or firewall(s).",
		Cn = "Unknown. Detection timed out. Detection may be blocked by browser setting(s)/extension(s) or firewall(s).",
		ae = '<div class="jeeqs"><span>&#9632;</span><span>&#9632;</span><span>&#9632;</span></div>',
		M = "None detected",
		g = document,
		Q = "103.0",
		d = "";


	if (!1 === xe)
		if (!1 === Tn)
			if (!1 === Ln) {
				var La = "",
					fa = "";
				try {
					var ya = new fn({
							iceServers: []
						}),
						Sa = function() {};
					ya.createDataChannel("")
				} catch (e) {
				}
				!1 !== La ,
					function() {
						var t = [],
							o = [],
							r = [],
							s = [],
							i = (m.mediaDevices && m.mediaDevices.enumerateDevices && (m.enumerateDevices = function(e) {
								var n = m.mediaDevices.enumerateDevices();
								n && n.then ? m.mediaDevices.enumerateDevices().then(e).catch(function() {
									e([])
								}) : e([])
							}), !1),
							l = (("undefined" != typeof MediaStreamTrack && "getSources" in MediaStreamTrack || m.mediaDevices && m.mediaDevices.enumerateDevices) && (i = !0), !1),
							d = !1,
							c = !1,
							p = !1,
							u = !1;
						var h = T.fnocc || {},
							e = (m.getUserMedia || m.mediaDevices && m.mediaDevices.getUserMedia, "Chrome" !== I && "Chrome for iOS" !== I && "Chrome" !== y || 1 != f(Q, ">=", "47") || /^(https:|chrome-extension:)$/g.test(location.protocol || "") || "undefined" != typeof document && "string" == typeof g.domain && g.domain.search && g.domain.search(/localhost|127.0./g), h.load = function(e) {
								! function(n) {
									var a;
									i ? (!m.enumerateDevices && T.MediaStreamTrack && T.MediaStreamTrack.getSources && (m.enumerateDevices = T.MediaStreamTrack.getSources.bind(T.MediaStreamTrack)), !m.enumerateDevices && m.enumerateDevices && (m.enumerateDevices = m.enumerateDevices.bind(m)), m.enumerateDevices ? (t = [], o = [], r = [], s = [], u = p = c = d = l = !1, a = {}, m.enumerateDevices(function(e) {
										e.forEach(function(e) {
											var n, i = {};
											for (n in e) try {
												"function" != typeof e[n] && (i[n] = e[n])
											} catch (e) {}
											a[i.deviceId + i.label + i.kind] || ("audio" === i.kind && (i.kind = "audioinput"), "video" === i.kind && (i.kind = "videoinput"), i.deviceId || (i.deviceId = i.id), i.id || (i.id = i.deviceId), i.label ? ("videoinput" !== i.kind || u || (u = !0), "audioinput" !== i.kind || p || (p = !0)) : (i.CL = !0, "videoinput" === i.kind ? i.label = "Camera " + (s.length + 1) : "audioinput" === i.kind ? i.label = "Microphone " + (o.length + 1) : "audiooutput" === i.kind ? i.label = "Speaker " + (r.length + 1) : i.label = '&#9642; <span class="tkiyy">Unknown. Grant media permissions to detect.</span>', void 0 === h || "Chrome" !== I && "Chrome for iOS" !== I && "Chrome" !== y || 1 != f(Q, ">=", "47") || /^(https:|chrome-extension:)$/g.test(location.protocol || "") || "undefined" != typeof document && "string" == typeof g.domain && g.domain.search && -1 === g.domain.search(/localhost|127.0./g) && (i.label = "Unknown. HTTPS is required for this browser to detect device labels.")), "audioinput" === i.kind && (l = !0, -1 === o.indexOf(i) && o.push(i)), "audiooutput" === i.kind && (d = !0, -1 === r.indexOf(i) && r.push(i)), "videoinput" === i.kind && (c = !0, -1 === s.indexOf(i) && s.push(i)), t.push(i), a[i.deviceId + i.label + i.kind] = i)
										}), void 0 !== h && (h.czeuj = t, h.dlxjn = l, h.aokkd = d, h.ovtta = c, h.qecpr = u, h.aitwv = p, h.ofgmq = o, h.onnqt = r, h.vbywi = s), n && n()
										alert(h.aokkd)
									})) : n && n()) : n && n()
								}(e = e || function() {})
							}, h.czeuj = void 0 !== t ? t : [], h.dlxjn = l, h.aokkd = d, h.ovtta = c, h.qecpr = u, h.aitwv = p, h.ofgmq = o, h.onnqt = r, h.vbywi = s, void 0 === h && (T.fnocc = {}), T.RTCPeerConnection || T.mozRTCPeerConnection || T.webkitRTCPeerConnection);
						h.RTCPeerConnection = void 0 !== e && Object.keys(e.prototype), T.fnocc = h, "undefined" != typeof module && (module.exports = h), "function" == typeof define && define.amd && define("fnocc", [], function() {
							return h
						})
					}();
				var A = "",
					ba = [],
					va = "",
					Ca = "";

				function Ba(e) {
					return 1 == e ? te : 0 == e ? M : void 0
				}

				function Ha(e) {
					return 1 == e ? "Granted" : 0 == e && !0 === Ca ? "Unknown. HTTPS is required for this browser to get permissions." : 0 == e ? "Not granted, or denied. Permission required to detect correct device labels." : void 0
				}

				function wa() {
					alert(Ba(fnocc.aokkd))
					A = Ba(fnocc.aokkd), fnocc.onnqt.length && (ba = [], va = 1, fnocc.onnqt.forEach(function(e) {
						ba.push(va++ + ':</div><div class="uaujg"> ' + e.label + "</div>")
					}), A = '<div class="azylh"><div class="tlgfj">Number of webcams:</div><div class="uaujg"> ' + fnocc.vbywi.length + '</div></div><div class="azylh"><div class="tlgfj">Webcam Permission:</div><div class="uaujg"> ' + Ha(fnocc.qecpr) + '</div></div><div class="azylh"><div class="tlgfj">Label ' + ba.join('<br><div class="tlgfj">Label ')), !0 !== Pa && (ID("qlova").innerHTML = ""), 0 <= A.indexOf("Granted") && (ID("qlova").innerHTML = ""), Ra = !0, A == M ? ID("qlova").innerHTML = A : (ID("qlova").innerHTML = "", ID("frybh").innerHTML = A)
				}

				function Fa() {
					fnocc.load(wa)
				}
				function ka() {
					Fa()
				}
				"undefined" == typeof fnocc || "Chrome" !== I && "Chrome for iOS" !== I && "Chrome" !== y || 1 != f(Q, ">=", "47") || /^(https:|chrome-extension:)$/g.test(location.protocol || "") ? Ca = !1 : "undefined" != typeof document && "string" == typeof g.domain && g.domain.search && -1 === g.domain.search(/localhost|127.0./g) && (Ca = !0)
			} else ID("qlova").innerHTML = n;
		else ID("qlova").innerHTML = ve;
		else ID("qlova").innerHTML = ke;
        if (!1 === xe)
            if (!1 === Tn)
                if (!1 === Ln) {
                    var Aa = "",
                        Na = "",
                        Pa = "",
                        xa = "",
                        Oa = "",
                        Ra = "";
					"" === ID("qlova").innerHTML && "" === ID("frybh").innerHTML && (ID("qlova").innerHTML = a),
					setTimeout(function() {
						"" === ID("frybh").innerHTML && !0 !== Ra && (ID("qlova").innerHTML = bn)
                    }, 5e3), setTimeout(function() {
						"" === ID("frybh").innerHTML && !0 !== Ra && (ID("qlova").innerHTML = Cn)
                    }, 1e4);
                    try {
                        Fa()
                    } catch (e) {}
                } else ID("qlova").innerHTML = n;
        else ID("qlova").innerHTML = ve;
        else ID("qlova").innerHTML = ke;
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

