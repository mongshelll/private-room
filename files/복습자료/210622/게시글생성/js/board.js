/*
var studentA = {
	name: "홍길동",
	age: 20,
	gender: "male",
	address: "seoul"
}

console.log(studentA["name"]); //value 값

for(let obj in studentA){
	console.log(obj); //key값
	console.log(studentA[obj]); //value 값
}
*/


//데이터 호출해서 배열값 리턴
var url = "data/board.json";
var resultData = callData(url);

var $frame = $(".community .inner");
createTable($frame, resultData);


//데이터호출 함수 정의
function callData(url) {
	var result;

	$.ajax({
			url: url,
			dataType: "json",
			async: false //동기화설정 ajax가 끝나야 return작동
		})
		.success(function (data) {
			console.log(data);

			for(let obj in data){
				console.log(obj);
			}
			result = data.data;
		})
		.error(function (err) {
			console.error(err);
		});

	return result;
}

//테이블 생성 함수 정의
function createTable(target, items) {

	//상단 thead와 tbody생성
	target.append(
		$("<table>")
		.attr("summary", "게시판의 번호, 제목, 작성자, 작성일")
		.append(
			$("<caption class='h'>").text("일반 게시판"),
			$("<thead>")
			.append(
				$("<tr>")
				.append(
					"<th scope='col'>번호</th>",
					"<th scope='col'>게시글 제목</th>",
					"<th scope='col'>작성자</th>",
					"<th scope='col'>작성일</th>",
				)
			),
			$("<tbody>")
		)
	);

	$(items).each(function (index, data) {
		target.find("tbody")
			.prepend(
				$("<tr>")
				.append(
					$("<td>").text(index + 1),
					$("<td>")
					.append(
						$("<a>").attr("href", data.link).text(data.title)
					),
					$("<td>").text(data.writer),
					$("<td>").text(data.date)
				)
			)
	})
}