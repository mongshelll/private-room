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
				//p_txt에 설명글 부분을 담아서 가공
				var p_txt = data.snippet.description;
				var len = p_txt.length; //설명글 길이를 구해서
				(len > 80) ? p_txt = p_txt.substr(0, 80) + "...": p_txt;
				//80글자가 넘는다면 80글자까지 자르고 ... 붙임, 80글자가 넘지 않는다면 그대로
				var date = data.snippet.publishedAt;
				console.log(date);
				var date = data.snippet.publishedAt.split("T")[0];
				$(opt.target).append(
					$("<article>")
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
		})
		.error(function (err) {
			console.log(err);
		});
}