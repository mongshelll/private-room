// import Masonry from 'masonry-layout' // npm에서 받은 플러그인 모듈 연결
import './ui_plugin.js'

// 밖으로 내보낼 스크립트 함수에 담아놓기
export const masonryGrid = () => {
	const $gridContainer = document.querySelector('.grid');
	const masonry = new Masonry( $gridContainer, {
		// options
		itemSelector: '.grid-item',
		columnWidth: '.grid-sizer',
		horizontalOrder: true,
		gutter: 20
	});



	/* filter 기능 */
	const filterGrid = triggerBtn => {
		const gridItems = $gridContainer.querySelectorAll("[data-category]");
		const targetCategory = triggerBtn.dataset.target;

		if (targetCategory) {
			gridItems.forEach(item => {
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
