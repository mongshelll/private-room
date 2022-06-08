/*
DOM caching

처음 브라우저 로딩시 자주 사용하는 DOM을 미리 전역변수에 할당
: 한번 변수에 할단된 DOM은 호출할 때마다 매번 DOM을 찾는 게 아닌
: 할당된 값을 재활용
*/


let btn_li_a = $(".btns li a");

//선택자를 .btn li a로 잡고 순서값을 활용해서 클릭한 요소의 a태그 활성화
btn_li_a.on("click", function(){
	let i = $(this).parent("li").index(); //.index 순서구하기 메소드
	console.log(i);

	btn_li_a.css({"color":""});  //전체 li a 태그 색상 초기화
	btn_li_a.parent().eq(i).children("a").css({color:"red"});
});


