/*---------------------------------------------
	240227 : 진행률 표시기 추가 | ljs
---------------------------------------------*/
// jquery
// const ebstepFn = () => {
// 	let target = $('.ebprogress');

// 	if (target.length) {
// 		target.each((idx, el) => {
// 			let _value = $(el).attr('value');
// 			let _max = $(el).attr('max');
// 			$(el).attr('aria-valuetext', `${_max}단계 중 ${_value}단계`);
// 		});
// 	}
// }

// $(window).on('load',function(){
// 	ebstepFn();
// })



// vanilla
const ebstepFn2 = () => {
	let target = document.querySelectorAll('.ebprogress');

	if (target.length) {
		target.forEach(el => {
			let _value = el.getAttribute('value');
			let _max = el.getAttribute('max');

			el.setAttribute('aria-valuetext', `${_max}단계 중 ${_value}단계`);
		});
	}
}

window.addEventListener('load',()=>{
	ebstepFn2();
})