<template>
  <div>
    <Display></Display>
    <Increment></Increment>
    <Increment-Amount></Increment-Amount>
  </div>
</template>
<script>
  import Display from './../components/Display.vue'
  import Increment from './../components/Increment.vue'
  import IncrementAmount from './../components/IncrementAmount.vue'
  import store from './../vuex/store'

  export default {
    components: {
      Display,
      Increment,
      IncrementAmount
    },
    store // 在根组件加入 store，让它的子组件和 store 连接
  }
</script>