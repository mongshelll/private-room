

$(document).on("click", ".prev_btn", function(){
    perv($(this));
});

$(document).on("click", ".next_btn", function(){
    next($(this));

    if($(this).text("시작")){
        $(this).text("다음");
    }
});



//num 값 컨트롤이 문제
var num = 0;

function perv(el) {
    if(num <= 1) {
        return;
    }
    num--;
    creatList(el ,num);
}

function next(el) {
    if(num >= 9) {
        return;
    }
    num++;
    creatList(el, num);
}

function creatList(el, num) {
    var $resultWrap = el.closest(".gugudan");
    var $result = $resultWrap.find(".result_wrap");
    var $contentTile = $resultWrap.find(".content_title p");
    var $list = $("<ul>");
    
    $result.empty();
    $result.append($list);

    for(var i = num; i <= num; i++) {
        $contentTile.text(i +"단")
        for(var j = 1; j <= 9; j++) {
            $list.append(
                $("<li>").text(i +" * "+ j + " = " + i * j)
                );
        }
    }

    // for(var i = 1; i <= 9; i++ ) {
    //     $contentTile.text( num +"단")
    //     $list.append(
    //         $("<li>").text(num +" * "+ i + " = " + num * i)
    //     );
    // }
}

function inOrDe(el1, el2) {
    
}