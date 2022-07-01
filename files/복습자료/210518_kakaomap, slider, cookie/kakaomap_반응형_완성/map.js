var container = document.getElementById('map');
var branch_btns = document.querySelectorAll(".branch li");

var options = { //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(37.5130525, 127.0582537), //지도의 중심좌표.
	level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

//option -----------------------------------------------------------


// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.BOTTOMRIGHT);



var markerOptions = [
	{
		title: "본점",
		latlng: new kakao.maps.LatLng(37.5130525, 127.0582537),
		imgSrc: 'img/marker1.png',
		imgSize: new kakao.maps.Size(232, 99),
		imgPos: {
			offset: new kakao.maps.Point(116, 99)
		},
		button: branch_btns[0]
	},
	{
		title: "지점1",
		latlng: new kakao.maps.LatLng(37.507025, 126.7541541),
		imgSrc: 'img/marker2.png',
		imgSize: new kakao.maps.Size(232, 99),
		imgPos: {
			offset: new kakao.maps.Point(116, 99)
		},
		button: branch_btns[1]
	},
	{
		title: "지점2",
		latlng: new kakao.maps.LatLng(38.1195495, 128.4567819),
		imgSrc: 'img/marker3.png',
		imgSize: new kakao.maps.Size(232, 99),
		imgPos: {
			offset: new kakao.maps.Point(116, 99)
		},
		button: branch_btns[2]
	}
];

for (var i = 0; i < markerOptions.length; i++) {
	new kakao.maps.Marker({
		map: map,
		position: markerOptions[i].latlng,
		title: markerOptions[i].title,
		image: new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos)
	});

	(function (index) {
		markerOptions[index].button.onclick = function (e) {

			e.preventDefault();
			for (var k = 0; k < markerOptions.length; k++) {
				markerOptions[k].button.classList.remove("on");
			}
			markerOptions[index].button.classList.add("on");
			moveTo(markerOptions[index].latlng);
		}
	})(i);
}

window.onresize = function () {
	var active_btn = document.querySelector(".branch li.on");
	var active_index = active_btn.getAttribute("data-index");
	console.log(active_index);
	map.setCenter(markerOptions[active_index].latlng);
}




function moveTo(target) {
	var moveLatLon = target;
	map.setCenter(moveLatLon);
}

var t_on = document.querySelectorAll(".traffic li")[0];
var t_off = document.querySelectorAll(".traffic li")[1];

t_on.addEventListener("click", function (e) {
	e.preventDefault();

	map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	t_on.classList.add("on");
	t_off.classList.remove("on");
});
t_off.addEventListener("click", function (e) {
	e.preventDefault();
	map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	t_on.classList.remove("on");
	t_off.classList.add("on");
});

setDraggable(true);

function setDraggable(draggable) {
	// 마우스 드래그로 지도 이동 가능여부를 설정합니다
	map.setDraggable(draggable);
}


setZoomable(true); //false
function setZoomable(zoomable) {
	// 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
	map.setZoomable(zoomable);
}