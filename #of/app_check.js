
$(document).ready(function() {

	//기기값 체크
	const parameter = BridgeUtil.getParam();
	console.log('parameter : '+parameter);

	$('#bridgeBtn').click(function(){
		BridgeUtil.checkInstalled();
	});

	console.log(BridgeUtil.mobileCheck);
});

const BridgeUtil = function() {
	var isVisible = true;//딥링크 이동여부
	const iosAppstoreUrl = "https://apps.apple.com/kr/app/mymo-한화저축은행/id1628712855";			//애플 앱스토어 마켓 주소
	const androidStoreUrl = "https://play.google.com/store/apps/details?id=com.hanwhasbank.flab";		//안드로이드 플레이스토어 마켓 주소
	const schemeUrl = 'hanwhasbank://redirect';	//딥링크

	//화면변경 체크 인터벌
	const handler = () => {
		if(document.visibilityState == 'visible'){
			isVisible = true;
		}else{
			isVisible = false;
		}
		console.log('isVisible : '+isVisible);
	}
	document.addEventListener('visibilitychange',handler,{});

	//설치체크
	const _checkInstalled = function(){
		var start, end, elapsed;
		var appStoreTimeout = setTimeout(function(){
			if(isVisible){
				_doAppMarketLink();
			}
		},3000);
		start = new Date().getTime();
		
		_doAppRun(window.location.search.substring(1));
		
		setTimeout(function(){
			end=new Date().getTime();
			elapsed = end-start;
			console.log('elapsed : '+elapsed);
			if(elapsed < 2000 && isVisible == false){
				LOG.debug('cancel go appstore');
				clearTimeout(appStoreTimeout);
			}
		},500);
	}

	//앱실행
	const _doAppRun = function(param){
		var goUrl=schemeUrl+"?"+param;

		console.log('goUrl : '+goUrl);

		try{
			location.href=goUrl;
		}catch(e){
			alert(e);
		}
	}

	//마켓이동
	const _doAppMarketLink = function(){
		window.location=IS_IPHONE?iosAppstoreUrl:androidStoreUrl;
	}

	//기기식별
	const _mobileCheck = function(){
		var os;
		var mobile = (/iphone|ipad|ipod|mini|android/i.test(navigator.userAgent.toLowerCase()));
		if (mobile) {
			var userAgent = navigator.userAgent.toLowerCase();
			if (userAgent.search("android") > -1) {
				console.log(os);
				return os = "android";
			} else if ((userAgent.search("iphone") > -1) || (userAgent.search("ipod") > -1) || (userAgent.search("ipad") > -1)) {
				console.log(os);
				return os = "ios";
			} else {
				console.log(os);
				return os = "other";
			}
		} else {
			console.log(os);
			return os = "pc";
		}
	}

	const _getParam = function(){
		var splitArr = location.href.split('?');
		if(splitArr.length < 2){
			return '';
		}else{
			return splitArr[1];
		}
	}
	return { 
		checkInstalled			:	_checkInstalled,	//
		doAppRun				:	_doAppRun,	//
		doAppMarketLink			:	_doAppMarketLink,	//
		mobileCheck				:	_mobileCheck,	//
		getParam				:	_getParam,	//
	};
}();
