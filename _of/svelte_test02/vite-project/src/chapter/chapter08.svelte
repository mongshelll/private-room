<script>
    import { storeName } from "../store.js"
    import Parent from "./chapter08/parent.svelte";

    let name = 'world'
    $storeName = name
    // console.log(storeName); // 객체 확인
    // console.log($storeName); // 데이터 사용가능 
</script>

<h1>Hello {name}</h1>
<Parent />
