/*
	호출 타이밍 테스트
*/
/* 함수 */
function fn02() {
	console.log(3, 3, 3, '!! defer fn02 스크립트 내부함수, 마크업 헤드 2번');
}


/* 실행 */
fn02();

$(document).ready(function(){
	console.log(5, 7, 10, '!! defer $(document).ready(function(){}) : dom생성시');
})

$(window).on('load', function(){
	console.log(9, 9, 7, '!! defer $(window).on("load",function(){}) : 이미지포함 요소들 로드시');
})

// window.onload는 뒤에 선언된 하나만 실행 됨 중복시 앞에껀 실행 안됨
// window.onload = function(){
// 	console.log('6 !! defer window.onload = function(){} : 이미지포함 요소들 로드시');
// }

document.addEventListener('DOMContentLoaded', function(){
	console.log(7, 5, 5, '!! defer document.addEventListener("DOMContentLoaded", function(){}) : dom생성시');
})
