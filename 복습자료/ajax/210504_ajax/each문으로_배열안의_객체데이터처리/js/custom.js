var linkData = [
	{
		text: "네이버",
		url: "http://naver.com"
	},
	{
		text: "네이트",
		url: "http://nate.com"
	},
	{
		text: "구글",
		url: "http://google.com"
	}
];


$("body").append("<ul>");

$(linkData).each(function(index, data){
	$("ul").append(
		$("<li>").append(
			$("<a>")
			.attr({href: data.url})
			.text(data.text)
			)
		)
})


/*
var result = "";
result += "<ul>";

$(linkData).each(function(index, data){
	result += "<li><a href='"+data.url+"'>"+data.text+"</a></li>";
});

result += "</ul>";
$("body").html(result);
*/