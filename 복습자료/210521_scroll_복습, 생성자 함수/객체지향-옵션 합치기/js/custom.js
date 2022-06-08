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

function BoxStyle(el, opt) {
	var def_opt = {
		wid: 100,
		ht: 100,
		bg: "gray"
	}
	this.opt = $.extend({}, def_opt, opt);
	this.el = el;
	this.changeWid(this.opt.wid);
	this.changeHt(this.opt.ht);
	this.changeBg(this.opt.bg);
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
}
BoxStyle.prototype.changeBg = function (bg) {
	$(this.el).css({
		backgroundColor: bg
	});
}

var box1 = new BoxStyle("#box1", {
	wid: 200,
	ht: 200,
	bg: "hotpink"
});

var box2 = new BoxStyle("#box2", {
	bg: "aqua"
});