<script>
    let name = 'fruits'
    let fruits = ['Apple', 'Banana', 'Cherry', 'Orange', 'Mango']

    const deleteFrult = () => {
        fruits = fruits.slice(1)
    }

</script>

<h1>Hello {name}!</h1>

<ul>
    {#each fruits as fruit}
        <li>{fruit}</li>
    {/each}
</ul>

<button type="button" on:click={deleteFrult}>Eat it!</button>