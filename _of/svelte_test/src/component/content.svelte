<script>
    import CountComp from "../lib/countComp.svelte";
    import BtnComp from "../lib/btnComp.svelte";

    let count = 0
    $: doubled = count * 2
    $: if(count >= 10) {
        alert('카운트가 10을 넘음')
        count = 9;
    }

    const increment = () => {
        count += 1
    }
</script>
<section>
    Content Component

    <BtnComp {count} {increment} />

    <CountComp {count} {doubled}/>
</section>