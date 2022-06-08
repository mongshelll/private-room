document.getElementById("title").innerText = "world";
document.getElementById("title").innerHTML = "<a>PINK</a>";

document.getElementById("link").href = "https://www.naver.com";
document.getElementById("title").style.color = "red";

// var result = document.getElementById("form").userid.value;


/*

자바스크립트가 하는 일
1. html 요소에 컨텐츠를 변경 가능
2. html 구조 자체를 변경 가능
3. html 속성 (attribute)를 변경 가능

innerHTML : html을 삽입하여 출력
innerText : text를 삽입하여 출력
document.write(); : 기존의 모든 html내용을 지우고 text를 삽입
console.log(); : console창에 출력하는 형태
alert(); : 경고창으로 출력하는 형태

주의사항
구문이 끝나는 위치에 ; 입력 (예외사항 - 블록 뒤에는 붙이지 않음)
띄어쓰길를 여러번 입력해도 한번만 인식 (단, 문자열 안에서는 여러번 인식)


*/