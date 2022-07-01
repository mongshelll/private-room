const item = $("div");
const txt = item.text();
item.text("");


let num = 0;

for(let letter of txt){
	item.append(
		$("<span>")
		.text(letter)
		.css({transitionDelay: num*0.2+"s"})
	);
	num++;
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