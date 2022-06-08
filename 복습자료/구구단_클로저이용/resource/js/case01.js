
//엔터키 사용 (구글에서 keycode.info 들어가서 키 번호 확인하기)
$(window).on("keypress", function (e) {
	if (e.keyCode === 13) {
		creatList();
	}
});

$(document).on("click", ".btn", function(){
	creatList(9);
});



function creatList(n) {
	var target =  $(".input_wrap input").val();
	var $resultWrap = $(".result_wrap");
	var $list = $("<ul>");
	var viewConut = n;
	// var targetStr = target.split("단");

	//$.isNumeric() 숫자 판별 함수
	if (target.length == 0) {
		alert("숫자를 입력해주세요.");
		$resultWrap.empty();
		target = $(".input_wrap input").val('');
		return;
	} else if (!$.isNumeric(target)) {
		alert("숫자만 입력해주세요.");
		$resultWrap.empty();
		target = $(".input_wrap input").val('');
		return;
	}

	$resultWrap.empty();
	$resultWrap.append($list);

	for(var i = 1; i <= viewConut; i++ ) {
		$list.append(
			// $("<li class='item'>").text(targetStr[0] +" * " + i +" = "+ targetStr[0] * i)
			$("<li>").text(target +" * " + i +" = "+ target * i)

			//비동기버튼 test
			// $("<li>").text(target +" * " + i +" = "+ target * i).append(
			//     $("<button type='button' class='btn'>").text("text btn")
			// )
		);
	}
	// console.log($.isNumeric(target));
	target = $(".input_wrap input").val('');
	// console.log($.isNumeric(target));
}