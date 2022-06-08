var bgColor = $(".tit1").css("color");

$(".tit1").append(
  $("<div class='mask'>").css({
    width: "100%",
    height: "100%",
    backgroundColor: bgColor,
    position: "absolute",
    top: 0,
    left: "-100%"
  })
);

$(".tit1").find(".mask").stop().delay(500).animate({
  left: 0
}, 1000, "easeInExpo", function(){
  $(this).prev("span").css({
    opacity: 1
  });
  $(this).stop().animate({
    left: "100%"
  }, 1000, "easeInExpo", function(){
    $(this).remove();
  })
})