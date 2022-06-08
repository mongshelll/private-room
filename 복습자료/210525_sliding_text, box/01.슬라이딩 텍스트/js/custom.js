

$(".txt1")
.append(
  $("<em class='mask'>").css({
    display: "block",
    width: "100%",
    height: "100%",
    backgroundColor: "#111",
    position: "absolute",
    top: 0,
    left: "-100%"
  })
);

$(".txt1").find(".mask").stop().animate({
  left: 0
}, 700, "easeInExpo", function(){
  $(this).prev("span").css({
    opacity: 1
  });
  $(this).stop().animate({
    left: "100%"
  }, 700, "easeInExpo", function(){
    $(this).remove();
  });
});