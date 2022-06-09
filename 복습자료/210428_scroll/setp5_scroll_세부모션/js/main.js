var $btns = $("#navi li");
var $boxs = $("section");
var speed = 1000;
var posArr = [];
var enable = false;
var baseline = -200; //200px 미리 적용

//처음 로딩시 해당박스의 세로 위치값을 구하는 함수 호출
setPos();

console.log(posArr);

//브라우저 리사이즈시 다시 세로 위치값 갱신
//초기화 하지않으면 이전 사이즈 세로값으로 기준으로 하기때문에
//정상적인 작동하지 않음
//리사이즈시 새로 갱신하지 않으면 스크롤모션이나 버튼클릭 이벤트에서 (activation, moveScroll함수등에서) 새로 갱신된 배열의 값을 사용하지 못하므로 오류생김
$(window).on("resize", setPos);

//스크롤시 해당버튼 활성화
$(window).on("scroll", function(){
	var scroll = $(this).scrollTop()//내가 스크롤 한 거리
	activation(scroll);
});

//버튼 클릭시 해당박스 위치로 자동으로 이동해주는 함수 호출
$btns.on("click", function(e){
	e.preventDefault();

	var i = $(this).index();
	moveScroll(i);
});

//마우스휠을 위, 아래로 움직였을 때
$boxs.on("mousewheel", function(e){
	console.log(e.originalEvent.deltaY);
	//-100은 마우스휠을 올렸을 때
	//100은 마우스휠을 내렸을 때
	e.preventDefault();

	if(e.originalEvent.deltaY < 0){ //마우스 휠을 올린다면
		if($(this).index != 0){//첫번째 박스가 아니라면
			var i = $(this).index();
			moveScroll(i - 1); // i - 1 은 해당박스 전에 있는 박스의 세로 위치값
		}//첫번째 박스에서는 올라갈 필요없음
			//첫번째 박스 = 0
			//마지막 박스 = 변동가능 -> $boxs.length 이용
			//length = 4, 이용 할 값은 index(0부터 시작) 그러므로 length에서 -1을 함
	}else{//마우스 휠을 내린다면
		if($(this).index != $boxs.length - 1){
			var i = $(this).index();
			moveScroll(i + 1); // i + 1 은 해당박스 다음에 있는 박스의 세로 위치값
		}
	}
});


//버튼 클릭이나 박스 스크롤시 해당 버튼이나 박스의 순번을 인수로 받아서 배열에 담긴
//해당 요소의 세로 위치값으로 이동하는 함수 정의
function moveScroll(index){
	$("html, body").stop().animate({ //.stop() 큐가 쌓이면 이전거 무시 마지막만 실행
		scrollTop: posArr[index]
	}, speed / 2);
}

//현재 스크롤 위치값을 인수로 받아서 스크롤값과 박스의 위치를 비교해서
//해당하는 버튼만 활성화 하는 함수정의
function activation(scroll){
	for(var i=0; i<$boxs.length; i++){
		if(scroll >= posArr[i] + baseline){ //baseline 추가해서 미리 적용하기
			$btns.children("a").removeClass("on");
			$btns.eq(i).children("a").addClass("on");

			//세부모션 이벤트 관련
			//해당버튼이 활성화 될 때 해당 박스에도 on클래스를 붙여서
			//해당박스안의 모션이 일어날 수 있도록 함
			//만약 한번 보여준 모션을 다시 없애지 않고 유지하려고 한다면
			//$boxs.removeClass("on")을 삭제
			$boxs.removeClass("on");
			$boxs.eq(i).addClass("on");
		}
	}
}

//posArr 배열에 각 박스의 세로 위치값 저장 함수 정의
function setPos(){
	posArr=[]; // 초기화값, 리사이즈시 해당 배열을 비워 새로운 값 4개만 받게 함
	for(var i = 0; i < $boxs.length; i++){
		posArr.push($boxs.eq(i).offset().top);
	}
	// console.log(posArr);
}