/*
자료형
--숫자
--문자열
--논리형
--undefined
--null
--array (배열)
--object (객체)

*/

var num; //변수선언
num = 20; //변수에 값을 할당

var name = "홍길동"; //변수를 선언함과 동시에 값을 할당 (초기화)

//변수끼리의 연산을 다시 변수에 대입가능
var num1 = 2;
var num2 = 3;
var result = num1 + num2;

console.log(result);


var apple;
var Apple;

//변수로 지정할 식별자가 여러개 일때 , 로 구분하여 한번에 선언 가능
var apple, Apple;

var hobby = "game";
var hobby;
hobby = "reding"; //변경가능
console.log(hobby);

var gender;
console.log(gender);

/*
변수를 선언하고 값을 할당하지 않은 상태에서 해당변수를 호출 - undefined
만약 변수 선언시 물리적으로 값을 비워놓고 싶을 때는 null 할당

*/

hobby = null;
console.log(hobby);