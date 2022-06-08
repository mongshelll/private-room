/*
ajax
*/

$.ajax({
	url:"data.json",
	dataType:"json"
})
.success(function(data){
	console.log(data);
})
.error(function(err){
	console.log("데이터를 불러오는데 실패했습니다!");
})
