/*
플러그인 만들기

1. 즉시 실행함수로 생성자 함수코드 모두를 감싸준다.
2. 플러그인 코드를 생성하고 생성자 함수의 인스턴스를 생성
3-1. index에서 플러그인 호출구문 작성하고 선택자를 넣는다.
3-2. 플러스인 코드에서 this로 매칭
4. 생성자 함수에서 selector부분을 $("#tab1")에 매칭해서 수정
	- $(selector) ㅡ> selector

5. option 추가하기 위해서 $.default로 옵션만들고 플러스인 안에서 $.extend로 옵션 합치기
6. 파라미터에 opt추가하고, 생성자 함수에도 option 파라미터 추가
*/



(function($){ //1. jQuery를 $로 치환한다고 선언

	//5. 옵션
	$.defaults = {
		active_class : "active"
	}

	//2. 플러그인 코드
	$.fn.myTab = function(opt){ //$.fn : 플러그인 생성 코드

		//5. 옵션 객체 합치기
		option = $.extend({}, $.defaults, opt);

		new Tab(this, option); //3-2. new 인스턴스 생성

		return this;
	}

	//6. 파라미터에 option 추가
	function Tab(selector, option){
		this.init(selector, option);
		this.bindingEvent();
	}


	//4. $(selector) ㅡ> selector $($("#tab1")) -> $("#tab1")
	//6. option 추가
	Tab.prototype.init = function(selector, option){
		this.opt = option; //6. option 추가
		this.$frame = selector;
		this.$btns = this.$frame.find("ul>li");
		this.$boxs = this.$frame.find("div>div");
	}

	Tab.prototype.bindingEvent = function(){
		var inst = this;  //인스턴스의 this

		inst.$btns.on("click", function(e){
			e.preventDefault();
			var i = $(this).index();
			inst.activation(i);
		});
	}

	//"on"을 this.opt.active_class로 치환
	Tab.prototype.activation = function(index){
		this.$btns.removeClass(this.opt.active_class);
		this.$boxs.removeClass(this.opt.active_class);
		this.$btns.eq(index).addClass(this.opt.active_class);
		this.$boxs.eq(index).addClass(this.opt.active_class);
	}
})(jQuery)