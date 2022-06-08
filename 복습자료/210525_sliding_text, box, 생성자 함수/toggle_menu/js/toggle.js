//생성자 함수
function Toggle(selector){
	this.init(selector);
	this.bindingEvent();
}

Toggle.prototype.init = function(selector){
	this.frame = $(selector);
	this.btns = this.frame.find("dt");
	this.boxs = this.frame.find("dd");
}

Toggle.prototype.bindingEvent = function(){
	var self = this //인스턴스 this 충돌방지 위해서
	self.btns.on("click", function(e){
		e.preventDefault();
		self.activation(this);
	});
}

Toggle.prototype.activation = function(self){

	var isOn = $(self).hasClass("on");
	this.btns.removeClass("on");
	this.boxs.slideUp();

	if(isOn){
		$(self).removeClass("on");
		$(self).next("dd").slideUp();
		return;
	}
	$(self).addClass("on");
	$(self).next().slideDown();
}



/*
일반 함수형 코드를 객체 지향형 코드로 변환 할 때

1. 생성자 함수 정의
2. new 키워드로 인스턴스 복사
3. 인스턴스 복사시 새성자 함수의 인수로 옵션값 전달
4. 생성자 함수 안쪽에서 this.init(), this.bindingEvent() 호출
5. 모든 함수를 prototype에 등록
6. 함수 안쪽의 전역변수를 this.으로 인스턴스에 전달
7. bindingEvent() 안쪽의 이벤트문에서의 this값과 인스턴스 this의 충돌을 피하기 위해서
		지역변수 self에 인스턴스 this를 옮겨 담음


*/