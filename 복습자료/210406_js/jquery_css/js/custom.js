/*
선택자.css()
- 선택한 DOM의 css를 변경가능
.css({변경할 내용})

선택한 DOM의 css 속성값 확인가능.
.css("속성명")

js로 css값을 변경 할 때 주의사항
- js는 무조건 DOM(html파일)만 제어가능
- 결국 .css() method로 변경하는 스타일은 style.css를 수정하는 것이 아닌 태그 자체에 인라인 스타일로 삽입하여 강제로 변경하는 방식
*/
/*
$(".box1").css({
	"width" : "600px",
	"height" : "500px",
	"border-radius" : "10px"
});

$(".box1").css({
	width : "50%",
	height : 500,
	borderRadius : 101
});
*/
/*
var result = $(".box1").css("width");
console.log(result);
*/

var result = $(".box1").width();
var result = $(".box1").outerWidth();
// console.log(result);
var resultH = $(".box1").height();
var resultH = $(".box1").outerHeight();
// console.log(resultH);

//.width(), .height() - 실제 width, height 속성으로 적용된 값만 반환
//.outerWidth(), .outerHeight() - padding, border값 까지 포함한 전체값 반환

//미션1
// 1. 브라우저를 리사이즈 할 때 마다 현재 브라우저의 너비값을 구하기
// 2. 만약 브라우저 폭이 540px 보다 작아지면 body의 배경색을 orange로 적용
// 3. 만약 브라우저 폭이 540px 보다 같거나 크고, 1180px보다 작으면 배경색을 pink로 적용
// 4. 만약 1180px보다 같거나 크면 배경색을 violet으로 적용

//$(window) - 브라우저
//$("body") - 문서

/*
1. 선택자 파악 : $(window)
2. 선택자 연결한 이벤트 : "resize"
3. 변경 할 타겟 대상 : $("body")
4. 변경 할 속성 : width, background-color
*/

$(window).on("resize", function(){
	var wid = $(window).width();
	var $box_wid = $(".box1").width();
	console.log(wid);
	// console.log($box_wid);
	if(wid<540){
		$("body").css({
			backgroundColor : "orange"
		})
		$(".box1").css({
			width: "100%"
		})
	}
	else if(wid>=540 && wid<1180){
		$("body").css({
			backgroundColor : "pink"
		})
		$(".box1").css({
			width: "100%"
		})
	}
	else if(wid>=1180){
		$("body").css({
			backgroundColor : "violet"
		})
		$(".box1").css({
			width: 1180
		})
	}
});









