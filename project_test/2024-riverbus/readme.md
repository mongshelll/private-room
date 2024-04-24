
# 구현내용 설명
- 컨테이너 내부에 이미지와 선박 마커를 형재요소로 구성하여 클릭(터치)시 컨테이너 자체가 확대 되도록 구현
- 선박의 데이터는 임의의 json을 만들어서 테스트 진행함
- 구글 맵 커스텀 테마 이미지위에 선박관련 데이터(선박명, 좌표, 상태 등) json으로 받아서 선박이 위치하도록 구현
- 터치스크린의 핀치기능은 touchmove 이벤트 체크하여 작동하지 않도록 조치함
- setInterval()를 사용하여 주기적으로 fetch()함수를 통하여 json을 업데이트하여 선박의 정보를 최신화하도록 함
- 기존 마커가 없는경우 마커를 생성하고, 기존 마커가 있는경우 업데이트된 좌표 및 상태를 비교하여 이동방향, 위치, 상태 업데이트 하도록 구현
- 진행방향의 판단조건은 이전 좌표와 다음 좌표를 비교하여 경도값의 차이를 기준하기 때문에 처음 로드시에는 기본 우측을 바라보는 아이콘으로 시작,
- 좌표가 업데이트가되면 진행방향이 업데이트되도록 구현
- 현재 위치하는 좌표를 나타내기위해 navigator.geolocation.watchPosition() 사용하여 선박의 위치가 변동할 때마다 현 위치 좌표를 업데이트 받아 지정된 마커업상에 좌표가 노출되도록 구현.



# 사용방법

1. 함수
	- mapZoomFn.init()
	-- 맵 줌 기능함수
	-- load시 실행

	- currentLocation()
	-- 선박의 현재 좌표확인
	-- 선박의 위치가 변경되는 경우 좌표 업데이트

	- mapMakerFn.fetchGPSData()
	-- 마커 생성 및 업데이트 함수
	-- load시 1회 실행 해서 마커를 생성하고, setInterval()로 주기적으로 업데이트 받은 데이터로 마커를 최신화 함.

	ex)
	```
	window.addEventListener('load', () => {
		// 윈도우 로드시 실행할 메소드 작성

		/* 맵 줌 기능 함수 */
		mapZoomFn.init();

		/* 조타실 맵 마커 컨트롤 함수 */
		// 조타실 확인하여 실행
		const isPilothouse = document.querySelector('.content.pilothouse');
		if ( isPilothouse ) {
			mapMakerFn.fetchGPSData();

			currentLocation(); // 현재 좌표확인 및 업데이트

			// 일정한 간격으로 데이터를 다시 가져오기
			gpsUpdate = setInterval( () => {
				mapMakerFn.fetchGPSData() // 맵 생성 및 업데이트
			}, 2000);
		}
	});
	 ```
