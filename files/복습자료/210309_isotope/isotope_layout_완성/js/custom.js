$(document).ready(function(){

	var $grid;

	$grid = $(".wrap").isotope({ //모션을 적용할 박스의 부모 선택자명
		itemSelector:".wrap article", //모션을 적용할 박스 선택자명
		columnWidth:".wrap article", //너비값을 구할 박스 선택자명
		transitionDuration:"0.8s", //모션 이동 속도
		percentPosition:true //너비값이 퍼센트 :true, 고정픽셀:false
	});

	$(".filter li a").on("click", function(e){
		e.preventDefault();
		console.log(e);
		var sort = $(this).attr("href");

		$grid.isotope({
			filter:sort
		});

		$(".filter li a").removeClass("on");
		$(this).addClass("on");

	});

/*
$(선택자).on("event",function(){  //event: click, mouseenter,mouseleave, scroll

});
*/


});
