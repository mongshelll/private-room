/*
 * CountFunc 1.0.0
 *
 * Copyright 2020 EiLAB
 *
 * Released on: May 22, 2020
 */
	
/*----------------------- 카운팅 -----------------------

	countFunc( ID, option, function(){} )
	
	[ ID : 'class' (variable)]
	- 선택자 class

	[ option(key) : default ( object ) ]
	- endNumber : 0
	- countSpeed : 3000 ( 1000 = 1s )
	- countEasing : 'swing'
	- cipher : 3

	[ function(){} : callback ]
	- animation 종료후 콜백펑션 실행
	
-----------------------------------------------------*/
function countFunc( ID, option ){
	var $this = $(ID);
	var defaultVal = {
		endNumber : 0, // 카운팅 최종값
		countSpeed : 3000, // 카운팅 시간
		countEasing : 'swing', // 이징컨트롤
		cipher : 3 // 숫자 자릿수표기
	};
	var settings = $.extend({}, defaultVal, option);

	// 초기숫자 셋팅
	var numberSet = String( $this.text() ), 
		numberLen = numberSet.length;

	for( var i = 0 ; i < numberLen ; i++ ){				
		numberSet = numberSet.replace(",","");
	}

	var startNum = { count: numberSet },
		endNum = { count: Number( settings.endNumber ) };

	// counting
	if( startNum != endNum){
		$(startNum).animate( endNum, {
			duration : settings.countSpeed,
			easing : settings.countEasing,
			step : function(){
				nowNumber = replaceDot( startNum.count, settings.cipher );
				$this.text(nowNumber);
			},
			complete: function(){
				$this.text( replaceDot( settings.endNumber, settings.cipher ) );
			},
		});
	}else{
		return;
	};
};

// 쉼표 할당하기
function replaceDot(target, cipher){
	var numberSet = String( Math.ceil(target) ), // 타겟숫자
		numberLen = numberSet.length; // 타겟숫자 자릿수

	// init 쉼표제거 반복문
	for( var i = 0 ; i < numberLen ; i++ ){				
		numberSet = numberSet.replace(",","");
	};

	if( typeof cipher == 'undefined' || cipher == 0 ){
		return Number( numberSet ) // 최종숫자 반환

	}else{
		numberLen = numberSet.length;

		var numberArray = [],
			dotLen = parseInt( numberLen / cipher ), // 분배되야할 쉼표갯수
			dotLenRest = parseInt( numberLen % cipher);			

		if( ( numberLen / cipher ) == 0 ) dotLen = dotLen - 1;

		// 자릿수 쪼개기 반복문
		for( var j = 1; j <= dotLen; j++){
			numberArray.push( numberSet.substr( numberLen - ( cipher * j ), cipher ) );			
		}

		if( dotLenRest !== 0 ) numberArray.push( numberSet.substr( 0, dotLenRest ) );	

		var numberArrayLen = numberArray.length,
			numberSet = numberArray[numberArrayLen - 1];

		// 쉼표할당 반복문
		for( var k = numberArrayLen - 2; k >=0; k--){
			numberSet += ',' + numberArray[k];
		}
		
		return numberSet // 최종숫자 반환
	};
};
