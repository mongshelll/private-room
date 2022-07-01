const navi_li = $(".navi li");
const article = $("section article");
const speed = 600;
const delay = convertSpeed(article.find("ul"));
console.log(delay);
let isAnimated = true;

//처음 로딩시 첫 패널 활성화
setTimeout(function(){
    activation(0);
},1000);


//네비버튼 이벤트 연결
navi_li.on("click",function(){ 
    let isOn = $(this).hasClass("on");
    if(isOn) return;

    if(isAnimated){
        isAnimated = false;
        let i = $(this).index();
        activation(i);
    }    
});

//활성화 함수 정의
function activation(index){
    navi_li.removeClass("on");
    navi_li.eq(index).addClass("on");

    article.css({zIndex: 1});
    article.eq(index)
        .css({zIndex:2})
        .stop().animate({ left: "0%"},speed, function(){
            $(this).addClass("on");

            //현재 순번의 활성화 패널이 왼쪽으로 슬라이딩 끝나면
            //현재 활성화된 패널만 제외한
            //나머지 모든 패널 비활성화 
            article.not(this).removeClass("on");
            article.not(this).css({ left: "100%"});

            //모든 모션이 끝나면 다시 이벤트 연결가능
            setTimeout(function(){
                isAnimated = true;
            },delay);            
        }
    );
}

function convertSpeed(el){
    let dur = el.css("transition-duration");
    let delay = el.css("transition-delay");
    dur = dur.split("s")[0]*1000;
    delay = delay.split("s")[0]*1000;
    let result = dur+delay;
    return result;
}