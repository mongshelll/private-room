// $(document).ready(function(){
// 	slide01();
// });

/* window */
// $(window).on('load', function(){
//     slide01();
// });



function slide01() {
	var $banner = $("#banner");
	var $banner_ul = $banner.children("ul");
	var $banner_li = $banner_ul.children("li");
	var $prev = $banner.find(".prev");
	var $next = $banner.find(".next");
	//ul의 자동 넓이값 설정
	var wid = $banner_li.outerWidth(); //li 1개의 넓이값
	var len = $banner_li.length; //li의 갯수
	var total_wid = wid * len; //전체의 넗이
	//모니터 크기만큼 ul넓이가 보여짐, 이동하면서 149px만큼 공간이 생김, ul에 전체 넓이값 고정으로 줌
	var speed = 500;

	$banner_ul.css({
		width: total_wid
	});
	// console.log(total_wid);

	//현재 배너의 marginLeft값 초기화
	var i = -wid;
	var timer;

	$banner_ul.children("li").last().prependTo($banner_ul);

	//처음 로딩시 자동 롤링
	timer = setInterval(move, 10);

	//배너의 마우스 오버시 롤링 중지
	$banner.on("mouseenter", function () {
		clearInterval(timer);
	});

	//배너의 마우스 아웃시 롤링 시작
	$banner.on("mouseleave", function () {
		timer = setInterval(move, 10);
	});

	$next.on("click", function (e) {
		e.preventDefault();
		next();
	});

	$prev.on("click", function (e) {
		e.preventDefault();
		prev();
	});

	function next() {
		$banner_ul.animate({
			marginLeft: -wid * 2
		}, speed, function () {
			$banner_ul.children("li").first().appendTo($banner_ul);
			$banner_ul.css({
				marginLeft: -wid
			});
			i = -wid; //next 모션이 끝난 직후 현재의 위치값을 다시 i값에 업데이트
		});
	}

	function prev() {
		$banner_ul.animate({
			marginLeft: 0
		}, speed, function () {
			$banner_ul.children("li").last().prependTo($banner_ul);
			$banner_ul.css({
				marginLeft: -wid
			});
			i = -wid; //next 모션이 끝난 직후 현재의 위치값을 다시 i값에 업데이트
		});
	}

	function move() {
		if (i <= -wid * 2) {
			i = -wid;
			$banner_ul.children("li").first().appendTo($banner_ul);
		} else {
			i -= 1;
		}
		$banner_ul.css({
			marginLeft: i
		});
	}

	return next();
}

