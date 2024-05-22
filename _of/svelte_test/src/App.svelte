<script>
  import Header from "./component/header.svelte"
  import Content from "./component/content.svelte"
  import Footer from "./component/footer.svelte"
  import ConutComp from "./lib/countComp.svelte"
  import Login from "./component/login.svelte"
  import Todos from "./component/todos.svelte"
  import Increment from "./component/increment.svelte"
  import Decrement from "./component/decrement.svelte"
  import CountResulte from "./component/countResult.svelte"
  import Card from "./component/card.svelte"
  import Wiget from "./component/wiget.svelte"
  import { fade, blur, fly, slide, scale, draw } from "svelte/transition"
  import { bounceInOut, backOut } from "svelte/easing"
  // let visibles = {
  //   'fade': false,
  //   'slide': false,
  //   'blur': false,
  //   'fly': false,
  //   'scale': false,
  //   'inOut': false,
  // }

  // const changeVisible = (type) => {
  //   visibles[type] = !visibles[type];
  // }
  let visible = true;
</script>



{#if visible}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103 124">
        <g>
            <path
              transition:draw="{{duration: 2000}}"
                style="stroke:#ff3e00; stroke-width: 1.5"
                d='M45.41,108.86A21.81,21.81,0,0,1,22,100.18,20.2,20.2,0,0,1,18.53,84.9a19,19,0,0,1,.65-2.57l.52-1.58,1.41,1a35.32,35.32,0,0,0,10.75,5.37l1,.31-.1,1a6.2,6.2,0,0,0,1.11,4.08A6.57,6.57,0,0,0,41,95.19a6,6,0,0,0,1.68-.74L70.11,76.94a5.76,5.76,0,0,0,2.59-3.83,6.09,6.09,0,0,0-1-4.6,6.58,6.58,0,0,0-7.06-2.62,6.21,6.21,0,0,0-1.69.74L52.43,73.31a19.88,19.88,0,0,1-5.58,2.45,21.82,21.82,0,0,1-23.43-8.68A20.2,20.2,0,0,1,20,51.8a19,19,0,0,1,8.56-12.7L56,21.59a19.88,19.88,0,0,1,5.58-2.45A21.81,21.81,0,0,1,85,27.82,20.2,20.2,0,0,1,88.47,43.1a19,19,0,0,1-.65,2.57l-.52,1.58-1.41-1a35.32,35.32,0,0,0-10.75-5.37l-1-.31.1-1a6.2,6.2,0,0,0-1.11-4.08,6.57,6.57,0,0,0-7.06-2.62,6,6,0,0,0-1.68.74L36.89,51.06a5.71,5.71,0,0,0-2.58,3.83,6,6,0,0,0,1,4.6,6.58,6.58,0,0,0,7.06,2.62,6.21,6.21,0,0,0,1.69-.74l10.48-6.68a19.88,19.88,0,0,1,5.58-2.45,21.82,21.82,0,0,1,23.43,8.68A20.2,20.2,0,0,1,87,76.2a19,19,0,0,1-8.56,12.7L51,106.41a19.88,19.88,0,0,1-5.58,2.45'
            />
        </g>
    </svg>
{/if}

<label>
  <input type="checkbox" bind:checked={visible}>toggle me
</label>


<style>
  svg {
    width: 100%;
    height: 100%;
  }

  path {
    fill: white;
    opacity: 1;
  }

  label {
    position: absolute;
    top: 1em;
    left: 1em;
  }
</style>





<!-- <button type="button" on:click={() => changeVisible('fade')}>fade</button>
<button type="button" on:click={() => changeVisible('slide')}>slide</button>
<button type="button" on:click={() => changeVisible('blur')}>blur</button>
<button type="button" on:click={() => changeVisible('fly')}>fly</button>
<button type="button" on:click={() => changeVisible('scale')}>scale</button>
<button type="button" on:click={() => changeVisible('inOut')}>in, out</button>



{#if visibles.fade}
  <div transition:fade={{duration:1000, delay:400}} class="wrap">
    <h1>fade 예제</h1>
  </div>
{/if}

{#if visibles.slide}
  <div transition:slide={{duration:1000, easing:bounceInOut}} class="wrap">
    <h1>slide 예제</h1>
  </div>
{/if}

{#if visibles.blur}
  <div transition:blur={{opacity:100, amount:100}} class="wrap">
    <h1>blur 예제</h1>
  </div>
{/if}

{#if visibles.fly}
  <div transition:fly={{x: 100, y: 200, opacity: 0}} class="wrap">
    <h1>fly 예제</h1>
  </div>
{/if}

{#if visibles.scale}
  <div transition:scale={{start:50}} class="wrap">
    <h1>scale 예제</h1>
  </div>
{/if}

{#if visibles.inOut}
  <div in:fade out:slide={{duration:500}} class="wrap">
    <h1>in, out 예제</h1>
  </div>
{/if}

<style>
  .wrap { padding: 20px; background-color: #288edd; text-align: center; }
</style> -->





<!-- <Wiget>
  <h1 slot="header">Hello</h1>
  <svelte:fragment slot="footer">
    <p>All rights reserved.</p>
    <p>Copyright &copy; 2019 Svelte Industries</p>
  </svelte:fragment>
</Wiget> -->


<!-- <Card>
  <span slot="name">
    홍길동
  </span>
  <span slot="address">
    주소
  </span>
</Card>

<Card>
  <span slot="name">
    홍길동
  </span>
  <span slot="address">
    주소
  </span>
  <span slot="email">
      myemail@email.com
  </span>
</Card>

<Card>
  <span slot="name">
    홍길동
  </span>

  <span slot="address">
    주소
  </span>

  <span slot="email" let:hovering>
    {#if hovering}
      <b>myemail@email.com</b>
    {:else}
      myemail@email.com
    {/if}
  </span>
</Card> -->



<!-- <CountResulte />
<Increment />
<Decrement /> -->

<!-- <Todos /> -->


<!-- <Login /> -->


<!-- <Header />
<Content />
<Footer /> -->


<!-- <script>
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
</script>

<main>
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
    Click on the Vite and Svelte logos to learn more
  </p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style> -->
