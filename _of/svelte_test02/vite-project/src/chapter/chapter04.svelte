<script>
    // import { onMount } from "svelte";
    let name = 'world'
    let isRed = false

    // onMount(() => {
    //     const box = document.querySelector('.box')
    //     box.addEventListener("click", () => { isRed = !isRed })
    // })

    const enter = () => name = 'enter'
    const leave = () => name = 'leave'
</script>

<h1>Hello {name}!</h1>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div 
    class="box" 
    style="background-color: {isRed ? 'red' : 'orange'};" 
    on:click={() => isRed = !isRed}
    on:mouseenter={enter}
    on:mouseleave={leave}
    >Box</div>

<style>
    .box { width: 300px; height: 150px; background-color: orange; }
</style>