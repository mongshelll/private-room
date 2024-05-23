<script>
    let fruits = ['Apple', 'Banana', 'Cherry', 'Orange', 'Mango']
</script>

<h2>Fruits</h2>

<ul>
    {#each fruits as fruit}
        <li>{fruit}</li>
    {/each}
</ul>

<h2>Fruits reverse</h2>

<!-- 원본을 수정해버림 -->
<!-- <ul>
    {#each fruits.reverse() as fruit}
        <li>{fruit}</li>
    {/each}
</ul> -->
<!-- [...스프레드]사용하여 원봉의 복사본 사용 -->
<ul>
    {#each [...fruits].reverse() as fruit}
        <li>{fruit}</li>
    {/each}
</ul>

<h2>Fruits</h2>

<ul>
    {#each fruits as fruit}
        <li>{fruit}</li>
    {/each}
</ul>

<h2>Fruits slice -2</h2>

<ul>
    {#each fruits.slice(-2) as fruit}
        <li>{fruit}</li>
    {/each}
</ul>