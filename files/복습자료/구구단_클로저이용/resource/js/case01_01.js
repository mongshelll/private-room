

$(document).on("click", ".btn", function(){
	var el = $(this).prev("input[type=text]");

	//creatList(횟수, 입력받는 input)
	creatList(9, el);
});



function creatList(n, el) {
	var target =  el.val();
	var $resultWrap = el.closest(".gugudan");
	var $result = $resultWrap.find(".result_wrap");
	var $list = $("<ul>");
	var viewConut = n;
	// var targetStr = target.split("단");

	// $.isNumeric() 숫자 판별 함수
	if (target.length == 0) {
		alert("숫자를 입력해주세요.");
		$result.empty();
		target = el.val('');
		return;
	} else if (!$.isNumeric(target)) {
		alert("숫자만 입력해주세요.");
		$result.empty();
		target = el.val('');
		return;
	}

	$result.empty();
	$result.append($list);

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
	target = el.val('');
	// console.log($.isNumeric(target));
}