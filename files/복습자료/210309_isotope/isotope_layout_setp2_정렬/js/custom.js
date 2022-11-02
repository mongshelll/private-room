$(document).ready(function(){

	var $grid;

	$grid = $(".wrap").isotope({ //모션을 적용할 박스의 부모 선택자명
		itemSelector:".wrap article", //모션을 적용할 박스 선택자명
		columnWidth:".wrap article",  //너비값을 구할 박스 선택자명
		transitionDuration:"0.8s",    //모션 이동속도
		percentPosition:true          // 너비값이 퍼센트 ture, 고정픽셀: false
	});

	$(".filter li a").on("click",function(e){
		e.preventDefault();

		var sort = $(this).attr("href");

		$grid.isotope({
			filter:sort
		});
	});

/*
	$().on("event",function(){
		//event: click, mouseenter, mouseleavem scroll
});
*/
});
