<script>
    let auth = {
        loggedIn: false
    }

    const handleLogin = () => auth.loggedIn = true;
    const handleLogout = () => auth.loggedIn = false;
</script>

<button type="button" on:click={handleLogin}>Login</button>
<button type="button" on:click={handleLogout}>Logout</button>

<p>{auth.loggedIn}</p>

{#if auth.loggedIn === true }
    <p>로그인 상태입니다.</p>
{:else}
    <p>로그아웃 상태입니다.</p>
{/if}