<script>
    export let count;
    export let doubled;

    $: {
        console.log( count );
        console.log( doubled );
    }
</script>

<p>{count} 두배는 {doubled}</p>