/*
1. dt를 클릭했을 때 해당 dd를 보여줌
2. 해당하지 않는 dd는 숨김처리
3. 클릭한 dt는 활성화, 나머지 비활성화
*/

var $frame = $("#wrap");
var $btns = $frame.find("dt");
var $boxs = $frame.find("dd");
var speed = 500;
var enableClick = true;


$btns.on("click", function(e){
  e.preventDefault();

  if(enableClick){
    activation(this);
    enableClick = false;
  }
});

function activation(self){
  var isOn = $(self).hasClass("on");
  if(isOn){
    $(self).removeClass("on");
    $(self).next("dd").slideUp(speed, function(){
      enableClick = true;
    });
  }else{
    $(self).addClass("on");
    $(self).next("dd").slideDown(speed, function(){
      enableClick = true;
    });
  }
}







/*
.slideUp() :  hide()와 같이 숨김처리
.sildeDown() : show()와 같이 보이게 처리
*/