$(document).ready(function () {
	var $gnb_li = $("#gnb>li");

	$gnb_li.on("mouseenter ", function () {
		$(this).find(".sub").show();
	});

	$gnb_li.on("mouseleave ", function () {
		$(this).find(".sub").hide();
	});

	//gnb_li의 갯수만큼 반복을 돌면서 이벤트 연결
	$gnb_li.each(function (index) {
		//gnb_li의 (index)번째 요소에 focusin 이벤트 연결
		$gnb_li.eq(index).find("a").first().on("focusin", function () {
			$gnb_li.eq(index).find(".sub").show();
		});

		//gnb_li의 (index)번째 요소에 focusout 이벤트 연결
		$gnb_li.eq(index).find("a").last().on("focusout", function () {
			$gnb_li.eq(index).find(".sub").hide();
		});
	});
});