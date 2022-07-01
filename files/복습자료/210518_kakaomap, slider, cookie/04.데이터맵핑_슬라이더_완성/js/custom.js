var $slider0 = $(".slider0");
var $slider1 = $(".slider1");

var $prev = $(".prev");
var $next = $(".next");


init('data/slider0.json', $slider0);
init('data/slider1.json', $slider1);

var isDone = true;

$prev.on("click", function (e) {
	e.preventDefault();
	if(isDone){
		prev($slider0);
		prev($slider1);
		isDone = false;
	}
});

$next.on("click", function (e) {
	e.preventDefault();
	if(isDone){
		next($slider0);
		next($slider1);
		isDone = false;
	}
});

function init(url, target) {
	$.ajax({
			url: url,
			dataType: 'json'
		})
		.success(function (data) {
			console.log(data);
			createDOM(data.data, target);
		})
		.error(function (err) {
			console.log(err);
		})
}

function createDOM(data, target) {
	target
		.append(
			$("<ul>")
			.css({
				width: (100 * data.length) + "%",
				height: '100%',
				marginLeft: "-100%"
			})
		)

	$(data).each(function () {
		var def_option = {
			width: (100 / data.length) + "%",
			height: "100%",
			float: "left",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			fontWeight: "bold",
			fontSize: 30,
			lineHeight: 1,
			fontFamily: "arial",
			color: "#fff",
			boxSizing: "border-box",
			backgroundColor: this.bgColor
		}

		//javascript 객체 데이터 합치기
		//var result_option = Object.assign({}, def_option, this.custom )

		//jQuery 객체 데이터 합치기
		var result_option = $.extend({}, def_option, this.custom);

		target.children("ul")
			.append(
				$("<li>")
				.css(result_option)
				.text(this.text)
			)
	});


	target.children("ul").children("li").last().prependTo(target.children("ul"));
	//시작할때 1번부터 보이게 하기
}

function prev(selector) {
	selector.children("ul").animate({
		marginLeft: 0
	}, 500, function () {
		$(this).children().last().prependTo(this);
		$(this).css({marginLeft: "-100%"});
		isDone = true;
	});
}

function next(selector) {
	selector.children("ul").animate({
		marginLeft: "-200%"
	}, 500, function () {
		$(this).children().first().appendTo(this);
		$(this).css({marginLeft: "-100%"});
		isDone = true;
	});
}