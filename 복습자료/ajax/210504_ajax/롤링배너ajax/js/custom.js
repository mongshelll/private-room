//전역변수 DOM 캐싱
var $list = $(".list");
var $list_li = $list.find("li");
var len = $list_li.length;
var wid = $list_li.width();
var totalWid = wid * len;
var num = 0;
var timer;

//전체 .list ul의 너비값을 동적으로 계산해서 적용
$list.width(totalWid);

//move함수를 반복해서 실행 - 모션처리 0.01s 마다 함수실행
timer = setInterval(move, 10);

//리스트에 마우스 호버시 롤링 중지
$list.on("mouseenter", function () {
	clearInterval(timer);
});

//리스트에서 마우스 아웃시 경우 롤링 다시 시작
$list.on("mouseleave", function () {
	timer = setInterval(move, 10);
});

//리스트 클릭시 동적으로 팝업 생성
$list_li.on("click", function (e) {
	e.preventDefault(); //클릭시 링크 이동 방지

	//타겟 주소를 구해서 변수에 담음
	var targetURL = $(this).children("a").attr("href");

	//이미 팝업이 있다면 제거 후 팝업 생성
	removePop();
	cteatePop(targetURL);
});

//팝업의 .btnClose 클릭시 이전에 열린 팝업 제거 함수 실행
//동적으로 생성되어 body에 이벤트 위임으로 실행
$("body").on("click", ".pop .btnClose", function () {
	removePop();
})

//팝업 제거 함수 정의 fadeOut 다음 remove
function removePop() {
	$(".pop").fadeOut(500, function () {
		$(this).remove();
	});
}

//팝업 생성함수
function cteatePop(targetURL) { //파라미터로 주소값 전달
	$("body")
		.append(
			$("<aside class='pop'>")
			.append(
				$("<div class='con'>")
				.append(
					$("<img class='loading'>")
					.attr({
						src: "img/loading.gif"
					})
				),
				$("<span class='btnClose'>")
				.text("close")
			).fadeIn(500, function () {
				callData(targetURL);
				//전달받은 주소값을 다시 callData함수에 전달
			})
		)
}

//비동기 데이터 호출함수
//주소값을 다시 succeess구문으로 전달
// function callData(targetURL) {
// 	$.ajax({
// 		url: targetURL,
// 		success: function (data) {
// 			console.log(data);
// 			$(".pop .con").html(data);
// 		},
// 		error: function (err) {
// 			// alert("데이터 호출 실패!!!");
// 			$(".pop .con").text("데이터 호출 실패!!!").css({
// 				color: "red",
// 				textAlign: "center",
// 				fontSize: 50,
// 				lineHeight: "350px"
// 			});
// 		}
// 	})
// }

function callData(targetURL) {
	$.ajax({
		url: targetURL
	})
	.success(function (data) {
			console.log(data);
			$(".pop .con").html(data);
	})
	// .done(function (data) {
	// 		console.log(data);
	// 		$(".pop .con").html(data);
	// })
	.fail(function (err) {
			// alert("데이터 호출 실패!!!");
			$(".pop .con").text("데이터 호출 실패!!!").css({
				color: "red",
				textAlign: "center",
				fontSize: 50,
				lineHeight: "350px"
			});
		});
	}

//.list 이동 함수정의
//전역변수로 num값을 0으로 설정한 상태 - left값에 연동하기 위한 값
function move() {
	//.list li의 너비값이 240 = wid
	// - .list가 left값이 0에서 li하나만큼 앞으로 당겨진다면 240px
	if (num < -wid) { //left값이 -240px이 넘어갈 때 = li하나가 화면 밖으로 넘어가는 순간
		//num값을 0으로 초기화 = left: 0
		num = 0;
		//화면에 안보이게 된 li를 떼서 .list 뒤로 붙임
		$list.find("li").first().appendTo($list);
	} else {
		//left: -240px되기 전까지는 계속 -2px만큼 이동
		num -= 1;
	}
	$list.css({
		left: num
	});
}