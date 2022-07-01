// var pos0 = $("#box1").offset().top;
// var pos1 = $("#box2").offset().top;
// var pos2 = $("#box3").offset().top;
// var pos3 = $("#box4").offset().top;

var $btns = $("#navi li");
var $boxs = $("section");
var speed = 1000;
var posArr = [];

setPos();

$(window).on("scroll", function(){
	var scroll = $(this).scrollTop(); //내가 스크롤 한 거리

	activation(scroll);
});


$btns.children("a").on("click", function(e){
	e.preventDefault();
	moveScroll(this);
});

function moveScroll(el){
	var target = $(el).attr("href");
	var targetPos = $(target).offset().top;
	$("html, body").animate({
		scrollTop: targetPos
	}, 500);
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
	for(var i=0; i<$boxs.length; i++){
		posArr.push($boxs.eq(i).offset().top);
	}
	console.log(posArr);
}