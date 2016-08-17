<template>
    <div>
        <label>increment: </label>
        <input v-model="increment" @input="incrementCount">
    </div>
</template>
<script>
    import { incrementCounter} from '../vuex/actions/counter'
    export default {
        data: function() {
            return {
                increment: 0
            }
        },
        vuex: {
            actions: {
                increase: incrementCounter
            }
        },
        methods:{
            incrementCount: function(e){
                this.increase(+this.increment)
            }
        }
    }
</script>