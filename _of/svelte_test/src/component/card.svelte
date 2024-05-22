<script>
    let hovering;
    const enter = () => hovering = true;
    const leave = () => hovering = false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="content-card" class:hovering on:mouseenter={enter} on:mouseleave={leave}>
    <h2>
        <slot name="name">
            <span class="missing">이름 미입력</span>
        </slot>
    </h2>
    <div class="address">
        <slot name="address">
            <span class="missing">주소 미입력</span>
        </slot>
    </div>
    {#if $$slots.email}
        <div class="email">
            <slot name="email" {hovering}></slot>
        </div>
    {/if}
</div>

<style>
    .content-card {
        width: 300px;
        border: 1px solid #aaa;
        border-radius: 3px;
        box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
        padding: 20px;
    }

    .content-card + .content-card {
        margin-top: 20px;
    }

    h2 {
        padding: 0 0 4px 0;
        margin: 0 0 20px 0;
        border-bottom: 1px solid #ff3300;
    }
    .address, .email {
        padding: 0 0 0 30px;
        background-position: 0 center;
        background-repeat: no-repeat;
        background-size: 20px 20px;
        margin: 0 0 10px;
        line-height: 1.2;
    }

    .address {
        background-image: url('https://via.placeholder.com/20x12');
    }
    .email {
        background-image: url('https://via.placeholder.com/20x12');
    }
    .missing { color: #999; }

    .hovering { background-color: #ffed99; }

    :global(.content-card + .content-card) {
        margin-top: 20px;
    }
</style>