/*
연산자 - 특정값을 도출하기 위한 연산을 처리하는 식별자
산술연산자, 대입연산자, 비교연산자

1. 산술연산자 : 숫자를 연산하기위한 연산자
//            : +, -, *, /, %(나머지 값), **(거듭제곱), ++(1씩 증가), --(1씩 감소)
2. 대입연산자 : 특정값을 대입하기 위한 연산자
//            : =, +=, -=, /=, %=
3. 비교연산자 : 두개 이상의 값을 서로 비교하기 위한 연산자
//            : >, >=, <, <=
*/

var num = 2 + 3;
console.log(num); //결과값은 5

var num = 2 - 3;
console.log(num); //result : -1

var num = 3 / 2;
console.log(num); //result : 1.5

var num = 3 * 2;
console.log(num); //result : 6

var num = 5 % 3;
console.log(num); //result : 2

var num = 3 ** 3;
console.log(num); //result : 27

var x = 2;
x += 3; //자기 자신에 3더한 값을 다시 자신에게 덮어씀

console.log(x); //result : 5

num = 1;
// num +=1;
num++;
console.log(num); //result : 2

var num = 10;
num**=4;
console.log(num); //reslut : 10000