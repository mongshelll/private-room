const section = $("section");
const article = section.children("article");
const navi_li = $(".navi li");
const btnPrev = $(".btnPrev");
const btnNext = $(".btnNext");
const len = article.length;

//패널의 순서값을 1로 일단 초기화
//active값을 전역으로 뺴서 btnNext, btnPrev, navi버튼 클릭시
//각각의 active순번이 서로 공유시키기 위함
let active = 1;


btnNext.on("click", e => {
	e.preventDefault();

	//현재 active순번이 만약에 마지막 순번이면
	//active순번을 제일 처음 순번으로 변경
	//active순번이 마지막 순번이 아니면 기존순번에서 1을 더함
	(active == len) ? active = 1: active++;
	console.log(active);

	activation(active);
});


btnPrev.on("click", e => {
	e.preventDefault();

	//현재 active순번이 만약에 순번이 1번이면
	//active순번을 마지막 순번으로 변경
	//active순번이 1번째 순번이 아니면 기존순번에서 1을 뺌
	(active == 1) ? active = len: active--;
	activation(active);
});


navi_li.on("click", e => {
	e.preventDefault();
	active = $(e.currentTarget).index() + 1;
	activation(active);
});


function activation(index) {
	section.removeClass();
	section.addClass("on" + index);

	navi_li.removeClass("on");
	navi_li.eq(index - 1).addClass("on");
}