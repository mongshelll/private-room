<script>
    import { count } from '../stores/stores'

    const onDecre = () => {
        count.decrement();
        // $count = $count - 1;
    }
</script>

<button type="button" on:click={onDecre}>-</button>