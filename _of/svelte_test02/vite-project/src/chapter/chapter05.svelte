<script>
    let text = ''
</script>

<h1>{text}</h1>

<input type="text" value={text} on:input={(e) => {text = e.target.value}}>
<input type="text" bind:value={text}>
<button type="button" on:click={(e)=> { text = 'TEXT' }}>Click</button>

