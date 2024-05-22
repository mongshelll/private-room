<script>
    export let count;
    export let increment;
    
    import LabelComp from "./labelComp.svelte";
</script>


<button type="button" on:click={increment}>
    count is {count} <LabelComp {count} />
</button>