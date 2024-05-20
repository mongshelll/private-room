/**
 * maps key
 * AIzaSyCaAKZQ-rzU_T33SI9lZ48rfvbAPZLKT0Q
 */

/**
 * google maps key 값
 */
const maps_key = 'AIzaSyCaAKZQ-rzU_T33SI9lZ48rfvbAPZLKT0Q';

/**
 * google maps 부트스트랩 로더를 통하여 Maps JavaScript API를 로드
 */
(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
	key: maps_key,
	v: "weekly",
	// Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
	// Add other bootstrap parameters as needed, using camel case.
});




let map, map02;

// 마커 리스트
const spots = [
	[{ lat: 37.574477, lng: 126.843992 }, "가양 나들목(마곡)"],
	[{ lat: 37.554755, lng: 126.895443 }, "망원한강공원(망원)"],
	[{ lat: 37.526377, lng: 126.935291 }, "여의도한강공원(여의도)"],
	[{ lat: 37.522814, lng: 127.013412 }, "잠원한강공원(잠원)"],
	[{ lat: 37.540049, lng: 127.018736 }, "옥수(옥수)"],
	[{ lat: 37.529366, lng: 127.069952 }, "뚝섬한강공원(뚝섬)"],
	[{ lat: 37.518491, lng: 127.081609 }, "이랜드크루즈 잠실선착장(잠실)"],
]

let shipPos = [
	[{ lat: 37.545973, lng: 126.895501 }, "ship01"],
	[{ lat: 37.539672, lng: 126.907624 }, "ship02"],
	[{ lat: 37.512273, lng: 126.964288 }, "ship03"],
	[{ lat: 37.512286, lng: 126.992653 }, "ship04"],
	[{ lat: 37.527754, lng: 127.015848 }, "ship05"],
	[{ lat: 37.52014, lng: 127.080187 }, "ship06"],
	[{ lat: 37.531256, lng: 127.059349 }, "ship07"],
	[{ lat: 37.523207, lng: 127.003163 }, "ship08"],
]

async function initMap() {
	const { Map } = await google.maps.importLibrary("maps");
	// const { AdvancedMarkerView } = await google.maps.importLibrary("marker"); // 아직 미지원??
	const { Marker } = await google.maps.importLibrary("marker"); // 곧 deprecated 예정??
	const initialLocation = { lat: 37.553639, lng: 126.961871 }; // 초기 위치값 변수에 저장
	const zoom = 12; // zoom 초기 값 변수에 저장

	// 고정 위치값
	// 값 구한 기준 - zoom을 1단계 낮추고 브라우저 개발자도구 콘솔에 map.getBounds() 찍어서 화면에 나오는 좌표 확인
	const hanLiverBounds = {
		north: 37.66243163705181, // Zh: hi
		south: 37.44468731326822, // Zh: lo
		west: 126.55949673242185, // Jh: hi
		east: 127.3642452675781, // Jh: lo
	}

	// 인포 말풍선 생성
	const infoWindow = new google.maps.InfoWindow({
		content: "",
		disableAutoPan: true, // infoWindow 열었을 때 창 전체에 포커스 적용 / default: false : 열었을 때 닫기 버튼에 포커스 적용
	});

	// 스타일 커스텀
	const styledMapType01 = new google.maps.StyledMapType([
		{
			"featureType": "administrative",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "landscape",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "poi",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "road",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "transit",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "water",
			"elementType": "labels",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		}
	],
	{ name: "Styled Map01" })

	const styledMapType02 = new google.maps.StyledMapType([
		{
			"featureType": "administrative",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "landscape",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "poi",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "road",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "on"
				}
			]
		},
		{
			"featureType": "road",
			"elementType": "labels",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "transit",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "on"
				}
			]
		},
		{
			"featureType": "transit",
			"elementType": "labels",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "water",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "on"
				}
			]
		},
		{
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#12608d"
				}
			]
		},
		{
			"featureType": "water",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "water",
			"elementType": "labels.text.stroke",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		}
	],
	{ name: "Styled Map02" })

	/**
	 * map
	 */
	// 맵 생성
	map = new Map(document.getElementById("map"), {
		center: initialLocation, // 초기 위치
		zoom: zoom,
		maxZoom: zoom + 2,
		minZoom: zoom - 1,
		mapId: "DEMO_MAP_ID",
		disableDefaultUI: true, // 기본 ui 숨김처리
		// zoomControl: true, // 확대/축소
		mapTypeControl: true, // 지도 유형 선택
		// mapTypeControlOptions: { // 컨트롤러 모양 선택 // mapTypeControlOptions있으면 적용 안됨
		// 	style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
		// },
		// scaleControl: true, // 축척표시
		// streetViewControl: true, // 스트리트 뷰
		// rotateControl: true, // 화면 회전 활성화/비활성화
		// fullscreenControl: true, // 전체화면 보기

		// 확대/축소 금지
		// gestureHandling: "none",
		zoomControl: false,

		// 최대 위치값 고정
		restriction: {
			latLngBounds: hanLiverBounds
		},

		// 지도유형 선택 목록옵션
		mapTypeControlOptions: {
			// mapTypeIds: ["roadmap", "terrain", "satellite", "hybrid"],
			mapTypeIds: ["styled_map01", "styled_map02"],
		},
	});

	// mapType 목록에 추가
	map.mapTypes.set("styled_map01", styledMapType01);
	map.mapTypes.set("styled_map02", styledMapType02);
	map.setMapTypeId("styled_map01"); // 기본으로 노출되는 mapType 지정

	// 마커 SVG 아이콘
	const svgMarker = {
		path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
		fillColor: "magenta",
		fillOpacity: 0.7,
		strokeWeight: 0,
		rotation: 0,
		scale: 2,
		anchor: new google.maps.Point(0, 20),
	};

	// 마커 생성
	spots.forEach(([position, title], i) => {
		const marker = new Marker({
			map: map,
			position: position,
			title: `${title}`,
			// title: `${i +1}.${title}`,
			// label: `${i +1}`,
			icon: svgMarker,
			// label: {
			// 	text: title,
			// 	className: 'marker-label'
			// }
		});

		// 마커에 클릭 이벤트
		marker.addListener("click", () => {
			// 인포 말풍선 온/오프
			infoWindow.close(); // 열려있는 infoWindow 닫기
			infoWindow.setContent(marker.getTitle()); // infoWindow에 marker title 받아서 텍스트 넣기
			infoWindow.open(marker.getMap(), marker); // infoWindow marker 위치에 열기

			// map.setCenter(position); // 사용가능

			// zoom에 변화가 없는경우 애니매이션이 없음. 강제로 약간의 zoom변화를 주면 애니매이션이 적용 됨
			if(map.getZoom() == zoom) {
				map.setZoom(zoom + 1);
				map.setCenter(marker.getPosition());
			} else {
				map.setZoom(zoom + 0.99);
				setTimeout(() => {
					map.setZoom(zoom + 1);
					map.setCenter(marker.getPosition());
				}, 50);
			}

			// 모달 열기
			const target = document.querySelector('.modal');
			if (!target.classList.contains('on')) {
				target.classList.add('on');
			}
			// 모달에 내용 넣기
			target.querySelector('p').textContent = marker.getTitle();
		});
	});

	shipPos.forEach(([position, title], i) => {
		const marker = new Marker({
			map: map,
			position: position,
			title: `${title}`,
			label: {
				text: title,
				className: 'marker-label'
			},
		});

		// 마커에 클릭 이벤트
		marker.addListener("click", () => {
			// 인포 말풍선 온/오프
			infoWindow.close(); // 열려있는 infoWindow 닫기
			infoWindow.setContent(marker.getTitle()); // infoWindow에 marker title 받아서 텍스트 넣기
			infoWindow.open(marker.getMap(), marker); // infoWindow marker 위치에 열기

			// zoom에 변화가 없는경우 애니매이션이 없음. 강제로 약간의 zoom변화를 주면 애니매이션이 적용 됨
			if(map.getZoom() == zoom) {
				map.setZoom(zoom + 1);
				map.setCenter(marker.getPosition());
			} else {
				map.setZoom(zoom + 0.99);
				setTimeout(() => {
					map.setZoom(zoom + 1);
					map.setCenter(marker.getPosition());
				}, 100);
			}

			// 모달 열기
			const target = document.querySelector('.modal');
			if (!target.classList.contains('on')) {
				target.classList.add('on');
			}
			// 모달에 내용 넣기
			target.querySelector('p').textContent = marker.getTitle();
		});
	})

	// 모달 닫기버튼 함수
	const btnClose = document.querySelector('.btn');
	btnClose.addEventListener("click", (e) => {
		e.target.closest('.modal').classList.remove('on');
		infoWindow.close(); // 인포 말풍선 닫기

		map.setCenter(initialLocation);
		map.setZoom(zoom);
	});

	// infoWindow 에서 닫기 하는 경우
	const targetModal = document.querySelector('.modal');
	infoWindow.addListener('closeclick', () => {
		targetModal.classList.remove('on');
		map.setCenter(initialLocation);
		map.setZoom(zoom);
	});

	/**
	 * 커스텀 버튼 추가
	 */
	// 초기화면으로 돌아가기 버튼
	const initialLocationButton = document.createElement("button"); // 버튼생성
	initialLocationButton.setAttribute('type', 'button');
	initialLocationButton.textContent = "화면 초기화";
	initialLocationButton.classList.add("initial-location-btn");
	map.controls[google.maps.ControlPosition.LEFT_CENTER].push(initialLocationButton); // 좌측 중앙에 버튼 위치
	initialLocationButton.addEventListener("click", () => {
		map.setCenter(initialLocation);
		map.setZoom(zoom);
	});

	// 현재 위치 트래킹
	const locationButton = document.createElement("button"); // 버튼생성
	locationButton.setAttribute('type', 'button');
	locationButton.textContent = "현재 위치";
	locationButton.classList.add("custom-map-control-button");
	map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton); // 상단 중앙에 버튼 위치
	locationButton.addEventListener("click", () => {
		// Try HTML5 geolocation.
		if (navigator.geolocation) { // 위치확인 사용가능 브라우저 - navigator.geolocation.getCurrentPosition(성공, 에러, [옵션])
			navigator.geolocation.getCurrentPosition( (position) => {
					const pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					};

					infoWindow.setPosition(pos); // 현재 위치에 infoWindow open
					infoWindow.setContent(pos.lat+', ' + pos.lng + " Location found."); // infoWindow에 내용 넣기
					infoWindow.open(map); // map에 해당하는 위치에 열기
					map.setCenter(pos); // 현재위치 위도, 경도에 해당하는 위치로 재설정
					map.setZoom(zoom + 1);
				}, () => { // 위치사용 거부
					// 위치확인 기능 지원은 하지만 위치사용 거부했기 때문에 에러 발생하면 실행하는 함수
					handleLocationError(true, infoWindow, map.getCenter());
				});
		} else {
			// Browser doesn't support Geolocation
			handleLocationError(false, infoWindow, map.getCenter());
		}
	});

	function handleLocationError(browserHasGeolocation, infoWindow, pos) {
		infoWindow.setPosition(pos);
		infoWindow.setContent(
			browserHasGeolocation
			? "Error: The Geolocation service failed." // 위치확인 기능을 지원하지만 거부
			: "Error: Your browser doesn't support geolocation." // 위치확인 기능 지원불가 브라우저
		);
		infoWindow.open(map); // 위 안내 문구 넣은 infoWindow open
	}

	// 바깥 버튼에 maps marker 위치지정
	// 내부 marker에 click() 강제 하고 싶지만 마커에 클래스 부여도 어렵고 따로 잡아내기가 어려움
	// 따로 잡아서 click() 불가능하여 그냥 marker 생성 좌표 부여하여 이동 기능만 구현
	const $port = document.querySelectorAll('.port-wrap li button');
	$port.forEach((el, i) => {
		el.setAttribute('date-target', spots[i][1]);
		el.textContent = spots[i][1];

		el.addEventListener("click",() => {
			if(map.getZoom() == zoom) {
				map.setZoom(zoom + 1);
				map.setCenter(spots[i][0]);
			} else {
				map.setZoom(zoom + 0.99);
				setTimeout(() => {
					map.setZoom(zoom + 1);
					map.setCenter(spots[i][0]);
				}, 100);
			}
		})
	})

	const $ships = document.querySelectorAll('.ship-wrap li button');
	$ships.forEach((el, i) => {
		el.setAttribute('date-target', shipPos[i][1]);
		el.textContent = shipPos[i][1];

		el.addEventListener("click",() => {
			if(map.getZoom() == zoom) {
				map.setZoom(zoom + 1);
				map.setCenter(shipPos[i][0]);
			} else {
				map.setZoom(zoom + 0.99);
				setTimeout(() => {
					map.setZoom(zoom + 1);
					map.setCenter(shipPos[i][0]);
				}, 100);
			}
		})
	})






	/**
	 * map02
	 */
	// map02 = new Map(document.getElementById("map02"), {
	// 	center: { lat: 37.579617, lng: 126.977041 },
	// 	zoom: 13,
	// });

	// const marker02 = new Marker({
	// 	map: map02,
	// 	position: { lat: 37.579617, lng: 126.977041 },
	// 	title: "경복궁",
	// 	// label: "경복궁"
	// });

	// const marker = new Marker({
	// 	map: map02,
	// 	position: { lat: 37.519589, lng: 127.026891 },
	// 	title: "파키스탄 대사관",
	// 	label: "파키스탄 대사관",
	// });

	// 에러
	// const marker00 = new AdvancedMarkerView({
	// 	map: map,
	// 	position: { lat: 37.519589, lng: 127.026891 },
	// 	title: "파키스탄 대사관",
	// });
}

initMap();





