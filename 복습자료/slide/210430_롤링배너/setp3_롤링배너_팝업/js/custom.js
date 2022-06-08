var $banner = $("#banner");
var $list = $banner.find(".list");
var $prev = $banner.find(".prev");
var $next = $banner.find(".next");

var wid = $list.children("li").outerWidth();
var len = $list.children("li").length;
var total_wid = wid * len;
var i = -wid;
var speed = 500;
var timer;
var isDone = true;

$list.css({
  width: total_wid,
  marginLeft: -wid
});

timer = setInterval(move, 20);

$banner.on("mouseenter", function(){
  clearInterval(timer);
});
$banner.on("mouseleave", function(){
  timer = setInterval(move, 20);
});

$next.on("click", function(e){
  e.preventDefault();
  if(isDone){
    next();
    isDone = false;
  }  
});

$prev.on("click", function(e){
  e.preventDefault();
  if(isDone){
    prev();
    isDone = false;
  }  
});

$list.children("li").on("click", function(e){
  e.preventDefault();

  var url = $(this).children("a").attr("href");
  $(".pop").remove();
  createPop(url, 1000);
  // $(".pop .close").on("click", function(){
  //   $(".pop").fadeOut(500, function(){
  //     $(this).remove();
  //   });
  // }) //이렇게 넣으면 안된다고 함
})

$("body").on("click", ".pop .close", function(){
  $(".pop").fadeOut(500, function(){
    $(this).remove();
  });
})

function createPop(imgSrc, wid){
  $("body").append(
    $("<aside class='pop'>").css({
      width: wid,
      backgroundColor: "rgba(0,0,0,0.9)",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -70%)",
      boxSize: "border-box",
      padding: 50,
      display: "none"
    }).append(
      $("<div class='content'>").css({
        width: "100%",
        minHeight: 200,
        border: "1px solid #888",
        marginBottom: 20
      }).append(
        $("<img>").attr({
          src: imgSrc
        }).css({
          width: "100%"
        })
      )
    )
    .append(
      $("<a class='close'>").text("close").attr({
        href: "#"
      }).css({
        font: "bold 12px/1 'arial'",
        color: "#bbb"
      })
    )
    .fadeIn(1000)
  )
}

function next(){
  $list.stop().animate({
    marginLeft: -wid * 2
  }, speed, function(){
    $list.children("li").first().appendTo($list);
    $list.css({
      marginLeft: -wid
    });
    i = -wid;
    isDone = true;
  })
}

function prev(){
  $list.stop().animate({
    marginLeft: 0
  }, speed, function(){
    $list.children("li").last().prependTo($list);
    $list.css({
      marginLeft: -wid
    });
    i = -wid;
    isDone = true;
  })
}

function move(){
  if(i <= -wid * 2){
    i = -wid;
    $list.children("li").first().appendTo($list);
  }else{
    i--;
  }
  $list.css({marginLeft: i});
}