callData({
	target:".swiper-wrapper",
	key:'AIzaSyAIcZ79qpfKEHRolkRWkCiyx8-8o0Wsjro',
	count:5,
	playlist:'PLYOPkdUKSFgUwLVFuHcpMY2tXYdTJ68dT'
});

$("body").on("click",".swiper-slide .pic", function(e){
	e.preventDefault();

	var vidId = $(this).attr("href");

	createPop({
		width:"100%",
		height:"100vh",
		background:"rgba(0,0,0,0.9)",
		vidId : vidId
	});

	$("body").css({ overflow:"hidden"});
});

$("body").on("click", ".pop .close", function(e){
	e.preventDefault();

	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});

	$("body").css({ overflow:"auto"});
})


function createPop(opt){
	$("body")
		.append(
			$("<aside class='pop'>")
				.css({
					width:opt.width,
					height:opt.height,
					background:opt.background,
					position:"fixed",
					top:"50%",
					left:"50%",
					transform:"translate(-50%,-50%)",
					padding:100,
					boxSizing:"border-box"
				})
				.append(
					$("<a class='close' href='#'>")
						.text("close")
						.css({
							position:"absolute",
							top:20,
							right:20,
							color:"#fff"
						}),
					$("<img src='img/loading.gif'>")
						.css({
							width:400,
							position:"absolute",
							top:"50%",
							left:"50%",
							transform:"translate(-50%,-50%)",
						}),
					$("<div class='con'>")
						.css({
							width:"100%",
							// height:"100%",
							position:"relative",
							display:"none"
						})
						.append(
							$("<iframe>")
								.attr({
									src : "https://www.youtube.com/embed/"+ opt.vidId,
									width:"100%",
									height:600,
									frameborder:0,
									allowfullscreen:true
								})
						)
				)
		)

		setTimeout(function(){
			$(".pop .con").fadeIn(500, function(){
				$(this).prev().remove();
			});
		},1000);
}




function callData(opt){
	$.ajax({
		url:'https://www.googleapis.com/youtube/v3/playlistItems',
		dataType:'jsonp',
		data:{
			part:'snippet',
			key:opt.key,
			maxResults:opt.count,
			playlistId:opt.playlist
		}
	})
	.success(function(data){

		var item = data.items;
		console.log(item);

		$(item).each(function(index, data){

			var p_txt = data.snippet.description;
			var len = p_txt.length;
			if(len> 80){
				p_txt = p_txt.substr(0, 80)+"..."
				}
			var date = data.snippet.publishedAt;
			date = date.split("T")[0];

			$(opt.target)
				.append(
				$("<div class='swiper-slide'>")
					.append(
						$("<a class='pic'>")
							.attr({
								href : data.snippet.resourceId.videoId
							})
							.css({
								backgroundImage:"url("+ data.snippet.thumbnails.high.url +")"
							}),
						$("<div class='con'>")
							.append(
								$("<h2>").text(data.snippet.title),
								$("<p>").text(p_txt),
								$("<span>").text(date)
							)
					)
			)
		});

		var swiper = new Swiper("#wrap",{
			direction : "horizontal",
			loop : true,
			navigation : {
				nextEl : ".swiper-button-next",
				prevEl : ".swiper-button-prev"
			},
			spaceBetween : 0,
			slidesPerView : "auto",
			centeredSlides : true,
			effect : "coverflow",
			coverflowEffect : {
				rotate: 50,
				stretch: -100,
				depth: 400,
				modifier: 1,
				slideShadows: false,
			}
		});

	})
	.error(function(err){
		console.log(err);
	})
}