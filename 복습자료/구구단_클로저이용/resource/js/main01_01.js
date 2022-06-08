//검색했던 내용물 저장
var gugudan = [];  //push로 배열 받음



//엔터키 검색 활성화
$(document).on("keypress", ".input_submit", function(e){
    //keyCode 13 = enter키
    if (e.keyCode === 13) {
        //해당 input value 전송 후 포커스 유지하기
        $(this).focus();
        //creatList(화면에 출력 갯수, 입력받는 input)
        creatList(9, $(this));
    }
});

//입력 버튼 클릭시 실행
$(document).on("click", ".btn_gugudan", function(){
    //입력받는 input
    var inputValue = $(this).prev(".input_submit");
    //해당 input value 전송 후 포커스 유지하기
    inputValue.focus();
    //creatList(화면에 출력 갯수, 입력받는 input)
    creatList(9, inputValue);
});



function creatList(n, el) {
    var date = new Date().toLocaleString();
    var $contentInner = $(".content_inner");
    var target =  el.val();
    var $gugudan = el.closest(".gugudan");
    var $result = $gugudan.find(".result_wrap");    
    var $list = $("<ul>");
    var $log = $contentInner.find(".log");
    var $searchLog = $log.find(".search_log");
    var viewConut = n;
    var arr = [];

    // $.isNumeric() 숫자 판별 함수
    // isNaN 
    if (target.length == 0) { //input이 비어있는경우
        alert("숫자를 입력해 주세요.");
        $result.empty(); //조건 부적합시 출력내용 초기화
        target = el.val(''); //조건 부적합시 input내용 초기화
        return;
    } else if (!$.isNumeric(target)) { //input 입력값이 숫자가 아닌 경우
        alert("숫자만 입력해 주세요.");
        $result.empty();
        target = el.val('');
        return;
    }

    //출력 내용 초기화 후 검색내용 재출력
    $result.empty();
    $result.append($list);

    //for문 사용하여 viewConut값 만큼 구구단 값 구하여 arr에 배열로 저장 및 출력
    for(var i = 1; i <= viewConut; i++ ) {
        //입력받은 값 구구단 계산되어 arr에 저장
        arr.push(target * i);
        // arr[i-1] = target * i;
        $list.append(
            $("<li>").text(target +" * " + i +" = "+ arr[i-1] )
        );
    }
    // console.log(arr);
    //로그만들기 함수 실행
    creatLog($log, arr, $searchLog, date);

    // $log.css({
    //     opacity: 1
    // });
    // //arr에서 쓰인값 gugudan에 배열 앞부분으로 저장 (로그창에 출력시 0번째 array로 구하기 위함)
    // gugudan.unshift(arr);
    // //log 최근내용 상단위치 prepend
    // $searchLog.prepend(
    //     $("<tr>").append(
    //         $("<td>").text(gugudan.length + ".") //순서값
    //     ).append(
    //         $("<td>").text(arr[0]) //출력한 구구단 단계
    //     ).append(
    //         $("<td>").text(gugudan[0]) //구구단 값
    //     ).append(
    //         $("<td>").text(date)
    //     )
    // );

    // console.log(arr);
    // console.log(arr[1]);
    // console.log(gugudan);

    //input 내용 초기화
    target = el.val('');
}



/* log 조회하기 */
$(document).on("click", ".btn_search_log", function(){
    var searchValue = prompt("조회하실 log순번을 입력해 주세요.");
    // console.log(searchValue);
    logSearch(searchValue);
});

//로그만들기
function creatLog($log, arr, $searchLog, date) {
    $log.css({
        opacity: 1
    });
    gugudan.push(arr);
    //log 최근내용 상단위치 prepend
    $searchLog.prepend(
        $("<tr>").append(
            $("<td>").text(gugudan.length + ".") //순서값
        ).append(
            $("<td>").text(arr[0]) //출력한 구구단 단계
        ).append(
            $("<td>").text(gugudan[gugudan.length-1]) //구구단 값, gugudan 배열에 push로 추가했기 때문에 전체 배열의 뒷자리를 구함
        ).append(
            $("<td>").text(date)
        )
    );
}

//로그조회하기
function logSearch(el) {
    var searchTarget = gugudan[el-1];
    if(0 <= el-1) {
        if(el-1 < gugudan.length) {
            alert("해당 log의 값은 " + searchTarget[0] + "단 " + searchTarget + " 입니다.");
        }else{ 
            alert("존제하지 않는 log입니다.\n\n다시 확인해 주세요.");
        }
    }else if( 0 > el-1 || gugudan.length == 0){  //0번째 로그 검색, 로그 초기화후 조회 할 경우
        alert("존제하지 않는 log입니다.\n\n다시 확인해 주세요.");
    // console.log(searchTarget);
    }
    if (!$.isNumeric(el)) {  //숫자 이외 문자 입력시
        alert("존제하지 않는 log입니다.\n\n숫자만 입력해 주세요.");
    }
}



//전체 구구단 출력창 지우기
$(document).on("click", ".btn_reset_log", function(){
    logReset();
});

//전체 로그 초기화
function logReset() {
    var $contentInner = $(".content_inner");
    var $log = $contentInner.find(".log");
    var $searchLog = $log.find(".search_log");
    gugudan = [];
    $searchLog.empty();
    allResultReset();
}

//전체 구구단 출력창 지우기
function allResultReset() {
    var $target = $(".result_wrap");
    $target.empty();
}



//해당 구구단 출력창 지우기
$(document).on("click", ".btn_gugudan_reset", function(){
    resultReset($(this));
});

//해당 구구단 출력창 지우기
function resultReset(el) {
    var $gugudan = el.closest(".gugudan");
    var $target = $gugudan.find(".result_wrap");
    $target.empty();
}



