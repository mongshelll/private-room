var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(37.56063345559592, 126.83687515312886), //지도의 중심좌표.
	level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도 타입 컨트롤을 지도에 표시합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);


var markerOptions = [
	{
		title: '집',
		latlng: new kakao.maps.LatLng(37.56063345559592, 126.83687515312886),
		imgSrc: 'img/marker1.png',
		imgSize: new kakao.maps.Size(232, 99),
		imgPos: { offset: new kakao.maps.Point(116, 99)},
		button: document.querySelectorAll(".branch li")[0]
	},
	{
		title: '근정전',
		latlng: new kakao.maps.LatLng(37.57853560231513, 126.97698079197039),
		imgSrc: 'img/marker2.png',
		imgSize: new kakao.maps.Size(232, 99),
		imgPos: { offset: new kakao.maps.Point(116, 99)},
		button: document.querySelectorAll(".branch li")[1]
	},
	{
		title: '한라산',
		latlng: new kakao.maps.LatLng(33.362257196582355, 126.53349026949175),
		imgSrc: 'img/marker3.png',
		imgSize: new kakao.maps.Size(232, 99),
		imgPos: { offset: new kakao.maps.Point(116, 99)},
		button: document.querySelectorAll(".branch li")[2]
	}
];

for(var i=0; i< markerOptions.length; i++){
	new kakao.maps.Marker({
		map:map,
		position:markerOptions[i].latlng,
		title: markerOptions[i].title,
		image: new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos)
	});

	(function(index){
		markerOptions[index].button.onclick = function(){
			moveTo(markerOptions[index].latlng);
			// console.log(index);
		}
	})(i);
}

function moveTo(target){
	var moveLatLon = target;
	map.setCenter(moveLatLon);
}

var t_on = document.querySelectorAll(".traffic li")[0];
var t_off = document.querySelectorAll(".traffic li")[1];

t_on.addEventListener("click", function(e){
	e.preventDefault();
	// 지도에 교통정보를 표시하도록 지도타입을 추가합니다
	map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	t_on.classList.add("on");
	t_off.classList.remove("on");
});

t_off.addEventListener("click", function(e){
	e.preventDefault();
	// 아래 코드는 위에서 추가한 교통정보 지도타입을 제거합니다
	map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	t_on.classList.remove("on");
	t_off.classList.add("on");
});


setZoomable(true); //false
// 버튼 클릭에 따라 지도 확대, 축소 기능을 막거나 풀고 싶은 경우에는 map.setZoomable 함수를 사용합니다
function setZoomable(zoomable) {
	// 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
	map.setZoomable(zoomable);
}

setDraggable(true); //false
// 버튼 클릭에 따라 지도 이동 기능을 막거나 풀고 싶은 경우에는 map.setDraggable 함수를 사용합니다
function setDraggable(draggable) {
	// 마우스 드래그로 지도 이동 가능여부를 설정합니다
	map.setDraggable(draggable);
}


window.onresize = function(){
	var active_btn = document.querySelector(".branch li.on");
	var active_index = active_btn.getAttribute("data-index");
	map.setCenter(markerOptions[active_index].latlng);
}