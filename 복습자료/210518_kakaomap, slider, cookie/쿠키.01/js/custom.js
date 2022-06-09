/*
쿠키
name = value; path=/; expires = "쿠키가 사라질 시간";

쿠키확인 cookie
document.cookie
document.cookie.indexOf("찾을 쿠키문자");  없을경우 -1 반환

쿠키생성/등록
document.cookie = {쿠키이름} +"="+ {쿠키값}+"; path=/; expires="+{사라질 시간};


*/

$("#create").on("click", function(){
	setCookie("today", "done", 1);
});

$("#check").on("click", function(){
	console.log(document.cookie);
})

$("#delete").on("click", function(){
	setCookie("today", "done", 0);
})

function setCookie(cookieName, cookieValue, time){
	var today = new Date();
	var min = today.getMinutes();
	today.setMinutes(min + time)

	var duedate = today.toGMTString();
	document.cookie = cookieName +"="+ cookieValue+"; path=/; expires ="+ duedate;
}