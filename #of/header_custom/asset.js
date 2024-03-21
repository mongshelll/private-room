// 기존 방법
// document.write('<link rel="stylesheet" href="style.css">');
// document.write('<script src="../jQuery/jquery-3.7.1.min.js"></script>');


// 정상적으로 들어감
// document.head.innerHTML += `<link rel="stylesheet" href="style.css">`;
// document.head.innerHTML += `<script src="../jQuery/jquery-3.7.1.min.js"></script>`;


// 문자열로 추가됨
// document.querySelector('head').append(`<link rel="stylesheet" href="style.css">`);
// document.querySelector('head').append(`<script src="../jQuery/jquery-3.7.1.min.js"></script>`);


let script = document.createElement('script');
script.src = "../jQuery/jquery-3.7.1.min.js";

console.log(script);

document.head.append(script)

// document.querySelector('head').append(script)
// document.querySelector('head').appendChild(script)
// document.getElementsByTagName('head')[0].appendChild(script);
