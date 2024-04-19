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




/**
 * 서버 환경에서 테스트 진행
 * gps값을 fetch() 사용하여 데이터 JSON으로 받고 설정한 주기로 위치값 업데이트
 * 2초마다 업데이트 해놓았으나 JSON에서 값 수정해도 바로 적용이 안됨. 기다리다보면 적용되서 위치가 이동하기는 함
 */
const mapMarkerControlFn = (function() {
	// 기준 지도 경도, 위도 범위
	const mapsLongitudeRange = [126.809416, 127.076583];
	const mapsLatitudeRange = [37.476828, 37.592293];

		// 지도 이미지 기준점
		// 37.592293, 126.809416 좌상단
		// 37.592293, 127.076583 우상단
		// 37.476828, 126.809416 좌하단
		// 37.476828, 127.076583 좌하단

	let markers = [];
	let gpsData;
	return {
		addMarkers: function(gpsData) {
			const mapArea = document.querySelector('[data-target="zoomTarget"]');
			const imageWidth = mapArea.offsetWidth;
			const imageHeight = mapArea.offsetHeight;

			gpsData.forEach(data => {
				const { title, lat, lng } = data;

				// GPS 좌표가 지도 범위 내에 있는지 확인
				if (lat >= mapsLatitudeRange[0] && lat <= mapsLatitudeRange[1] && lng >= mapsLongitudeRange[0] && lng <= mapsLongitudeRange[1]) {
					// 기존 마커가 있는지 확인하고, 있으면 위치만 업데이트
					const existingMarker = markers.find(marker => marker.title === title);
					if (existingMarker) {
						const { element } = existingMarker;
						const xPosition = (lng - mapsLongitudeRange[0]) / (mapsLongitudeRange[1] - mapsLongitudeRange[0]) * imageWidth;
						const yPosition = (mapsLatitudeRange[1] - lat) / (mapsLatitudeRange[1] - mapsLatitudeRange[0]) * imageHeight;
						const xPositionPercent = (xPosition / imageWidth) * 100;
						const yPositionPercent = (yPosition / imageHeight) * 100;
						element.style.left = `${xPositionPercent}%`;
						element.style.top = `${yPositionPercent}%`;
						existingMarker.lat = lat;
						existingMarker.lng = lng;
					} else {
						// 기존 마커가 없으면 새로 추가
						const xPosition = (lng - mapsLongitudeRange[0]) / (mapsLongitudeRange[1] - mapsLongitudeRange[0]) * imageWidth;
						const yPosition = (mapsLatitudeRange[1] - lat) / (mapsLatitudeRange[1] - mapsLatitudeRange[0]) * imageHeight;
						const xPositionPercent = (xPosition / imageWidth) * 100;
						const yPositionPercent = (yPosition / imageHeight) * 100;
						const marker = document.createElement('div');
						marker.className = `ships ${title}`;
						marker.textContent = title;
						marker.style.left = `${xPositionPercent}%`;
						marker.style.top = `${yPositionPercent}%`;
						mapArea.appendChild(marker);
						markers.push({ title, element: marker, lat, lng });
					}
				}
			});

			console.log('add marker or update');
		},
		updateMarkers: function(gpsData) {
			const mapArea = document.querySelector('[data-target="zoomTarget"]');
			const imageWidth = mapArea.offsetWidth;
			const imageHeight = mapArea.offsetHeight;

			gpsData.forEach(data => {
				const { title, lat, lng } = data;
				const existingMarker = markers.find(marker => marker.title === title);
				if (existingMarker) {
					// 이미 존재하는 마커의 경우 위치 업데이트
					const { element } = existingMarker;
					const xPosition = (lng - mapsLongitudeRange[0]) / (mapsLongitudeRange[1] - mapsLongitudeRange[0]) * imageWidth;
					const yPosition = (mapsLatitudeRange[1] - lat) / (mapsLatitudeRange[1] - mapsLatitudeRange[0]) * imageHeight;
					const xPositionPercent = (xPosition / imageWidth) * 100;
					const yPositionPercent = (yPosition / imageHeight) * 100;
					element.style.left = `${xPositionPercent}%`;
					element.style.top = `${yPositionPercent}%`;
					existingMarker.lat = lat;
					existingMarker.lng = lng;
				}
			});
		},
		fetchGPSData: function() {
			fetch('http://192.168.0.106:81/workspace/project/2024-riverbus/pc-web/resource/js/uiux/gpsData.json') // autoset 경로
			// fetch('http://127.0.0.1:5500/pc-web/resource/js/uiux/gpsData.json') // 라이브서버 경로
				.then(response => response.json())
				.then(data => {
					// 가져온 데이터를 변수에 할당
					gpsData = data;

					// 가져온 데이터를 이용하여 마커 업데이트
					mapMarkerControlFn.updateMarkers(gpsData);
					mapMarkerControlFn.addMarkers(gpsData);

					console.log(gpsData[0]);
				})
				.catch(error => {
					console.error('Error fetching GPS data:', error);
				});
		}
	}
})()

window.addEventListener('load', () => {
	mapMarkerControlFn.fetchGPSData();
	// 일정한 간격으로 데이터를 다시 가져오기
	setInterval(mapMarkerControlFn.fetchGPSData, 2000);
});



















// const gpsDataUpdateCycle = 2000;

// // 기준 지도 경도, 위도 범위
// const mapsLongitudeRange = [126.809416, 127.076583];
// const mapsLatitudeRange = [37.476828, 37.592293];

// 	// 지도 이미지 기준점
// 	// 37.592293, 126.809416 좌상단
// 	// 37.592293, 127.076583 우상단
// 	// 37.476828, 126.809416 좌하단
// 	// 37.476828, 127.076583 좌하단

// let markers = [];
// let gpsData;

// const addMarkers = function(gpsData) {
// 	const mapArea = document.querySelector('[data-target="zoomTarget"]');
// 	const imageWidth = mapArea.offsetWidth;
// 	const imageHeight = mapArea.offsetHeight;

// 	gpsData.forEach(data => {
// 		const { title, lat, lng } = data;

// 		// GPS 좌표가 지도 범위 내에 있는지 확인
// 		if (lat >= mapsLatitudeRange[0] && lat <= mapsLatitudeRange[1] && lng >= mapsLongitudeRange[0] && lng <= mapsLongitudeRange[1]) {
// 			// 기존 마커가 있는지 확인하고, 있으면 위치만 업데이트
// 			const existingMarker = markers.find(marker => marker.title === title);
// 			if (existingMarker) {
// 				const { element } = existingMarker;
// 				const xPosition = (lng - mapsLongitudeRange[0]) / (mapsLongitudeRange[1] - mapsLongitudeRange[0]) * imageWidth;
// 				const yPosition = (mapsLatitudeRange[1] - lat) / (mapsLatitudeRange[1] - mapsLatitudeRange[0]) * imageHeight;
// 				const xPositionPercent = (xPosition / imageWidth) * 100;
// 				const yPositionPercent = (yPosition / imageHeight) * 100;
// 				element.style.left = `${xPositionPercent}%`;
// 				element.style.top = `${yPositionPercent}%`;
// 				existingMarker.lat = lat;
// 				existingMarker.lng = lng;
// 			} else {
// 				// 기존 마커가 없으면 새로 추가
// 				const xPosition = (lng - mapsLongitudeRange[0]) / (mapsLongitudeRange[1] - mapsLongitudeRange[0]) * imageWidth;
// 				const yPosition = (mapsLatitudeRange[1] - lat) / (mapsLatitudeRange[1] - mapsLatitudeRange[0]) * imageHeight;
// 				const xPositionPercent = (xPosition / imageWidth) * 100;
// 				const yPositionPercent = (yPosition / imageHeight) * 100;
// 				const marker = document.createElement('div');
// 				marker.className = `ships ${title}`;
// 				marker.textContent = title;
// 				marker.style.left = `${xPositionPercent}%`;
// 				marker.style.top = `${yPositionPercent}%`;
// 				mapArea.appendChild(marker);
// 				markers.push({ title, element: marker, lat, lng });
// 			}
// 		}
// 	});

// 	console.log('add marker or update');
// };

// const updateMarkers = function(gpsData) {
// 	const mapArea = document.querySelector('[data-target="zoomTarget"]');
// 	const imageWidth = mapArea.offsetWidth;
// 	const imageHeight = mapArea.offsetHeight;

// 	gpsData.forEach(data => {
// 		const { title, lat, lng } = data;
// 		const existingMarker = markers.find(marker => marker.title === title);
// 		if (existingMarker) {
// 			// 이미 존재하는 마커의 경우 위치 업데이트
// 			const { element } = existingMarker;
// 			const xPosition = (lng - mapsLongitudeRange[0]) / (mapsLongitudeRange[1] - mapsLongitudeRange[0]) * imageWidth;
// 			const yPosition = (mapsLatitudeRange[1] - lat) / (mapsLatitudeRange[1] - mapsLatitudeRange[0]) * imageHeight;
// 			const xPositionPercent = (xPosition / imageWidth) * 100;
// 			const yPositionPercent = (yPosition / imageHeight) * 100;
// 			element.style.left = `${xPositionPercent}%`;
// 			element.style.top = `${yPositionPercent}%`;
// 			existingMarker.lat = lat;
// 			existingMarker.lng = lng;
// 		}
// 	});
// };


// const fetchGPSData = function() {
// 	fetch('http://192.168.0.106:81/workspace/project/2024-riverbus/pc-web/resource/js/uiux/gpsData.json')
// 		.then(response => response.json())
// 		.then(data => {
// 			// 가져온 데이터를 변수에 할당
// 			gpsData = data;

// 			// 가져온 데이터를 이용하여 마커 업데이트
// 			updateMarkers(gpsData);
// 			addMarkers(gpsData);

// 			console.log(gpsData[0]);
// 		})
// 		.catch(error => {
// 			console.error('Error fetching GPS data:', error);
// 		});
// };

// window.addEventListener('load', () => {
// 	fetchGPSData();
// 	// 일정한 간격으로 데이터를 다시 가져오기
// 	setInterval(fetchGPSData, gpsDataUpdateCycle);
// });




















// let gpsData = [
// 	{
// 		title: 'ship01',
// 		lat: 37.545973,
// 		lng: 126.895501
// 	},
// 	{
// 		title: 'ship02',
// 		lat: 37.539672,
// 		lng: 126.907624
// 	},
// 	{
// 		title: 'ship03',
// 		lat: 37.512273,
// 		lng: 126.964288
// 	},
// 	{
// 		title: 'ship04',
// 		lat: 37.512286,
// 		lng: 126.992653
// 	},
// 	{
// 		title: 'ship05',
// 		lat: 37.527754,
// 		lng: 127.015848
// 	},
// 	{
// 		title: 'ship06',
// 		lat: 37.52014,
// 		lng: 127.080187
// 	},
// 	{
// 		title: 'ship07',
// 		lat: 37.531256,
// 		lng: 127.059349
// 	},
// 	{
// 		title: 'ship08',
// 		lat: 37.523207,
// 		lng: 127.003163
// 	},
// ]

// const gpsDataUpdateCycle = 2000;

// // 기준 지도 경도, 위도 범위
// const mapsLongitudeRange = [126.809416, 127.076583];
// const mapsLatitudeRange = [37.476828, 37.592293];

// 	// 지도 이미지 기준점
// 	// 37.592293, 126.809416 좌상단
// 	// 37.592293, 127.076583 우상단
// 	// 37.476828, 126.809416 좌하단
// 	// 37.476828, 127.076583 좌하단

// const addMarkers = function(gpsData) {
// 	const mapArea = document.querySelector('[data-target="zoomTarget"]');
// 	const imageWidth = mapArea.offsetWidth;
// 	const imageHeight = mapArea.offsetHeight;
// 	const markers = [];

// 	gpsData.forEach(data => {
// 		const { title, lat, lng } = data;

// 		// GPS 좌표가 지도 범위 내에 있는지 확인
// 		if (lat >= mapsLatitudeRange[0] && lat <= mapsLatitudeRange[1] && lng >= mapsLongitudeRange[0] && lng <= mapsLongitudeRange[1]) {
// 			// GPS 좌표를 이미지의 x, y 위치 값으로 변환
// 			const xPosition = (lng - mapsLongitudeRange[0]) / (mapsLongitudeRange[1] - mapsLongitudeRange[0]) * imageWidth;
// 			const yPosition = (mapsLatitudeRange[1] - lat) / (mapsLatitudeRange[1] - mapsLatitudeRange[0]) * imageHeight;

// 			// 퍼센트 사용
// 			// 픽셀 단위의 위치 값을 퍼센트로 변환
// 			const xPositionPercent = (xPosition / imageWidth) * 100;
// 			const yPositionPercent = (yPosition / imageHeight) * 100;

// 			// 마커 생성
// 			const marker = document.createElement('div');
// 			marker.className = `ships ${title}`;
// 			marker.textContent = title; // 마커에 제목 추가

// 			// 퍼센트 사용
// 			marker.style.left = `${xPositionPercent}%`;
// 			marker.style.top = `${yPositionPercent}%`;

// 			// 이미지 컨테이너에 마커 추가
// 			mapArea.appendChild(marker);

// 			// 마커를 markers 배열에 추가
// 			markers.push({ element: marker, lat, lng });
// 		}
// 	});

// 	console.log('add marker');

// 	return markers;
// };

// const updateMarkerPositions = function(markers) {
// 	const mapArea = document.querySelector('[data-target="zoomTarget"]');
// 	const imageWidth = mapArea.offsetWidth;
// 	const imageHeight = mapArea.offsetHeight;

// 	markers.forEach(marker => {
// 		const { lat, lng, element } = marker;

// 		// 새로운 좌표를 기반으로 마커의 위치 재계산
// 		const xPosition = (lng - mapsLongitudeRange[0]) / (mapsLongitudeRange[1] - mapsLongitudeRange[0]) * imageWidth;
// 		const yPosition = (mapsLatitudeRange[1] - lat) / (mapsLatitudeRange[1] - mapsLatitudeRange[0]) * imageHeight;

// 		// 퍼센트 사용
// 		// 픽셀 단위의 위치 값을 퍼센트로 변환
// 		const xPositionPercent = (xPosition / imageWidth) * 100;
// 		const yPositionPercent = (yPosition / imageHeight) * 100;

// 		// 마커의 위치를 업데이트
// 		// 퍼센트 사용
// 		element.style.left = `${xPositionPercent}%`; // 퍼센트로 설정
// 		element.style.top = `${yPositionPercent}%`; // 퍼센트로 설정
// 	});
// };

// const updateMarkers = function(gpsData) {
// 	const markers = addMarkers(gpsData);

// 	// 일정한 간격으로 위치 업데이트 함수 호출 (업데이트 주기 마다)
// 	setInterval(() => {
// 		updateMarkerPositions(markers);
// 		console.log('update position');
// 	}, gpsDataUpdateCycle);
// };

// // 초기화 함수
// window.addEventListener('load', () => {
// 	updateMarkers(gpsData);
// });






























// let gpsData = [
// 	{
// 		title: 'ship01',
// 		lat: 37.545973,
// 		lng: 126.895501
// 	},
// 	{
// 		title: 'ship02',
// 		lat: 37.539672,
// 		lng: 126.907624
// 	},
// 	{
// 		title: 'ship03',
// 		lat: 37.512273,
// 		lng: 126.964288
// 	},
// 	{
// 		title: 'ship04',
// 		lat: 37.512286,
// 		lng: 126.992653
// 	},
// 	{
// 		title: 'ship05',
// 		lat: 37.527754,
// 		lng: 127.015848
// 	},
// 	{
// 		title: 'ship06',
// 		lat: 37.52014,
// 		lng: 127.080187
// 	},
// 	{
// 		title: 'ship07',
// 		lat: 37.531256,
// 		lng: 127.059349
// 	},
// 	{
// 		title: 'ship08',
// 		lat: 37.523207,
// 		lng: 127.003163
// 	},
// ]

// const updateMarkers = function(gpsData) {
// 	const mapArea = document.querySelector('[data-target="zoomTarget"]');
// 	const imageWidth = mapArea.offsetWidth;
// 	const imageHeight = mapArea.offsetHeight;

// 	// 기준 지도 경도, 위도 범위
// 	const mapsLongitudeRange = [126.809416, 127.076583];
// 	const mapsLatitudeRange = [37.476828, 37.592293];

// 	// 지도 이미지 기준점
// 	// 37.592293, 126.809416 좌상단
// 	// 37.592293, 127.076583 우상단
// 	// 37.476828, 126.809416 좌하단
// 	// 37.476828, 127.076583 좌하단

// 	// 마커들을 담을 배열
// 	const markers = [];

// 	// 업데이트 주기
// 	const gpsDataUpdateCycle = 2000;

// 	// GPS 좌표를 이미지의 x, y 위치 값으로 환산하여 마커를 추가하는 함수
// 	const addMarkers = function(gpsData) {
// 		gpsData.forEach(data => {
// 			const { title, lat, lng } = data;

// 			// GPS 좌표가 지도 범위 내에 있는지 확인
// 			if (lat >= mapsLatitudeRange[0] && lat <= mapsLatitudeRange[1] && lng >= mapsLongitudeRange[0] && lng <= mapsLongitudeRange[1]) {

// 				// GPS 좌표를 이미지의 x, y 위치 값으로 변환
// 				const xPosition = (lng - mapsLongitudeRange[0]) / (mapsLongitudeRange[1] - mapsLongitudeRange[0]) * imageWidth;
// 				const yPosition = (mapsLatitudeRange[1] - lat) / (mapsLatitudeRange[1] - mapsLatitudeRange[0]) * imageHeight;

// 				// 퍼센트 사용
// 				// 픽셀 단위의 위치 값을 퍼센트로 변환
// 				const xPositionPercent = (xPosition / imageWidth) * 100;
// 				const yPositionPercent = (yPosition / imageHeight) * 100;

// 				// 마커 생성
// 				const marker = document.createElement('div');
// 				marker.className = `ships ${title}`; // 수정된 부분
// 				marker.textContent = title; // 마커에 제목 추가

// 				// 픽셀 사용
// 				// marker.style.left = `${xPosition}px`;
// 				// marker.style.top = `${yPosition}px`;

// 				// 퍼센트 사용
// 				marker.style.left = `${xPositionPercent}%`; // 퍼센트로 설정
// 				marker.style.top = `${yPositionPercent}%`; // 퍼센트로 설정

// 				// 이미지 컨테이너에 마커 추가
// 				mapArea.appendChild(marker);

// 				// 마커를 markers 배열에 추가
// 				markers.push({ element: marker, lat, lng });
// 			}
// 		});
// 	};

// 	// GPS 데이터를 이용하여 마커 추가
// 	addMarkers(gpsData);

// 	// 위치 업데이트 함수
// 	const updateMarkerPositions = function() {
// 		markers.forEach(marker => {
// 			// 임의의 값으로 좌표 업데이트
// 			// marker.lat += (Math.random() - 0.5) * 0.01; // 예시: 랜덤한 방향으로 좌표를 변경합니다.
// 			// marker.lng += (Math.random() - 0.5) * 0.01;

// 			// 새로운 좌표를 기반으로 마커의 위치 재계산
// 			const xPosition = (marker.lng - mapsLongitudeRange[0]) / (mapsLongitudeRange[1] - mapsLongitudeRange[0]) * imageWidth;
// 			const yPosition = (mapsLatitudeRange[1] - marker.lat) / (mapsLatitudeRange[1] - mapsLatitudeRange[0]) * imageHeight;

// 			// 퍼센트 사용
// 			// 픽셀 단위의 위치 값을 퍼센트로 변환
// 			const xPositionPercent = (xPosition / imageWidth) * 100;
// 			const yPositionPercent = (yPosition / imageHeight) * 100;

// 			// 마커의 위치를 업데이트
// 			// 픽셀 사용
// 			// marker.element.style.left = `${xPosition}px`;
// 			// marker.element.style.top = `${yPosition}px`;

// 			// 퍼센트 사용
// 			marker.element.style.left = `${xPositionPercent}%`; // 퍼센트로 설정
// 			marker.element.style.top = `${yPositionPercent}%`; // 퍼센트로 설정

// 		});
// 	};

// 	// 일정한 간격으로 위치 업데이트 함수 호출 (업데이트 주기 마다)
// 	// setInterval(updateMarkerPositions, gpsDataUpdateCycle);

// 	setInterval(() => {
// 		// gpsData 배열을 업데이트합니다.
// 		// 예시: 랜덤한 방법으로 좌표를 변경합니다.
// 		// gpsData.forEach(data => {
// 		//     data.lat += (Math.random() - 0.5) * 1; // 예시: 랜덤한 방향으로 좌표를 변경합니다.
// 		//     data.lng += (Math.random() - 0.5) * 1;
// 		// });

// 		// 위치 업데이트 함수 호출
// 		updateMarkerPositions();
// 	}, gpsDataUpdateCycle); // 업데이트 주기
// };


// window.addEventListener('load', () => {
// 	updateMarkers(gpsData)
// })

















































// fetch() 함수를 사용하여 gpsData.json 파일을 가져옵니다.


// // 마커들을 담을 배열
// let markers = [];

// // GPS 좌표를 이용하여 마커를 추가하는 함수
// const addMarkers = function(gpsData) {
// 	const mapArea = document.querySelector('[data-target="zoomTarget"]');

// 	gpsData.forEach(data => {
// 		const { title, lat, lng } = data;

// 		// 이미 있는 마커인지 확인
// 		const existingMarker = markers.find(marker => marker.title === title);

// 		// 이미 있는 마커가 없다면 새로 추가
// 		if (!existingMarker) {
// 			// 마커 생성 코드
// 			const marker = document.createElement('div');
// 			marker.className = `ships ${title}`;
// 			marker.textContent = title;

// 			// 이미지 컨테이너에 마커 추가
// 			mapArea.appendChild(marker);

// 			// 마커를 markers 배열에 추가
// 			markers.push({ title, element: marker, lat, lng });
// 		}
// 	});

// 	console.log('add Marker');
// };

// // 마커들의 위치를 업데이트하는 함수
// const updateMarkerPositions = function(gpsData) {
// 	const mapArea = document.querySelector('[data-target="zoomTarget"]');
// 	const imageWidth = mapArea.offsetWidth;
// 	const imageHeight = mapArea.offsetHeight;

// 	// 기준 지도 경도, 위도 범위
// 	const mapsLongitudeRange = [126.809416, 127.076583];
// 	const mapsLatitudeRange = [37.476828, 37.592293];
// 	// const mapsLongitudeRange = [126.7649, 127.1836];
// 	// const mapsLatitudeRange = [37.4133, 37.7151];

// 	// 지도 이미지 기준점
// 	// 37.592293, 126.809416 좌상단
// 	// 37.592293, 127.076583 우상단
// 	// 37.476828, 126.809416 좌하단
// 	// 37.476828, 127.076583 좌하단

// 	gpsData.forEach(data => {
// 		const { title, lat, lng } = data;

// 		// 마커 찾기
// 		const marker = markers.find(marker => marker.title === title);

// 		// 마커가 있으면 위치 업데이트
// 		if (marker) {
// 			// 마커 위치 업데이트
// 			// 새로운 좌표를 기반으로 마커의 위치 재계산
// 			const xPosition = (marker.lng - mapsLongitudeRange[0]) / (mapsLongitudeRange[1] - mapsLongitudeRange[0]) * imageWidth;
// 			const yPosition = (mapsLatitudeRange[1] - marker.lat) / (mapsLatitudeRange[1] - mapsLatitudeRange[0]) * imageHeight;

// 			// 퍼센트 사용
// 			// 픽셀 단위의 위치 값을 퍼센트로 변환
// 			const xPositionPercent = (xPosition / imageWidth) * 100;
// 			const yPositionPercent = (yPosition / imageHeight) * 100;

// 			// 마커의 위치를 업데이트
// 			// 퍼센트 사용
// 			marker.element.style.left = `${xPositionPercent}%`; // 퍼센트로 설정
// 			marker.element.style.top = `${yPositionPercent}%`; // 퍼센트로 설정
// 		}
// 	});

// 	console.log('update maps');
// };

// let gpsData;

// // GPS 데이터를 업데이트하는 함수
// const updateGPSData = function() {
// 	// GPS 데이터를 가져오는 fetch() 등의 코드 작성
// 	fetch('http://192.168.0.106:81/workspace/project/2024-riverbus/pc-web/resource/js/uiux/gpsData.json')
// 		.then(response => response.json())
// 		.then(data => {
// 			gpsData = data;

// 			// 새로운 GPS 데이터로 마커들을 업데이트
// 			updateMarkerPositions(data);

// 			console.log(data);
// 		})
// 		.catch(error => {
// 			console.error('Error updating GPS data:', error);
// 		});
// };

// updateGPSData();

// // 초기화 함수
// const initialize = function() {
// 	// 처음에 마커를 추가
// 	addMarkers(gpsData);

// 	// 일정한 간격으로 GPS 데이터 업데이트
// 	setInterval(updateGPSData, 2000); // 2초마다 업데이트
// };

// // 페이지 로드가 완료되면 초기화 함수 호출
// window.addEventListener('load', initialize);































// let gpsData;

// // JSON 데이터를 주기적으로 받아오는 함수
// function fetchJSONData() {
//     // AJAX 요청을 보내고 JSON 데이터를 받아옵니다.
//     fetch('http://192.168.0.106:81/workspace/project/2024-riverbus/pc-web/resource/js/uiux/gpsData.json')
//         .then(response => response.json())
//         .then(data => {
//             // 받아온 JSON 데이터를 처리합니다.
//             console.log('Received JSON data:', data);
// 			// updateMarkers(data);
// 			gpsData = data;
//         })
//         .catch(error => {
//             console.error('Error fetching JSON data:', error);
//         });
// }
// fetchJSONData()

// // 2초마다 fetchJSONData 함수를 호출하여 JSON 데이터를 받아옵니다.
// setInterval(fetchJSONData, 2000);


// const updateMarkers = function(gpsData) {
// 	const mapArea = document.querySelector('[data-target="zoomTarget"]');
// 	const imageWidth = mapArea.offsetWidth;
// 	const imageHeight = mapArea.offsetHeight;

// 	// 기준 지도 경도, 위도 범위
// 	const mapsLongitudeRange = [126.809416, 127.076583];
// 	const mapsLatitudeRange = [37.476828, 37.592293];
// 	// const mapsLongitudeRange = [126.7649, 127.1836];
// 	// const mapsLatitudeRange = [37.4133, 37.7151];

// 	// 지도 이미지 기준점
// 	// 37.592293, 126.809416 좌상단
// 	// 37.592293, 127.076583 우상단
// 	// 37.476828, 126.809416 좌하단
// 	// 37.476828, 127.076583 좌하단

// 	// 마커들을 담을 배열
// 	const markers = [];

// 	// 업데이트 주기
// 	const gpsDataUpdateCycle = 2000;

// 	// GPS 좌표를 이미지의 x, y 위치 값으로 환산하여 마커를 추가하는 함수
// 	const addMarkers = function(gpsData) {
// 		gpsData.forEach(data => {
// 			const { title, lat, lng } = data;

// 			// GPS 좌표가 지도 범위 내에 있는지 확인
// 			if (lat >= mapsLatitudeRange[0] && lat <= mapsLatitudeRange[1] && lng >= mapsLongitudeRange[0] && lng <= mapsLongitudeRange[1]) {

// 				// GPS 좌표를 이미지의 x, y 위치 값으로 변환
// 				const xPosition = (lng - mapsLongitudeRange[0]) / (mapsLongitudeRange[1] - mapsLongitudeRange[0]) * imageWidth;
// 				const yPosition = (mapsLatitudeRange[1] - lat) / (mapsLatitudeRange[1] - mapsLatitudeRange[0]) * imageHeight;

// 				// 퍼센트 사용
// 				// 픽셀 단위의 위치 값을 퍼센트로 변환
// 				const xPositionPercent = (xPosition / imageWidth) * 100;
// 				const yPositionPercent = (yPosition / imageHeight) * 100;

// 				// 마커 생성
// 				const marker = document.createElement('div');
// 				marker.className = `ships ${title}`; // 수정된 부분
// 				marker.textContent = title; // 마커에 제목 추가

// 				// 퍼센트 사용
// 				marker.style.left = `${xPositionPercent}%`; // 퍼센트로 설정
// 				marker.style.top = `${yPositionPercent}%`; // 퍼센트로 설정

// 				// 이미지 컨테이너에 마커 추가
// 				mapArea.appendChild(marker);

// 				// 마커를 markers 배열에 추가
// 				markers.push({ element: marker, lat, lng });
// 			}
// 		});
// 		console.log('addMarker');
// 	};

// 	// GPS 데이터를 이용하여 마커 추가
// 	addMarkers(gpsData);

// 	// 위치 업데이트 함수
// 	const updateMarkerPositions = function() {
// 		markers.forEach(marker => {
// 			// 새로운 좌표를 기반으로 마커의 위치 재계산
// 			const xPosition = (marker.lng - mapsLongitudeRange[0]) / (mapsLongitudeRange[1] - mapsLongitudeRange[0]) * imageWidth;
// 			const yPosition = (mapsLatitudeRange[1] - marker.lat) / (mapsLatitudeRange[1] - mapsLatitudeRange[0]) * imageHeight;

// 			// 퍼센트 사용
// 			// 픽셀 단위의 위치 값을 퍼센트로 변환
// 			const xPositionPercent = (xPosition / imageWidth) * 100;
// 			const yPositionPercent = (yPosition / imageHeight) * 100;

// 			// 마커의 위치를 업데이트
// 			// 퍼센트 사용
// 			marker.element.style.left = `${xPositionPercent}%`; // 퍼센트로 설정
// 			marker.element.style.top = `${yPositionPercent}%`; // 퍼센트로 설정

// 		});
// 		console.log('gps update');
// 	};

// 	// 일정한 간격으로 위치 업데이트 함수 호출 (업데이트 주기 마다)
// 	setInterval(updateMarkerPositions, gpsDataUpdateCycle);
// };


// window.addEventListener('load', () => {
// 	updateMarkers(gpsData)
// })































