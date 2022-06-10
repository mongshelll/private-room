/*
이벤트를 일으키는 요소 : prev, next
이벤트명 : click
이벤트 : 리스트가 1번이 보이고 있다면 4번이 보이게
prev 4-3-2-1-4
next 1-2-3-4-1

$(이동할 요소).appendTo(이동할 부모요소)
-- 이동할 요소를 타겟위치 안쪽에서 제일 뒤로 이동

$(이동할 요소).prependTo(이동할 부모요소)
-- 이동할 요소를 타겟위치 안쪽에서 제일 앞으로 이동

*/

var $slider = $("#slider");
var $list = $slider.find(".list");
var $list_li = $list.find("li");
var $prev = $slider.find(".prev");
var $next = $slider.find(".next");
var speed = 500;
var enableClick = true;

init($slider);

//다음 버튼을 클릭했을 때
$(".next").on("click", function(e){
	e.preventDefault(); //링크이동 금지

	//enableClick이 true라면
	if(enableClick){
	//next함수 실행
	next($slider);
	//enableClick을 false로 바꿔서 재클릭 금지
	enableClick = false;
	}
});

//이전 버튼을 클릭했을 때
$(".prev").on("click", function(e){
	e.preventDefault(); //링크이동 금지
	//enableClick이 true라면
	if(enableClick){
		//prev 실행
		prev($slider);
		//enableClick을 false로 바꿔서 재클릭 금지
		enableClick = false;
	}
});


//초기화 함수정의
function init(el){
	var len = el.children("ul").children("li").length;
	el.children("ul").css({
		width : 100 * len +"%"
	});
	el.children("ul").find("li").css({
		width: 100 / len +"%"
	});
	el.children("ul").find("li").last().prependTo(el.children("ul"));
	//마지막 슬라이더를 앞으로 불러와서 첫번째부터 볼 수 있음
}

//next 함수정의
function next(el){
	//ul의 marginLeft값을 원래의 -100%에서 -200%로 변경하여
	//li중 다음 li가 프레임에 보이도록 이동시킴
	//현재 css값이 marginLeft:-200%로 변경된 상태이므로
	//원래 상태로 바꾸기위한 처리필요
	el.children("ul").animate({marginLeft : "-200%"}, speed, function(){
		//ul의 marginLeft값을 -100%로 변경
		//이 상태로 그냥 둔다면 next버튼을 계속 눌렀을 때
		//다음에 보여질 li가 더 이상 없음
		el.children("ul").css({marginLeft: "-100%"});
		//ul의 제일 앞쪽에 있는 li를 뽑아서 다시 ul의 마지막으로 보내줌
		el.children("ul").find("li").first().appendTo(el.children("ul"));
		//모든 동작이 끝난 후 enableClick을 true로 바꿔서 재클릭이 가능하도록 함
		enableClick = true;
	});
}

//prev 함수정의
function prev(el){
	//prev 버튼을 클릭했을 때
	//ul의 원래 css값인 marginLeft:-100%인 상태에서 marginLeft:0으로 이동
	// -> ul의 앞부분에 있는 li가 프레임에 보이도록 이동하게 됨
	//원래 상태인 marginLeft:-100%로 다시 처리, ul li도 다시 배치 필요
	el.children("ul").animate({marginLeft : "0%"}, speed, function(){
		//css로 ul의 marginLeft값을 원위치인 -100%로 바꿈
		//이 상태로 prev버튼을 누른다면 ul li앞부분이 다 보여진 다음에는
		//더 이상 보여질 li가 없으므로 다시 배치 필요
		el.children("ul").css({marginLeft: "-100%"});
		//그래서 ul li중 마지막을 찾아서 ul의 앞부분에 보내줌
		el.children("ul").find("li").last().prependTo(el.children("ul"));
		//모든 동작이 끝난 후 enableClick을 true로 바꿔서 재클릭이 가능하도록 함
		enableClick = true;
	});
}