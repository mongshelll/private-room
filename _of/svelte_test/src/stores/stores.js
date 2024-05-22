import { writable } from "svelte/store";

const createCount = () => {
    const { subscribe, set, update } = writable(0)

    const increment = () => update(count => count + 1)
    const decrement = () => update(count => count - 1)
    const reset = () => set(0);

    return {
        subscribe,
        increment,
        decrement,
        update,
    }
}

export const count = createCount()














// import { writable } from "svelte/store";

// export const count = writable(0)