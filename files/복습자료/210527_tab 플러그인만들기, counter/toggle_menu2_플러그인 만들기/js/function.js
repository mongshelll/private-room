/*
1. dt를 클릭했을 때 해당 dd를 보여줌
2. 해당하지 않는 dd는 숨김처리
3. 클릭한 dt는 활성화, 나머지 비활성화
*/


function init(selector){
	$frame = $(selector);
	$btns = $frame.find("dt");
	$boxs = $frame.find("dd");
}

function bindingEvent(){
	$btns.on("click", function(e){
		e.preventDefault();

		activation(this);
	});
}


function activation(self){
	var isOn = $(self).hasClass("on");

	$btns.removeClass("on");
	$boxs.slideUp();

	if(isOn){
		$(self).removeClass("on");
		$(self).next("dd").slideUp();
	}else{
		$(self).addClass("on");
		$(self).next("dd").slideDown();
	}
}