var slider0  = $(".slider0");
var slider1  = $(".slider1");

var $prev = $(".prev");
var $next = $(".next");


$prev.on("click", function(e){
	e.preventDefault();

});

init();

function init(){
	$.ajax({
		url: 'data/slider1.json',
		dataType: 'json'
	})
	.success(function(data){
		console.log(data);
		createDOM(data.data);
	})
	.error(function(err){
		console.log(err);
	})
}

function createDOM(data){
	console.log(data.length);
	$(".slider1")
	.append(
		$("<ul>")
		.css({
			width: (100 * data.length) + "%",
			height: "100%",
			marginLeft: "-100%"
		})
	)
	$(data).each(function(){
		$(".slider1").children("ul")
		.append(
			$("<li>")
			.css({
				width: (100 / data.length) +"%",
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
				boxSizng: "border-box",
				backgroundColor: this.bgColor
			})
			.text(this.text)
		)
	})
}

