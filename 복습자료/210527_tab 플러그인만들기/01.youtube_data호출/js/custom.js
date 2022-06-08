//AIzaSyDcqePi8_ewVabkUUFxrdkZiF3xo16LBes

//ajax로 데이터 불러오기
$.ajax({
	url: 'https://www.googleapis.com/youtube/v3/playlistItems', //데이터를 불러올 주소
	dataType: 'jsonp', //외부에서 불러오기때문에 jsonp
	data: {
		part: 'snippet',
		key: 'AIzaSyDcqePi8_ewVabkUUFxrdkZiF3xo16LBes',
		maxResults: 5, //가져올 영상(데이터) 갯수
		playlistId: 'PLoIl8ul_XWuUm2DpZwMZSbJhSvJ-ebRyp' //플레이 리스트 주소
	}
})
.success(function(data){
	var item = data.items;
	console.log(item);
	$(item).each(function(index, data){
		//body > article > a > img : data.snippet.thumbnails.high.url
		//               > h2 + p + span

		$("body").append(
			$("<article>")
			.append(
				$("<a href='#'>")
				.append(
					$("<img>").attr({ src: data.snippet.thumbnails.high.url})
				)
			),
			$("<h2>").text(data.snippet.title),
			$("<p>").text(data.snippet.description),
			$("<span>").text(data.snippet.publishedAt)
		)
	})
})
.error(function(err){
	console.log(err);
})