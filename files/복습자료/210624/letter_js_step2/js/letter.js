const item = $("div");
const h1 = $("h1");

letter(item, 0.05);
letter(h1, 0.03);


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





/*
const item = document.querySelector("div");
const txt = item.innerText;
console.log(txt);

//부모요소.innerHTML = "태그"

for(let letter of txt){
	console.log(letter);
}
*/