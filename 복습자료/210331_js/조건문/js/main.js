var now = new Date().getHours(); //시간만

console.log(now);


if(now >= 0 && now < 9){ //0시 부터 9시 전 까지
	document.getElementById("wrap").style.backgroundColor = "black";
}else if(now >= 9 && now < 17){ //9시 부터 17시 전 까지
	document.getElementById("wrap").style.backgroundColor = "pink";
}else if(now >= 17 && now < 24){ //17시 부터 24시 전 까지
	document.getElementById("wrap").style.backgroundColor = "gray";
}


/*
if(result < 18){
	document.getElementById("wrap").innerHTML = "<p>18세 이하는 사용 할 수 없습니다.</p>";
}else{
	document.getElementById("wrap").innerHTML = "<p>환영합니다.</p>";
}

//삼항연산자
(result < 18) ? console.log("입장불가") : console.log("환영합니다");
*/

var result = prompt("가 혹은 나");
console.log(result);

if(result == "가" || result == "나"){
	document.getElementById("wrap").innerHTML = "<p>참</p>";
}else{
	document.getElementById("wrap").innerHTML = "<p>거짓</p>";
}


// if(result == "블랙" || result == "레드"){
//   document.getElementById("wrap").innerHTML = "<p>암호 성공</p>";
// }else{
//   document.getElementById("wrap").innerHTML = "<p>안되요</p>";
// }


// if(result === "2" || result === "4"){
//   document.getElementById("wrap").innerHTML = "참";
// }else{
//   document.getElementById("wrap").innerHTML = "거짓";
// }


/*
조건문

특정 조건을 미리 설정해서 해당 조건마다 코드의 분기를 발생
&& - 두개의 조건을 모두 만족해야만 true 반환 (교집합)
|| - or (합집합)

*/

