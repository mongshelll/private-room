var $prev = $(".prev");
var $next = $(".next");

var $slider1 = $("#slider1 ul");
var $slider2 = $("#slider2 ul");

var isDone = true;

init($slider1);
init($slider2);

$prev.on("click", function(e){
	e.preventDefault();

	if(isDone){
		prev({
			el: $slider1,
			speed: 1000
		});

		prev({
			el: $slider2,
			speed: 1000
		});

		isDone = false;
	}

});

$next.on("click", function(e){
	e.preventDefault();

	if(isDone){
		next({
			el: $slider1,
			speed: 1000
		});

		next({
			el: $slider2,
			speed: 1000
		});

		isDone = false;
	}

});

function init(el){
	var len = el.children("li").length;

	el.css({
		width: 100 * len + "%"
	});
	el.find("li").css({
		width: 100 / len + "%"
	});
	el.find("li").last().prependTo(el);
}

function next(opt){

	if(!opt.el){
		console.error("선택자는 필수 입력사항입니다.");
		return;
	}

	var def = {
		speed: 500
	}
	var result = Object.assign({}, def, opt)

	opt.el.animate({marginLeft: "-200%"}, result.speed, function(){
		opt.el.children().first().appendTo(opt.el);
		opt.el.css({marginLeft: "-100%"});
		isDone = true;
	});
}

function prev(opt){

	if(!opt.el){
		console.error("선택자는 필수 입력사항입니다.");
		return;
	}

	var def = {
		speed: 500
	}
	var result = Object.assign({}, def, opt)

	opt.el.animate({marginLeft: 0}, result.speed, function(){
		opt.el.children().last().prependTo(opt.el);
		opt.el.css({marginLeft: "-100%"});
		isDone = true;
	});
}


// var num1 = { a: 1, b: 2, c: 3};
// var num2 = { d: 4};

// var num3 = Object.assign({}, num1, num2);
// console.log(num1);
// console.log(num3);