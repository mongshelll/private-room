import Masonry from 'masonry-layout' // npm에서 받은 플러그인 모듈 연결
// import '../js/ui_plugin.js' // 빌드시 스크립트 오류발생

// 밖으로 내보낼 스크립트 함수에 담아놓기
export const masonryGrid = () => {
	const $gridContainer = document.querySelector('.grid');
	const $gridItems = $gridContainer.querySelectorAll("[data-category]");
	const setDuration = "400ms"; // 기본 duration 정의
	const masonry = new Masonry( $gridContainer, {
		// options
		itemSelector: '.grid-item',
		columnWidth: '.grid-sizer',
		horizontalOrder: true,
		gutter: 20,
		transitionDuration: setDuration,
		stagger: 5
	});

	// .layout() 실행전 duration이 없기 때문에 초기화 실행, css로 값을 주면 이동 후 떨림 현상이 있음
	masonry.once('layoutComplete', () => {
		$gridItems.forEach(item => {
			item.style.transitionDuration = setDuration
		})
		console.log('start');
	})
	masonry.layout();

	/* filter 기능 */
	const filterGrid = triggerBtn => {
		const targetCategory = triggerBtn.dataset.target;
		if (targetCategory) {
			$gridItems.forEach(item => {
				const shouldShow = targetCategory === "all" || item.dataset.category === targetCategory;
				item.classList.toggle('is-hidden', !shouldShow);
			});
			masonry.layout();
		}
	};

	const $filterBtnWrap = document.querySelector('.btn-wrap');
	$filterBtnWrap.addEventListener("click", (e) => {
		filterGrid(e.target);
	})
}
