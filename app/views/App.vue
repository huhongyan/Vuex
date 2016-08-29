<template>
    <router-view></router-view>
    <dialog></dialog>
</template>
<script>
    import store from '../vuex/store'
    import Dialog from '../components/other/Dialog'

    export default {
        replace: false,
        components: {
            Dialog
        },
        store
    }
</script>
