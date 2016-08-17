<template>
    <div>
        <button @click='increment()'>Increment +1</button>
        <br/>
        <br/>
        <button @click='decrement()'>decrement -1</button>
        <br/>
        <br/>
    </div>
</template>

<script>
    import { incrementCounter, decrementCounter } from '../vuex/actions/counter'
    export default {
        vuex: {
            actions: {
                increment: incrementCounter,
                decrement: decrementCounter
            }
        }
    }
</script>