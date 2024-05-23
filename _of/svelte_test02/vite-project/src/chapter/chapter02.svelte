<script>
    let name = 'world'
    let toggle = false
</script>

<button type="button" on:click={() => {toggle = !toggle}}>Toggle</button>

{#if toggle}
    <h1>Hello {name}!</h1>
{:else}
    <div>No name!</div>
{/if}