const frame = document.querySelector("section");
const lists = frame.querySelectorAll("article");
const prev = document.querySelector(".btnPrev");
const next = document.querySelector(".btnNext");
const len = lists.length-1;
let num = 0; //버튼 클릭시 회전각도 구하는 카운트
let active = 0; //현재 활성화 되어있는 article의 순번을 담을 변수
const deg = 45;
let i = 0; //article 초기 각도 회전시킬때 쓰는 카운트

prev.addEventListener("click", ()=>{
  initMusic();

  num++;
  frame.style.transform = `rotate(${deg*num}deg)`;

  (active==0) ? active=len : active--;
  activation(active, lists);
});

next.addEventListener("click", ()=>{
  initMusic();

  num--;
  frame.style.transform = `rotate(${deg*num}deg)`;

  (active==len) ? active=0 : active++;
  activation(active, lists);
});

function activation(index, lists){
  for(let el of lists){
    el.classList.remove("on");
  }
  lists[index].classList.add("on");
}

const audio = frame.querySelectorAll("audio");
function initMusic(){
  for(let el of audio){
    el.pause();
    el.load();
    el.parentElement.previousElementSibling.classList.remove("on");
  }
}

for(let el of lists){
  el.style.transform = `rotate(${45*i}deg) translateY(-100vh)`;
  el.querySelector(".pic").style.backgroundImage = `url(img/member${i+1}.jpg)`;
  i++;

  let play = el.querySelector(".play");
  let pause = el.querySelector(".pause");
  let load = el.querySelector(".load");

  //각 article의 재생버튼 클릭시 음악 재생
  play.addEventListener("click", e => {
    e.currentTarget.parentElement.nextElementSibling.play();
    e.currentTarget.parentElement.parentElement.previousElementSibling.classList.add("on");
  });

  //각 article의 정지버튼 클릭시 음악 정지
  pause.addEventListener("click", e => {
    e.currentTarget.parentElement.nextElementSibling.pause();
    e.currentTarget.parentElement.parentElement.previousElementSibling.classList.remove("on");
  });

  //각 article의 버튼 클릭시 음악 
  load.addEventListener("click", e => {
    e.currentTarget.parentElement.nextElementSibling.load();
    e.currentTarget.parentElement.nextElementSibling.play();
    e.currentTarget.parentElement.parentElement.previousElementSibling.classList.add("on");
  });
}

// for(let i=0; i<lists.length; i++){
//   lists[i].style.transform = `rotate(${45*i}deg) translateY(-100vh)`;
// }

