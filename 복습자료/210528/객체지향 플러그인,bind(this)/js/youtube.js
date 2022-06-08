
/*
	1. 생성자함수 안쪽의 this --> 앞으로 복사가될 인스턴스 지칭
	2. 생성자함수 안쪽의 이벤트문 안의 this --> 이벤트 발생대상
	3. each문 안쪽의 this --> 반복되는 대상
	4. setTimeout 안쪽의 this --> window
	3. 함수밖에서 .bind(고정할 값) --> bind()를 적용한 함수 안쪾의 this값을
		bind()메서드의 인수 값으로 고정


*/

// 2. 인수"box1"이 생성자 내부로 전달
function Box(el){
	this.init(el);
	this.bindingEvent();
}

Box.prototype.init = function(el){
	this.$box = $(el); //앞으로 복사가될 인스턴스에 DOM등록  $("#box1");
}

Box.prototype.bindingEvent = function(){
	// var inst = this;
	//앞으로 복사가 될 인스턴스 요소에 클릭 이벤트 연결
	this.$box.on("click", function(){ //this = box1, box2
		//console.log(this); // this = 이벤트를 발생시키는 대상
		//inst.changeBg(); //this.changeBg(); this 충돌로 inst에 this담아서 사용
		this.changeBg();
	}.bind(this));
	//.bind()이벤트문 밖에서 인스턴스 this값을 연결된 함수 안쪽의 this값으로 지정
	//바깥 this값은 인스턴스값
}

Box.prototype.changeBg = function(){
	this.$box.css({
		backgroundColor: "hotpink"
	});
}



// 각각의 .txt1~.txt5 클릭할때마다 각 버튼의 글자색상이 aqua로 변경되는 생성자 함수 제작
//4시~4시10분까지 .bind(this) 활용

function Txt(el){
	this.init(el);
	this.bindingEvent();
}

Txt.prototype.init = function(el){
	this.$txt = $(el);
}
Txt.prototype.bindingEvent = function(){
	this.$txt.on("click", function(){
		this.changeColor();
	}.bind(this));
}

Txt.prototype.changeColor = function(){
	this.$txt.css({
		color: "aqua"
	});
}

// function Txt(el){
//   this.$txt = $(el);

//   this.$txt.on("click", function(){
//     this.$txt.css({
//       color: "aqua"
//     });
//   }.bind(this));
// }