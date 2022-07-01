/*
선택자 .attr() 선택한 DOM의 속성(Attribute)을 제어

선택자 .attr({"변경항 속성명":"송성값"})
- 해당 속성명에 행당하는 값 변경

선택자.attr("알아낼 속성명")
- 해당 속성명에 해당하는 값을 리턴

선택자.text()
- 선택자의 text값을 가져오기

선택자.text("바꿀 text")
- 선택자의 text값을 변경하는 method

*/

//미션1 링크를 https://nate.com 으로 변경
// 타겟은 _self로 변경
// title 네이트로 이동 으로 변경

// 1 요소
// 2 이벤트
// 3 바꿀 속성

$("#test").attr({
    href : "https://nate.com",
    target : "_self",
    title : "네이트로 이동"
});
$("#test").text("네이트");

//a태그의 속성값 알아보기
var url = $("#test").attr("href");
console.log(url);

//.btns li 클릭 할 때 a 태그 링크이동 막기
//해당요소의 자식인 a 태그의 href값을 구해서 변수에 저장
//.showBox의 자식인 img태그의 src값을 위에서 찾은 변수로 변경

//버튼 클릭시
$(".btns li").on("click", function(e){
    e.preventDefault(); //기본 링크이동 막기

    //변수 imgSrc에 내가 클릭한 버튼의 자식인 a의 href값을 저장
    var imgSrc = $(this).children("a").attr("href");

    //.showBox img의 src값을 위의 변수값으로 바꾸기
    $(".showBox img").attr({
        src: imgSrc
    });
});









