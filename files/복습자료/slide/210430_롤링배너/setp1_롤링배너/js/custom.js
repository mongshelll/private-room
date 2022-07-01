var $banner = $("#banner");
var $banner_ul = $banner.children("ul");
var $banner_li = $banner_ul.children("li");

//ul의 자동 넓이값 설정
var wid = $banner_li.outerWidth(); //li 1개의 넓이값
var len = $banner_li.length; //li의 갯수
var total_wid = wid * len; //전체의 넗이
//모니터 크기만큼 ul넓이가 보여짐, 이동하면서 149px만큼 공간이 생김, ul에 전체 넓이값 고정으로 줌
$banner_ul.css({
	width: total_wid
});
// console.log(total_wid);

//현재 배너의 marginLeft값 초기화
var i = 0;
var timer;


//처음 로딩시 자동 롤링
timer = setInterval(move, 20);

//배너의 마우스 오버시 롤링 중지
$banner.on("mouseenter", function(){
	clearInterval(timer);
})

//배너의 마우스 아웃시 롤링 시작
$banner.on("mouseleave", function(){
	timer = setInterval(move, 20);
})

function move(){
	if(i <= -wid){
		i = 0;
		$banner_ul.children("li").first().appendTo($banner_ul);
	}else{
		i -= 2;
	}
	$banner_ul.css({
		marginLeft: i
	});
}
