/*
1. dt를 클릭했을 때 해당 dd를 보여줌
2. 해당하지 않는 dd는 숨김처리
3. 클릭한 dt는 활성화, 나머지 비활성화
*/


function Toggle(selector) {
	this.init(selector);
	this.bindingEvent();
}

Toggle.prototype.init = function(selector){
	this.$frame = $(selector);
	this.$btns = this.$frame.find("dt");
	this.$boxs = this.$frame.find("dd");
}


Toggle.prototype.bindingEvent = function(){
	var self = this;
	self.$btns.on("click", function(e){
		e.preventDefault();

		self.activation(this);
	});
}

Toggle.prototype.activation = function(self){
	var isOn = $(self).hasClass("on");

	this.$btns.removeClass("on");
	this.$boxs.slideUp();

	if(isOn){
		$(self).removeClass("on");
		$(self).next("dd").slideUp();
		return;
	}
		$(self).addClass("on");
		$(self).next("dd").slideDown();
}