// 한줄주석
/* 멀티주석 */

/*
var btnCall = document.querySelector(".btnCall");
*/

/*
$("ul li").on("click", function(){
	// alert("You clicked!!!");
	alert(5)
});
*/

/*
자료형
문자
- 문자텍스트를 나타내는 자료형 ("따옴표로 감싸서 표기")
- 만약 변수나 숫자를 따옴표로 감싸면 강제적으로 문자형태로 자동변환됨 (자동형변환)
- 만약 변수나 숫자가 문자와 결합되면 마찬가지로 문자로 강제 형변환됨

숫자
- 정수, 실수를 나타내는 자료형

불리언
- true, false

변수
- 특정한 값을 임시로 저장해 주는 공간
var 변수명 = 저장될 값; ( = 대입 연산자 - 오른쪽 값이 먼저 연상되서 왼쪽에 대입됨)

보통 DOM을 제어할 때는 미리, 자주 쓰는 DOM을 변수에 할당한 후에 재사용
- 대소문자 구분함
- 숫자로 시작 불가, 특수문자 불가, 한글 불가 ($, _ 가능)
- 예약어 불가 js에서 (var/if/for/else/each)
*/
//문자형
console.log("test");

//숫자형
console.log(2);

//문자형으로 형변환
console.log("2"+3+4);

//변수 선언 방법
var yourName; //변수선언 : 값이 없이 공간만 생성
yourName = "홍길동"; //값 할당 : 변수공간에 값을 대입

var yourName = "홍길동" //변수 선언과 동시에 값을 할당 (초기화)

console.log("안녕하세요" + yourName + "님")


//$(선택자).eq(순서) : 순서를 이용해서 DOM탐색
//$(선택자).children("요소명") : 직계자식요소 탐색
//$(선택자).find("요소명") : 자손요소 전체 탐색
//$(선택자).parent("요소명") : 직계부모요소 탐색
//$(선택자).siblings("요소명") : 형제 요소 탐색
//$(선택자).prev() : 형제요소 중에서 이전요소
//$(선택자).next() : 형제요소 중에서 다음요소
//$(선택자).css() : 선택자에 css스타일 제어


var $li = $("ul li");

$li.eq(0).on("click",function(){
	alert("You Clicked")
});

//두번째 li에 border를 "2px solid red"
//두번째 li에 background를 hotpink주기
//두번째 li에 font-size를 24px
// $li.eq(1).css("border","2px solid red");
// $li.eq(1).css("background","hotpink");
// $li.eq(1).css("font-size","24px");


$li.eq(1).css({
	border:"2px solid red",
	backgroundColor:"hotpink",
	fontSize:24
});


// var $now_a = $(".now").children("a");
var $now_a = $(".now a");
//.now a 의 부모의 전요소의 전요소의 자식요소에 border 2px solid blue

$(".now a").parent(".now").prev("li").prev("li").children("a").css({
	border:"2px solid blue"
});

//.now a 의 부모의 부모의 자식인 li중에 다섯번째 li에 fontSize 50px

// $(".now a").parent("li").parent("ul").children("li").eq(4).css({
//   fontSize:50
// });

$now_a.parent("li").parent("ul").children("li").eq(4).css({
	fontSize:50
});


//.now a 의 부모의 형제의 형제 li에 자식인 a를 찾아서 background pink 하기

// $(".now a").parent(".now").siblings("li").children("a").css({
//   backgroundColor:"pink"
// });

$now_a.parent().siblings().children("a").css({
	background:"pink"
});
