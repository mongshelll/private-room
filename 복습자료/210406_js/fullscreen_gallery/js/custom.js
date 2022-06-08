//이벤트 대상 .controls ul li
//이벤트 : clock
//변경할 대상
//ul li a href 값 가져오기
//p 태그의 text 가져오기
//div strong - 몇번째 인지 가져오기


// 자주쓰는것 변수로 성정하여 쓰기
// var gallery_li = $("#gallery .controls ul li");
var total = $("#gallery .controls ul li").length;
// console.log(total);


$("#gallery .controls ul li").eq(0).children("a").css({
	"color": "#fff"
});

$("#gallery .controls ul li").on("click", function (e) {
	e.preventDefault();

	var imgSrc = $(this).children("a").attr("href");
	var txt = $(this).children("a").text();
	var index = $(this).index() + 1;
	// console.log(imgSrc);
	// console.log(txt);
	// console.log(index);

	//버튼 활성화 색상
	$("#gallery .controls ul li a").css({
		"color": "#999"
	});
	$(this).children("a").css({
		"color": "#fff"
	});

	//배경이미지 변경
	$(".showGallery").css({
		"background-image": "url(" + imgSrc + ")",
		"transition": "all 0.5s"
	});

	//text 변경
	$("#gallery .controls p").text(txt);
	//순서값 변경
	$("#gallery .controls div strong").text(index);
	//로딩시 전체 이미지의 갯수를 span에 삽입
	$("#gallery .controls div span").text(total);
});