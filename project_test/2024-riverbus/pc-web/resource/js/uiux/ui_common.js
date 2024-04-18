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
					const scaleAmount = 2; // 임의의 배율 (2배 확대)

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
