var links = [
	"http://naver.com",
	"http://nate.com",
	"http://google.com"
];

/*
var result = "";
$("body").html(result);
result += "<ul>";

$(links).each(function(index, data){
	result += "<li><a href='"+data+"'>"+data+"</a></li>"
});

result += "</ul>";
$("body").html(result);
*/

// $("body").append("<ul>");
// $(links).each(function(index, data){
//   $("ul").append(
//     $("<li>")
//     .append(
//       $("<a>")
//       .attr({href: data})
//       .text(data)
//     )
//   )
// });


// .each() : 배열이나 반복되는 DOM을 반복처리 가능
var fruits = [
	"apple", "strawberry", "melon", "banana", "ornage"
];

$("body").append("<ul>");
$(fruits).each(function(index, data){
	$("ul").append(
		$("<li>").text(data)
	)
});

