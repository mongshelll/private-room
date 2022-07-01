/*
	constructor (생성자함수), prototype (프로토타입)을 활용한 객체지향 프로그래밍

	생성자함수 (통칭 ES5버전에서의 클래스)
	- 어떤 반복적인 대량의 결과물을 뽑아내기 위한 시스템적인 틀 (붕어빵을 찍어내기 위한 붕어빵 틀)

	인스턴스 (instance), 객체
	- 생성자함수를 통해서 복사된 실제적인 결과물 혹은 복사본 (붕어빵틀을 통해서 찍어낸 개별 붕어빵들)

	프로토타입
	- 생성자함수를 만들면 자동으로 생성되는 공통의 저장공간
	- 동일한 생성자함수를 통해 복사가 된 인스턴스들은 동일한 프로토타입을 공유한다.
	- 보통 자주쓰는 함수 (메서드)들을 프로토타입이라는 공통의 저장공간에 등록하여 모든 인스턴스들이 해당 메서드를 공유하도록 함

생성자 함수로 인스턴스 생성하는 법
1. new 연산자를 이용하여 인스턴스를 생성하는 함수, 무조건 제일 먼저 실행될 함수(생성자함수 )
->호출될 때 받은 인자값을 인스턴스로 전달해줌 (this를 이용해서 전달 )
->생성자함수 전용의 공간인 prototype을 생성 (모든 인스턴스는 prototype에 저장된 값을 공유 )
->공통으로 쓰이게 될 값이나 함수(메소드)들은 무조건 prototype에 저장시킴
*/

/*
var student1 = {
	name: "홍길동",
	age: 18,
	address: "서울",
	isMale : true,
	info: function(){
		console.log(this.name+"은 "+ this.age+"세 " + this.address + "에 사는중");
	}
}

console.log(student1);
console.log(student1.info());


function Student(name, age, address, isMale){
	this.name = name,
	this.age = age,
	this.address = address,
	this.isMale = isMale,
	this.info = function(){

	}
}

var today = new Date();

var student1 = new Student("홍길동", 18, "서울", true);
var student2 = new Student("이준성", 18, "대전", true);
var student3 = new Student("구영희", 18, "제주", false);
console.log(student1);
console.log(student2);
console.log(student3);
*/

/*
//절차지향형

document.getElementById("title1").style.color = "blue";
document.getElementById("title1").style.fontSize = "50px";

document.getElementById("title2").style.color = "red";
document.getElementById("title2").style.fontSize = "100px";
*/

/*
//일반 함수형
changeColor("title1", "blue");
changeSize("title1", "50px");
changeColor("title2", "red");
changeSize("title2", "100px");
function changeColor(el, color){
	document.getElementById(el).style.color = color;
}
function changeSize(el, size){
	document.getElementById(el).style.fontSize = size;
}
*/

// function FontStyle1(el, color, size){
// 	this.el = el;
// 	this.changeColor(color);
// 	this.changeSize(size);
// }

// FontStyle1.prototype.changeColor = function (color) {
// 	document.getElementById(this.el).style.color = color;
// }
// FontStyle1.prototype.changeSize = function (size) {
// 	document.getElementById(this.el).style.fontSize = size;
// }

// var test_11 = new FontStyle1("test1", "red", "18px");
// var test_22 = new FontStyle1("test2", "yellow", "24px");



//생성자 함수
function FontStyle(el, color, size) {
	this.el = el;

	this.changeColor(color);
	this.changeSize(size);
}

FontStyle.prototype.changeColor = function (color) {
	document.getElementById(this.el).style.color = color;
}
FontStyle.prototype.changeSize = function (size) {
	document.getElementById(this.el).style.fontSize = size;
}

var el1 = new FontStyle("title1", "blue", "50px");
var el2 = new FontStyle("title2", "red", "100px");


function Test(el) {
	this.selector = el;
	console.log(this);
}

Test.prototype.msg = function (txt) {
	document.querySelector(this.selector).innerText = txt;
}

var element1 = new Test("#title1");
var element2 = new Test("#title2");
element1.msg("Hello");
element2.msg("World");

//미션
//인스턴스의 너비, 높이, 배경색을 변경하는 메서드를
//BoxStyle 이라는 생성자 함수에 메서드로 등록해서 적용해 보세요.

function BoxStyle(el) {
	this.el = el;
}

BoxStyle.prototype.changeWid = function (wid) {
	$(this.el).css({
		width: wid
	});
	// document.querySelector(this.el).style.width = wid;
}
BoxStyle.prototype.changeHt = function (ht) {
	$(this.el).css({
		height: ht
	});
	// document.querySelector(this.el).style.height = ht;
}
BoxStyle.prototype.changeBg = function (bg) {
	$(this.el).css({
		backgroundColor: bg
	});
	// document.querySelector(this.el).style.backgroundColor = bg;
}

var box1 = new BoxStyle("#box1");

box1.changeWid("100px");
box1.changeHt("100px");
box1.changeBg("hotpink");