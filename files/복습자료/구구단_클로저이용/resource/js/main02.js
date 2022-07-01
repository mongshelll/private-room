// 기존 전역변수 num 대체
// counter 클로저 이용해서 사용
// 전역변수로 활용하려면 조건별 전역변수 선언, 함수 추가 생성이 필요하다고 판단
// 클로저를 활용하면 기존 함수 재활용이 가능함
var counter = function() {
	var num = 0;
	function changeBy(val){
		num += val;
	}
	return {
		increase : function() {
			changeBy(1);
		},
		decrease : function() {
			changeBy(-1);
		},
		checking : function() {
			//increase, decrease 사용될 때 마다
			//값에 영향을 주기때문에 checking으로 num값 사용
			return num;
		}
	}
};

var counter01 = counter();
var counter02 = counter();
var counter03 = counter();

// function counter() {
//     var num = 0;
//     function changeBy(val){
//         num += val;
//     }
//     return {
//         increase : function() {
//             changeBy(1);
//         },
//         decrease : function() {
//             changeBy(-1);
//         },
//         checking : function() {
//             //increase, decrease 사용될 때 마다
//             //값에 영향을 주기때문에 checking으로 num값 사용
//             return num;
//         }
//     }
// }

// 20211222 feedback
// 마크업에서 옵션값 조절 가능하게 생각해보기 ex. value값 받아서 00단까지 보여주기 등
// 받아온 값을 변수에 담아서 매개변수로 넘기기



$(document).on("click", ".prev_btn1", function(){
	perv($(this), counter01, 9, 9);  //9단, 9단계 까지 노출
});
$(document).on("click", ".next_btn1", function(){
	next($(this), counter01, 9, 9);  //9단, 9단계 까지 노출
	if($(this).text("시작")){
		$(this).text("다음");
	}
});

$(document).on("click", ".prev_btn2", function(){
	perv($(this), counter02, 19, 9);  // 19단, 9단계 까지 노출
});
$(document).on("click", ".next_btn2", function(){
	next($(this), counter02, 19, 9);  // 19단, 9단계 까지 노출
	if($(this).text("시작")){
		$(this).text("다음");
	}
});

$(document).on("click", ".prev_btn3", function(){
	perv($(this), counter03, 19, 21);  // 19단, 21단계까지 노출
});
$(document).on("click", ".next_btn3", function(){
	next($(this), counter03, 19, 21);  // 19단, 21단계까지 노출
	if($(this).text("시작")){
		$(this).text("다음");
	}
});



//num 값 컨트롤이 문제
// var num = 0;
//perv(작동 버튼, 기준이 되는 증감값 함수, 노출되는 구구단 단계, 노출되는 구구단 갯수)
function perv(el, counter, m, n) {
	if(counter.checking() <= 1) {
		return;
	}
	counter.decrease();
	// num--;
	creatList(el ,counter.checking(), m, n);
}

//next(작동 버튼, 기준이 되는 증감값 함수, 노출되는 구구단 단계, 노출되는 구구단 갯수)
function next(el, counter, m, n) {
	if(counter.checking() >= m) {
		return;
	}
	counter.increase();
	// num++;
	creatList(el, counter.checking(), m, n);
}

// creatList(외부함수에서 받은 매개변수, 현재 카운트 값, 노출되는 구구단 단계, 노출되는 구구단 갯수)
function creatList(el, counter, m, n) {
	var $gugudan = el.closest(".gugudan");
	var $result = $gugudan.find(".result_wrap");
	var $contentTile = $gugudan.find(".content_title p");
	var $list = $("<ul>");

	$result.empty();
	$result.append($list);

	for(var i = counter; i <= counter; i++) {
		$contentTile.text("단 / " + m + "단까지 / " + n +"단계").prepend(
			$("<span>").text(i)
		);
		for(var j = 1; j <= n; j++) {
			$list.append(
				$("<li>").text(i +" * "+ j + " = " + i * j)
				);
		}
	}
}