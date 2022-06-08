

//AIzaSyDcqePi8_ewVabkUUFxrdkZiF3xo16LBes
//브라우저 로딩시 youtube데이터 호출 및 DOM생성
callData({
	target: "#vidGallery",
	key: 'AIzaSyDcqePi8_ewVabkUUFxrdkZiF3xo16LBes',
	count: 5,
	playlist: 'PLoIl8ul_XWuUm2DpZwMZSbJhSvJ-ebRyp'
});

$("body").on("click", "article a", function (e) {
	e.preventDefault();
	var vidId = $(this).attr("href");
	createPop({
		width: "100%",
		height: "100vh",
		bg: "rgba(0,0,0,0.9)",
		vidId: vidId
	});

	$("body").css({
		overflow: "hidden"
	})
});

$("body").on("click", ".pop .close", function (e) {
	e.preventDefault();
	$(this).parent(".pop").remove();

	$("body").css({
		overflow: "auto"
	})
});

function createPop(opt) {
	$("body")
		.append(
			$("<aside class='pop'>")
			.css({
				width: opt.width,
				height: opt.height,
				backgroundColor: opt.bg,
				position: "fixed",
				top: "50%",
				left: "50%",
				transform: "translate(-50%,-50%)",
				boxSizing: "border-box",
				padding: 50
			})
			.append(
				$("<a href='#' class='close'>")
				.text("close")
				.css({
					position: "absolute",
					top: 20,
					right: 20,
					color: "#fff"
				}),
				$("<img src='img/loading.gif'>")
				.css({
					width: 400,
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%,-50%)"
				}),
				$("<div class='con'>")
				.css({
					width: "100%",
					height: "100%",
					position: "relative",
					display: "none"
				})
				.append(
					$("<iframe>")
					.attr({
						src: "https://www.youtube.com/embed/" + opt.vidId,
						frameborder: 0,
						allowfullscreen: true,
						width: "100%",
						height: 600
					})
				)
			)
		)
	setTimeout(function(){
		$(".pop .con").fadeIn(500, function(){
			$(this).prev().remove();
		});
	}, 500)
}

//유튜브 데이터 호출 함수
function callData(opt) {
	$.ajax({
			url: 'https://www.googleapis.com/youtube/v3/playlistItems',
			dataType: "jsonp",
			data: {
				part: 'snippet',
				key: opt.key,
				maxResults: opt.count,
				playlistId: opt.playlist
			}
		})
		.success(function (data) {
			var item = data.items;
			console.log(item);
			$(item).each(function (index, data) {
				var p_txt = data.snippet.description;
				var len = p_txt.length;
				(len > 80) ? p_txt = p_txt.substr(0, 80) + "...": p_txt;
				var date = data.snippet.publishedAt;
				console.log(date);
				var date = data.snippet.publishedAt.split("T")[0];
				$(opt.target).append(
					$("<div class=''swiper-slide>")
					.append(
						$("<a class='pic'>")
						.attr({
							href: data.snippet.resourceId.videoId
						})
						.css({
							backgroundImage: "url(" + data.snippet.thumbnails.high.url + ")"
						}),
						$("<div class='con'>")
						.append(
							$("<h2>").text(data.snippet.title),
							$("<p>").text(p_txt),
							$("<span>").text(date)
						)
					)
				)
			})
			var swiper = new Swiper("#wrap", {
				effect: "coverflow",
				direction:"horizental",
				loop:true,
				navigation:{
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev"
				},
				spaceBetween:0,
				slidesPerView:"auto",
				centeredSlides:true,
				coverflowEffect:{
						rotate:50, //슬라이드 회전각도
						stretch:-100, //슬라이더 간 거리 (클수록 슬라이더가 많이 겹침, 작을수록 간격이 벌어짐 )
						depth:400, //원근감 (깊이 - 클수록 멀리있는 느낌이 강해짐 )
						modifier:1, //적용된 속성을 전반적으로 증감효과
						slideShadows:false, //패널의 그림자 생성 유무
				}
		});
		})
		.error(function (err) {
			console.log(err);
		});
}