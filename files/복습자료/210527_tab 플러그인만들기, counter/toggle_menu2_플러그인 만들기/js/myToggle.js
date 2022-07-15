/*
1. dt를 클릭했을 때 해당 dd를 보여줌
2. 해당하지 않는 dd는 숨김처리
3. 클릭한 dt는 활성화, 나머지 비활성화
*/

(function($){
	$.defaults = {
		btn : "dt",
		boxs : "dd",
		active : "on",
		speed : 500
	}

	$.fn.myToggle = function(opt){
		opt = $.extend({}, $.defaults, opt)
		new Toggle(this, opt);
		return this;
	}

	function Toggle(selector, opt) {
		this.init(selector, opt);
		this.bindingEvent();
	}

	Toggle.prototype.init = function(selector, opt){
		this.$frame = selector;
		this.$btns = this.$frame.find(opt.btn);
		this.$boxs = this.$frame.find(opt.boxs);
		this.active = opt.active;
		this.speed = opt.speed;
	}


	Toggle.prototype.bindingEvent = function(){
		var self = this;
		self.$btns.on("click", function(e){
			e.preventDefault();

			self.activation(this);
		});
	}

	Toggle.prototype.activation = function(self){
		var isOn = $(self).hasClass(this.active);

		this.$btns.removeClass(this.active);
		this.$boxs.slideUp(this.speed);

		if(isOn){
			this.$btns.removeClass(this.active);
			this.$boxs.slideUp(this.speed);
			return;
		}
			$(self).addClass(this.active);
			$(self).next().slideDown(this.speed);
	}
})(jQuery)