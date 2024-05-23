<script>
    let name = 'Hello world'
    let age = 85

    function assign() {
        name = "happy"
        age = 15
    }
</script>

<h1>{name}!</h1>
<h2 class={age < 85 ? 'active' : ''}>
{age}
</h2>
<img src="" alt={name}>
<input type="text" bind:value={name}>
<button type="button" on:click={assign}>Assign</button>

<style>
    h1 { color: red; }
    .active { color: blue; }
</style>