var spring = "봄";
var summer = "여름";
var fall = "가을";
var winter = "겨울";

console.log(spring);

var seasons = ["봄", '여름', "가을", "겨울"]
console.log(seasons[2]);
console.log(seasons.length);

for (i = 0; i < seasons.length; i++) {
	console.log(seasons[i]);
}

var num = ["1", "2", "3"]
var char = ["a", "b", "c"]



console.log(num.concat(char)); //1,2,3,4,a,b,c
//concat 둘이상의 배열을 합치기

num.push("5");
//push는 새로운 요소를 배열의 뒷부분에 추가
num.push("6");

num.unshift("0");
//unshift는 새로운 요소를 배열의 앞부분에 추가
console.log(num);

var arr = [];
// arr.push("0");
// arr.push("1");
// arr.push("2");
// arr.push("3");
// arr.push("4");

for (var i = 0; i < 5; i++) {
	arr.push(i)
}
console.log(arr);