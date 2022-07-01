/*
비교연산자
두개 이상의 값을 서로 비교해서 참 거짓을 판단하기 위한 용도

==, ===, !=, !==, <, >, <=, >=

== 값만 비교
=== 자료형까지 비교
*/

var result = (2 === "2"); //숫자와 문자이기 때문에 거짓
console.log(result);

var result = (2 == "2"); //값이 같기 때문에 참
console.log(result);

var result = (2>=4);
console.log(result);

var result = (2 !== 3); //같지 않음 - 참
console.log(result);

//삼항연산자
//조건비교식 ? 조건식이 참일때 실행 : 조건식이 거짓일 때 실행;
(5>3) ? console.log("참입니다.") : console.log("거짓입니다.");

/*
if(조건){
	조건이 참일 때 실행;
}else{
	조건이 거짓일 때 실행;
}
*/

if(5>3) {
	console.log("참입니다.");
}else{
	console.log("거짓입니다.");
};



var test = ( 2 >= 2 ) ? "가능" : "불가";
console.log(test);