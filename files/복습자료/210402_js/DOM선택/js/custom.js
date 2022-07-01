/*

jQuery DOM선택 내장함수

.eq(순번) : 순번을 활용한 DOM탐색
.chldren() : 직계자식요소 탐색
.find() : 자손요소까지 탐색
.parent() : 직계부모요소 탐색
.siblings() : 형제요소 탐색
.next() : 형제요소중에 바로 다음요소 탐색
.prev() : 형제요소중에 바로 이전요소 탐색
.first() : 형제요소중에 가장 처음요소 탐색
.last() : 형제요소중에 가장 마지막요소 탐색

*/

// $(".btns li").on("click", function(){
//   $(".btns li a").css({color:""});
//   $(this).children("a").css({color:"red"});
// });

// $(".btns li a").on("click", function(){
//   $(".btns li a").css({color:""});
//   $(this).css({color:"red"});
// });

let btn_li_a = $(".btns li a");

//선택자를 .btn li a로 잡고 순서값을 활용해서 클릭한 요소의 a태그 활성화
btn_li_a.on("click", function(){
	let i = $(this).parent("li").index(); //.index 순서구하기 메소드
	console.log(i);

	btn_li_a.css({"color":""});
	btn_li_a.parent().eq(i).children("a").css({color:"red"});
});

//DOM선택 - id, class 태그 선택자
$("#wrap").css({border:"1px solid red"});
$(".item").css({border:"1px solid blue"});
$("ul li").css({border:"1px solid pink"});

//이벤트 연결하기
/*
$(요소).on("이벤트", function(){
	//실행코드
});
*/

let item = $(".item");

$(".item").on("click", function(){
	//let i = $(this).index();
	// console.log(i);
	// $(".item").css({background:""});
	// $(this).css({background:"lightblue"});

	let txt = $(this).text();
	let color = "pink";

	if(!txt.match(color)){
		$(this).css({backgroundColor: "pink"});
		$(this).text("pink");
	}else{
		$(this).css({backgroundColor: "lightblue"});
		$(this).text("lightblue");
	}
});