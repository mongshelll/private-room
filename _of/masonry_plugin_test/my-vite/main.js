// import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'
// import './css/style.css'
// import { masonryGrid } from './js/masonry-grid.js'
// import './css/ui_style.css' // 화면에서 사용할 공통 css파일 연결, 빌드된 화면 소스에서 style 태그 내부에 인라인으로 css내용 전부 출력
import { masonry_component } from './component/masonry_component.js' // 사용할 컴포넌트 가져와서 연결

document.querySelector('#app').innerHTML = `
<main>
  ${masonry_component} <!-- 화면에 컴포넌트 그려주기 -->
</main>
`

