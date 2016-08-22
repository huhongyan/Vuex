<template>
    <router-view></router-view>
</template>
<script>
    import store from '../vuex/store'

    export default {
        replace: false,
        store
    }
</script>