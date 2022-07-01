/*
전위연산자 / 후위연산자
*/

var num = 0;
// num = num+1;
// num +=1;
// num ++;

// console.log(num++);	//후위연산자
// console.log(num);

// console.log(++num);	//전위연산자
// console.log(num);


/*
후위연산자 : 초기 변수값을 일단 그냥 활용하고 그 이후에 값을 카운트(0부터)
전위연산자 : 초기 변수값을 바로 카운트하고 코드를 실행

*/

var num = 3;
var num2 = 4;

console.log(num++ + num2); //4 - 순차적으로 연산

// console.log(++num + num2); //8 - 3에 1을 미리 더하고 뒤 연산 시작 = 4+4