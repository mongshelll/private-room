$(window).on("load", function () {
    windowSizeCheck(); //화면 사이즈 html에 출력
});

$(window).on("resize", function () {
    windowSizeCheck(); //화면크기 변경시 화면 사이즈 html에 출력
});

//화면 사이즈 html에 출력 함수
function windowSizeCheck() {
    $(".cont_box .viewport_size").text(window.innerWidth + " x " + window.innerHeight);
}