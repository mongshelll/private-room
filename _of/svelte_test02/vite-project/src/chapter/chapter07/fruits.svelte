<script>
    // Props
    export let fruits
    export let reverse
    export let slice

    let computedFruits = []
    let name = ''

    if ( reverse ) {
        computedFruits = [...fruits].reverse()
        name = 'reverse'
    } else if (slice) {
        // slice => '-2', '0, -3'
        // slice.split(',') => ['-2'], ['0', ' 3']
        // ['-2'] => '-2'
        // ['0', ' 3'] => '0', ' 3'
        computedFruits = fruits.slice(...slice.split(','))
        // name = 'slice ' + slice'
        name = `slice ${slice}`
    } else {
        computedFruits = fruits
    }
</script>

<h2>Fruits {name}</h2>

<ul>
    {#each computedFruits as fruit}
        <li>{fruit}</li>
    {/each}
</ul>