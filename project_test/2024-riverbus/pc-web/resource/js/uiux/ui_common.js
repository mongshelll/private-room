/* v0.1 | 2024-04-16 */
/** -------------------------------------------
    대분류
---------------------------------------------*/
/* 소분류 */
// 기타설명


window.addEventListener('load', () => {
	// 윈도우 로드시 실행할 메소드 작성

	/* 맵 줌 기능 함수 */
	mapZoomFn.init();
});

window.addEventListener('scroll', () => {
 	// 윈도우 스크롤시 실행할 메소드 작성

});


/**
 * 맵 줌 기능 함수
 */
const mapZoomFn = (() => {
	const defaultScale = 1; // 기본 확대 배율
	let isZoomed = false;

	return {
		init: () => {
			const screen =  document.querySelector('.content.pilothouse');
			const mapArea = document.querySelector('[data-target="zoomTarget"]');


			if(screen || mapArea) {
				mapZoomFn.preventZoom();

				mapZoomFn.activeZoom(screen, mapArea)
			}
		},
		activeZoom: (screen, target) => {
			screen.addEventListener('click', (event) => {
				const boundingRect = screen.getBoundingClientRect();
				const posX = event.clientX - boundingRect.left;
				const posY = event.clientY - boundingRect.top;

				const imageWidth = target.offsetWidth;
				const imageHeight = target.offsetHeight;

				if (!isZoomed) {
					// 클릭한 위치를 기준으로 확대할 배율 계산
					const scaleAmount = 2.5 // 임의의 배율 (2배 확대)

					// 클릭한 위치를 중심으로 이미지를 확대하기 위한 transform origin 계산
					const originX = (posX / imageWidth) * 100;
					const originY = (posY / imageHeight) * 100;

					// CSS transform 속성을 사용하여 이미지 확대
					target.style.transform = `scale(${scaleAmount})`;
					target.style.transformOrigin = `${originX}% ${originY}%`;

					isZoomed = true;
				} else {
					// 기본 확대 배율로 이미지 크기 복원
					target.style.transform = `scale(${defaultScale})`;

					isZoomed = false;
				}

				console.log(event.pointerType);
			});
		},
		preventZoom: () => {
			const touchEventCheck = (event) => {
				// 핀치 줌의 경우 두 개 이상의 이벤트가 발생한다.
				if (event.touches.length > 1) {
					event.preventDefault();
				}
				console.log('touchmove active');
			};

			// touchmove event에서 passive가 기본적으로 true이기 때문에 false처리
			// default는 false지만 wheel, mousewheel, touchstart, touchmove event는 default가 true임.
			// passive: true일 경우 preventDefault()를 절대 호출하지 않음.
			// scroll은 취소불가능 이벤트로 passive옵션을 고려하지 않음.(preventDefault() 사용불가)
			document.addEventListener('touchmove', touchEventCheck, { passive: false });
		},
	}
})()

// 로컬 테스트용 선박 위치 데이터
const gpsDataLocal = [
	{
		"title": "ship01",
		"lat": 37.545973,
		"lng": 126.895501,
		"state": ""
	},
	{
		"title": "ship02",
		"lat": 37.539672,
		"lng": 126.907624,
		"state": "state01"
	},
	{
		"title": "ship03",
		"lat": 37.523469,
		"lng": 126.943931,
		"state": ""
	},
	{
		"title": "ship04",
		"lat": 37.510529,
		"lng": 126.980407,
		"state": ""
	},
	{
		"title": "ship05",
		"lat": 37.527754,
		"lng": 127.015848,
		"state": "state01"
	},
	{
		"title": "ship06",
		"lat": 37.52014,
		"lng": 127.080187,
		"state": "state02"
	},
	{
		"title": "ship07",
		"lat": 37.531256,
		"lng": 127.059349,
		"state": "state02"
	},
	{
		"title": "ship08",
		"lat": 37.523207,
		"lng": 127.003163,
		"state": ""
	}
]

// setInterval 사용을 위한 변수
let gpsUpdate;

/**
 * 서버 환경에서 테스트 진행
 * gps값을 fetch() 사용하여 데이터 JSON으로 받고 설정한 주기(현재 2초)로 위치값 업데이트
 */
const mapMarkerControlFn = (function() {
	// 기준 지도 경도, 위도 범위
	const mapsLongitudeRange = [126.838017, 127.089881];
	const mapsLatitudeRange = [37.482061, 37.593417];

	// 지도 이미지 기준점
	// 37.593417, 126.838017 좌상단
	// 37.593417, 127.089881 우상단
	// 37.482061, 126.838017 좌하단
	// 37.482061, 127.089881 좌하단

	const jsonURL = 'http://192.168.0.106:81/workspace/project/2024-riverbus/pc-web/resource/js/uiux/gpsData.json' // autoset 경로
	// const jsonURL = 'http://127.0.0.1:5500/pc-web/resource/js/uiux/gpsData.json' // 라이브서버 경로

	let markers = [];
	let gpsData;

	return {
		markerControl: function(gpsData) {
			const mapArea = document.querySelector('[data-target="zoomTarget"]');
			const imageWidth = mapArea.offsetWidth;
			const imageHeight = mapArea.offsetHeight;

			gpsData.forEach(data => {
				const { title, lat, lng, state } = data;
				const existingMarker = markers.find(marker => marker.title === title);

				/* GPS 좌표가 지도 범위 내에 있는지 확인 */
				// if (lat >= mapsLatitudeRange[0] && lat <= mapsLatitudeRange[1] && lng >= mapsLongitudeRange[0] && lng <= mapsLongitudeRange[1]) {
				// }

				/* 기존 마커가 있는지 확인하고, 업데이트(위치, 상태, 진행 방향) */
				if (existingMarker) {
					const { element, lng: prevLng } = existingMarker;
					const xPosition = (lng - mapsLongitudeRange[0]) / (mapsLongitudeRange[1] - mapsLongitudeRange[0]) * imageWidth;
					const yPosition = (mapsLatitudeRange[1] - lat) / (mapsLatitudeRange[1] - mapsLatitudeRange[0]) * imageHeight;
					const xPositionPercent = (xPosition / imageWidth) * 100;
					const yPositionPercent = (yPosition / imageHeight) * 100;

					/* 선박 위치 업데이트 */
					element.style.left = `${xPositionPercent}%`;
					element.style.top = `${yPositionPercent}%`;
					existingMarker.lat = lat;
					existingMarker.lng = lng;

					/* 선박 상태 업데이트 */
					element.dataset.state = state;

					/* 선박 위치에 따른 기울기 업데이트 */
					// 경도에 따른 배 이미지 기울기 조절 -45, 45 2가지 방향 클래스, 0 클래스 제거
					// 각도가 변경되는 기준점 경도좌표를 정하고
					if ((lng > mapsLongitudeRange[0] && lng < 126.971310) || (lng > 127.026845 && lng < mapsLongitudeRange[1])) {
						// 45deg
						element.classList.remove('rotate-minus');
						element.classList.add('rotate-plus');
					} else if (lng > 126.971310 && lng < 126.984221) {
						// 클래스 제거
						element.classList.remove('rotate-plus');
						element.classList.remove('rotate-minus');
					} else {
						// -45deg
						element.classList.remove('rotate-plus');
						element.classList.add('rotate-minus');
					}

					/* 선박 경도 데이터 변경에 따른 진행방향 업데이트 */
					// 경도 비교해서 이미지 클래스 부여
					const direction = mapMarkerControlFn.checkDirection(prevLng, lng);
					if (direction === 'right') {
						// 좌측에서 우측으로 이동하는 경우 클래스 추가
						element.classList.add('right-direction');
						element.classList.remove('left-direction');
					} else if (direction === 'left') {
						// 우측에서 좌측으로 이동하는 경우 클래스 제거
						element.classList.add('left-direction');
						element.classList.remove('right-direction');
					}
				} else {
					/* 최초 마커 추가 */
					// 기존 마커가 없으면 새로 추가
					const xPosition = (lng - mapsLongitudeRange[0]) / (mapsLongitudeRange[1] - mapsLongitudeRange[0]) * imageWidth;
					const yPosition = (mapsLatitudeRange[1] - lat) / (mapsLatitudeRange[1] - mapsLatitudeRange[0]) * imageHeight;
					const xPositionPercent = (xPosition / imageWidth) * 100;
					const yPositionPercent = (yPosition / imageHeight) * 100;
					const marker = document.createElement('div');
					const markerText = document.createElement('span');
					marker.className = `ships ${title}`;
					marker.style.left = `${xPositionPercent}%`;
					marker.style.top = `${yPositionPercent}%`;

					marker.appendChild(markerText);
					markerText.textContent = title;
					markerText.className = `ship-name`

					mapArea.appendChild(marker);
					markers.push({ title, element: marker, lat, lng, state });
				}
			});

			console.log('add marker or update');
		},
		/**
		 * 상행/하행 구분해서 모양 바꾸기
		 * 변경전 경도값 저장하고 변경된 경도값 비교해서 +-로 상행, 하행 비교
		 * 이전 데이터와 현재 데이터의 이동 방향 판별
		 * @param {*} prevLng 기존 경도 데이터
		 * @param {*} currentLng 업데이트 경도 데이터
		 * @returns {string} right, left, same 방향 구분
		 */
		checkDirection: function(prevLng, currentLng) {
			if (prevLng === undefined || prevLng === null) {
				return null; // 이전 데이터가 없는 경우 방향을 판별할 수 없음
			}
			if (currentLng > prevLng) {
				return 'right'; // 좌측에서 우측으로 이동
			} else if (currentLng < prevLng) {
				return 'left'; // 우측에서 좌측으로 이동
			} else {
				return 'same'; // 이동하지 않음
			}
		},
		fetchGPSData: function() {
			// JSON으로 데이터 받아서 처리
			fetch(jsonURL)
				.then(response => response.json())
				.then(data => {
					// 가져온 데이터를 변수에 할당
					gpsData = data;
					mapMarkerControlFn.markerControl(gpsData);

					console.log(gpsData[0].title);
					console.log(gpsData[0].lng);
				})
				.catch(error => {
					console.error('Error fetching GPS data:', error);

					// 테스트 영역
					console.log('로컬에서 테스트용 데이터 사용 / 업데이트 불가');
					gpsData = gpsDataLocal;
					// 최초 맵 생성
					mapMarkerControlFn.markerControl(gpsData);

					// 데이터 업데이트 중지
					clearInterval(gpsUpdate);
					// 업데이트
					mapMarkerControlFn.markerControl(gpsData);
					// //테스트 영역
				});
		}
	}
})()

window.addEventListener('load', () => {
	// 조타실 확인하여 실행
	const isPilothouse = document.querySelector('.content.pilothouse');
	if ( isPilothouse ) {
		mapMarkerControlFn.fetchGPSData();
		// 일정한 간격으로 데이터를 다시 가져오기
		gpsUpdate = setInterval(mapMarkerControlFn.fetchGPSData, 2000);
	}
});

