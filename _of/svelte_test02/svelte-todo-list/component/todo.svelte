<script>
    export let todos
    export let todo

    let isEdit = false
    let title = ''

    const onEdit = () => {
        isEdit = true
        title = todo.title
    }
    const offEdit = () => {
        isEdit = false
    }
    const updateTode = () => {
        todo.title = title
        offEdit()
    }
    const delteTodo = () => {
        $todos = $todos.filter(t => t.id !== todo.id)
        console.log(todos);
    }
</script>

{#if isEdit}
    <div>
        <input type="text" bind:value={title} on:keydown={e => {e.key === "Enter" && updateTode()}}>
        <button type="button" on:click={updateTode}>Ok</button>
        <button type="button" on:click={offEdit}>Cancle</button>
    </div>
{:else}
    <div>
        {todo.title}
        <button type="button" on:click={onEdit}>Edit</button>
        <button type="button" on:click={delteTodo}>Delte</button>
    </div>
{/if}

