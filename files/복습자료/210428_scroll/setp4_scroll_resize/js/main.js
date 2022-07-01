var $btns = $("#navi li");
var $boxs = $("section");
var speed = 1000;
var posArr = [];
var enable = false;

//처음 로딩시 해당박스의 세로 위치값을 구하는 함수 호출
setPos();

//브라우저 리사이즈시 다시 세로 위치값 갱신
$(window).on("resize", setPos);

//스크롤시 해당버튼 활성화
$(window).on("scroll", function(){
	var scroll = $(this).scrollTop() + 300//내가 스크롤 한 거리
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
	// console.log(e.originalEvent.deltaY);
	//-100은 마우스휠을 올렸을 때
	//100은 마우스휠을 내렸을 때
	e.preventDefault();

	if(e.originalEvent.deltaY < 0){ //마우스 휠을 올린다면
		if($(this).index != 0){//첫번째 박스가 아니라면
			var i = $(this).index();
			moveScroll(i - 1);
		}//첫번째 박스에서는 올라갈 필요없음
	}else{//마우스 휠을 내린다면
		if($(this).index != $boxs.length - 1){
			var i = $(this).index();
			moveScroll(i + 1);
		}
	}
});


//버튼 클릭이나 박스 스크롤시 해당 버튼이나 박스의 순번을 인수로 받아서 배열에 담긴
//해당 요소의 세로 위치값으로 이동하는 함수 정의
function moveScroll(index){
	$("html, body").animate({
		scrollTop: posArr[index]
	}, speed / 2);
}

//현재 스크롤 위치값을 인수로 받아서 스크롤값과 박스의 위치를 비교해서
//해당하는 버튼만 활성화 하는 함수정의
function activation(scroll){

	for(var i=0; i<$boxs.length; i++){
		if(scroll >= posArr[i]){
			$btns.children("a").removeClass("on");
			$btns.eq(i).children("a").addClass("on");
		}
	}
}

//posArr 배열에 각 박스의 세로 위치값 저장 함수
function setPos(){
	for(var i = 0; i < $boxs.length; i++){
		posArr.push($boxs.eq(i).offset().top);
	}
	// console.log(posArr);
}