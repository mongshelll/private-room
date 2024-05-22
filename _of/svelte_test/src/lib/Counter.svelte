<script>
  let count = 0
  $: doubled = count * 2
  $: if(count >= 10) {
    alert('카운트가 10을 넘음')
    count = 9;
  }

  $: {
    console.log( count );
    console.log( doubled );
  }

  const increment = () => {
    count += 1
  }
</script>

<button type="button" on:click={increment}>
  count is {count} {count <= 1 ? "time" : "times" }
</button>

<p>{count} 두배는 {doubled} </p>








<!-- <script>
  let count = 0
  const increment = () => {
    count += 1
  }
</script>

<button type="button" on:click={increment}>
  count is {count}
</button> -->
