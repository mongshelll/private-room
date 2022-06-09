/*
쿠키
name = value; path=/; expires = "쿠키가 사라질 시간";

쿠키확인 cookie
document.cookie
document.cookie.indexOf("찾을 쿠키문자");  없을경우 -1 반환

쿠키생성/등록
document.cookie = {쿠키이름} +"="+ {쿠키값}+"; path=/; expires="+{사라질 시간};
*/

var isCookie = document.cookie.indexOf("today=done");

createPop();

//쿠키가 없다면
if(isCookie == -1){
	$("#pop").show();
}else{
	$("#pop").hide();
};

$("body").on("click", "#pop .close", function(e){
	e.preventDefault();

	var isChecked = $(this).prev().find("input[type=checkbox]").is(":checked");
	// var id_name = $(this).parent().attr("id");

	// if(isChecked) setCookie(id_name, "done", 10);
	if(isChecked) setCookie("today", "done", 10);

	$(this).parent().fadeOut();
});

$("#create").on("click", function(){
	setCookie("today", "done", 1);
});

$("#check").on("click", function(){
	console.log(document.cookie);
});

$("#delete").on("click", function(){
	setCookie("today", "done", 0);
});

function setCookie(cookieName, cookieValue, time){
	var today = new Date();
	var min = today.getMinutes();
	today.setMinutes(min + time)

	var duedate = today.toGMTString();
	document.cookie = cookieName +"="+ cookieValue+"; path=/; expires ="+ duedate;
}



function createPop(){
	$("body")
	.append(
		$("<aside id='pop'>")
		.append(
			$("<div class='content'>"),
			$("<div class='wrap'>")
			.append(
				$("<input type='checkbox' id='ck'>"),
				$("<label for='ck'>").text("오늘하루 그만 보기")
			),
			$("<a href='#'>").addClass("close").text("Close")
		).fadeIn()
	)
}