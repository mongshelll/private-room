const h2 = $(".swiper-slide h2");

$(h2).each(function(index, data){
	letter($(data), 0.1);
});


function letter(el, interval){
	if(el === undefined){
		console.error("첫번째 인수로 선택자를 지정해 주세요!!");
		return;
	}
	if(interval === undefined){
		interval = 0;
	}

	const txt = el.text();
	el.text("")
	let num = 0;

	for(let letter of txt){
		el.append(
			$("<span>")
			.text(letter)
			.css({
				transitionDelay: `${num*interval}s`,
				display: "inline-bolck"
			})
		);
		num++;
	};
};