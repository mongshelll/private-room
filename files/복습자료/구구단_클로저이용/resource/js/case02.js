

$(document).on("click", ".prev_btn", function(){
	perv();
});

$(document).on("click", ".next_btn", function(){
	next();

	if($(this).text("시작")){
		$(this).text("다음");
	}
});

var num = 0;

function perv() {
	if(num <= 1) {
		return;
	}
	num--;
	creatList(num);
}

function next() {
	if(num >= 9) {
		return;
	}
	num++;
	creatList(num);
}

function creatList(num) {
	var $resultWrap = $(".result_wrap");
	var $list = $("<ul>");
	var $contentTile = $(".content_title p");
	$resultWrap.empty();
	$resultWrap.append($list);

	for(var i = 1; i <= 9; i++ ) {
		$contentTile.text( num +"단")
		$list.append(
			$("<li>").text(num +" * "+ i + " = " + num * i)
		);
	}

}