<script>
    import { count } from '../stores/stores'

    const onIncre = () => {
        count.increment();
        // $count = $count + 1;
    }
</script>

<button type="button" on:click={onIncre}>+</button>