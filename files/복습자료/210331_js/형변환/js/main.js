/*
형변환 : 특정이유로 자료형태가 변환되는 경우
- 만약 숫자가 문자와 결합이 되면 피연산자인 숫자는 문자로 형변환
- 문자를 숫자로 변환해야 하는 경우
parseInt(변환할 문자) // 정수로 변환 (소수점 버림)
parseFloat(변환할 문자) // 실수로 변환 (소수점 있음)

*/

var result = "2" + 3 + 5;  //235

console.log(result);

var num = "1.5";
num = parseInt(num);
console.log(num);