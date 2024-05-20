import Masonry from 'masonry-layout'
import '../css/ui_style.css'

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
