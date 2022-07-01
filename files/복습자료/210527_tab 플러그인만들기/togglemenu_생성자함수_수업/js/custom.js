init("#wrap");
bindingEvent();


function init(selector){
	frame = $(selector);
	btns = frame.find("dt");
	boxs = frame.find("dd");
}

function bindingEvent(){
	btns.on("click",function(e){
		e.preventDefault();

		activation(this);
	});
}

function activation(self){
	var isOn = $(self).hasClass("on");
	btns.removeClass("on");
	boxs.slideUp();

	if(isOn){
		$(self).removeClass("on");
		$(self).next("dd").slideUp();
		return;
	}
	$(self).addClass("on");
	$(self).next().slideDown();
}