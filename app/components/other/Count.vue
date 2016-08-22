<template>
    <div>
        <Display></Display>
        <Increment></Increment>
        <Increment-Amount></Increment-Amount>
    </div>
</template>
<script>
    import Display from './Display.vue'
    import Increment from './Increment.vue'
    import IncrementAmount from './IncrementAmount'

    export default {
        components: {
            Display,
            Increment,
            IncrementAmount
        }
    }
</script>