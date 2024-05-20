// import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'
// import './css/style.css'
import { masonryGrid } from './js/masonry-grid.js'

document.querySelector('#app').innerHTML = `
<h1>Masonry - gutter, margin bottom</h1>

<div class="btn-wrap">
  <button type="button" data-target="all">category all</button>
  <button type="button" data-target="category01">category01</button>
  <button type="button" data-target="category02">category02</button>
  <button type="button" data-target="category03">category03</button>
</div>

<div class="cont-wrap">
  <div class="grid" data-target="masonry">
    <div class="grid-sizer"></div>
    <div class="grid-item" data-category="category01">1</div>
    <div class="grid-item grid-item--height2" data-category="category02">2</div>
    <div class="grid-item grid-item--height3" data-category="category03">3</div>
    <div class="grid-item grid-item--height2" data-category="category02">4</div>
    <div class="grid-item" data-category="category01">5</div>
    <div class="grid-item" data-category="category01">6</div>
    <div class="grid-item" data-category="category03">7</div>
    <div class="grid-item grid-item--height2" data-category="category02">8</div>
    <div class="grid-item grid-item--height3" data-category="category03">9</div>
    <div class="grid-item" data-category="category01">10</div>
    <div class="grid-item grid-item--height2" data-category="category02">11</div>
    <div class="grid-item" data-category="category01">12</div>
    <div class="grid-item grid-item--height2" data-category="category02">13</div>
    <div class="grid-item grid-item--height2" data-category="category02">14</div>
    <div class="grid-item" data-category="category03">15</div>
    <div class="grid-item grid-item--height2" data-category="category03">16</div>
    <div class="grid-item" data-category="category03">17</div>
    <div class="grid-item grid-item--height2" data-category="category03">18</div>
    <div class="grid-item" data-category="category02">19</div>
    <div class="grid-item grid-item--height2" data-category="category03">20</div>
    <div class="grid-item" data-category="category02">21</div>
    <div class="grid-item" data-category="category03">22</div>
    <div class="grid-item grid-item--height2" data-category="category03">23</div>
  </div>
</div>
`

// setupCounter(document.querySelector('#counter'))
document.addEventListener('DOMContentLoaded', () => {
  masonryGrid();
});
