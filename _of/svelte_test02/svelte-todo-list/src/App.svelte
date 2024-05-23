<script>
  import { writable } from "svelte/store";
  import Todo from "../component/todo.svelte";

  let title = ''
  let todos = writable([])
  let id = 0
  const createTodo = () => {
    if (!title.trim()) {
      title = ''
      return
    }
    $todos.push({
      // id: id,
      // title: title
      id,
      title
    })
    $todos = $todos
    title = ''
    id += 1
  }
</script>

<main>

  <!-- 아래 세가지 방법 모두 같은 결과 -->
  <!-- if(e.key === "Enter") { createTodo() } -->
  <!-- e.key === "Enter" ? createTodo() : undefined -->
  <!-- e.key === "Enter" && createTodo() -->
  <input type="text"
    bind:value={title}
    on:keydown={e => {e.key === "Enter" && createTodo()}}>
  <button type="button" on:click={createTodo}>Create Todo</button>
<ul>
  {#each $todos as todo}
    <li>
      <Todo {todos} {todo} />
    </li>
  {/each}
</ul>
</main>
