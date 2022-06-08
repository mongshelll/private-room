/*
함수
- 자주 쓰는 실행 코드들을 블록단위로 묶어서 패키징 해놓은 코드의 묶음 단위
- 자주 쓰는 코드등을 기능단위로 재사용하기 위함

함수정의
- 미리 function 키워드로 자주쓰는 코드들을 묶어주는 행위

함수호출
- 선언적 함수 : 함수 자체에 이름이 있는 함수. 함수의 호출위치가 자유로움
- 익명함수 : 이름이 없는 함수
- 대입형 함수 : 변수에 익명함수를 대입하는 형태 (선언-변수의 형태이므로 정의한 다음에 호출이 가능)
var minus = function(){
	var num1 = 5;
	var num2 = 3;
	var result = num1 - num2;
}
- 함수의 인수(parameter 매개변수) : 함수 외부에서 입력한 값을 함수 내부로 전달해 주는 통로
- 함수의 리턴값 (반환값 return) : 함수가 실행된 이후에 함수내부의 값을 반환
	: 함수를 실행하고 난 뒤에 특정 결과값을 다시 어딘가에 활용하고 싶을 때 return값으로 내보냄
	: 함수 중간에 강제로 해당 함수를 줄지시킬 때 return;

typeof : 자료형의 타입을 알아내는 키워드
*/

// var a = "홍길동";
// var b = 2;
// var c = true;
// var d = undefined;
// var e = ["a", "b"];
// var f = {name: "홍길동", age: "20"};
// var g = null;

// console.log(typeof a);
// console.log(typeof b);
// console.log(typeof c);
// console.log(typeof d);
// console.log(typeof e);
// console.log(typeof f);
// console.log(typeof g);



// var a = 5;
// var b = 3;
// var result = a+b
// console.log(result);


var n = 2; //전역변수

plus(3,5);
plus("3",5);
minus(3,5);
minus("3",5);

function plus(num1, num2){
	var a = typeof num1; //지역변수
	var b = typeof num2;

	var result = a+b;

	if(a =="number" && b == "number"){
		console.log(num1+num2);
		return num1 + num2;
	}else{
		console.log("에러! 숫자를 넣어주세요.");
	}
};
function minus(num1, num2){
	var a = typeof num1;
	var b = typeof num2;

	var result = a-b;

	if(a =="number" && b == "number"){
		console.log(num1-num2);
		return num1 - num2;
	}else{
		console.log("에러! 숫자를 넣어주세요.");
	}
};

//함수선언
function coco(num1, num2){
	var a = num1;
	var b = num2;
	var result = a+b;

	console.log(result);
}
coco(2,3);
dodo(2,6);

//익명함수를 변수에 담아 대입형 함수
function dodo(a, b){
	var num1 = a;
	var num2 = b;

	console.log(num1 - num2);
}
dodo(2,6);


